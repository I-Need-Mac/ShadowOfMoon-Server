import { Controller, Post, Body, HttpStatus, Get, Query } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ApiQuery } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { RegisterDto, CheckDuplicatedDto, LoginDto } from './users.dto';

import { AssetsService } from '../assets/assets.service';
import { CharactersService } from '../characters/characters.service';
import { SoulsService } from '@/modules/souls/souls.service';
import { PresetsService } from '@/modules/presets/presets.service';
import { SaintSoulsService } from '@/modules/saint_souls/saint_souls.service';
import { SoulProgressCountService } from '../soul_progress_count/soul_progress_count.service';

@Controller('auth')
export class UsersController {
  constructor(
    private dataSource: DataSource,
    private usersService: UsersService,
    private assetsService: AssetsService,
    private charactersService: CharactersService,
    private soulsService: SoulsService,
    private presetsService: PresetsService,
    private saintSoulsService: SaintSoulsService,
    private soulProgressCountService: SoulProgressCountService,
  ) {}

  @ApiQuery({
    name: 'name',
  })
  @Get('/duplicated')
  async checkDuplicated(@Query() data: CheckDuplicatedDto) {
    const { name } = data;
    const isDuplicated = await this.usersService.checkDuplicated(name);
    console.log('in router :: ', name);
    return {
      statusCode: HttpStatus.OK,
      message: 'User created successfully',
      data: { isDuplicated },
    };
  }

  @Get('/users')
  async findAll() {
    const users = await this.usersService.findAll();
    console.log('in router :: ', users);
    return {
      statusCode: HttpStatus.OK,
      message: 'User created successfully',
      data: users,
    };
  }

  @Post('/regist')
  async createUser(@Body() data: RegisterDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await this.usersService.create(data);
      const assetPromise = this.assetsService.create({ steam_id: data.steam_id });
      const characterPromise = this.charactersService.create({ steam_id: data.steam_id });
      const soulPromises = [1, 2, 3, 4, 5].map((i) =>
        this.soulsService.create({ steam_id: data.steam_id, saint_soul_type: i }),
      );
      // 계정 생성 시 업적에 대한 데이터 테이블도 같이 생성 하기

      Promise.all(soulPromises)
        .then((results) => {
          results.map((raw) => {
            this.soulProgressCountService.create({
              steam_id: data.steam_id,
              souls_id: raw.id,
            });
          });
        })
        .catch((error) => {
          console.error(error);
        });

      const presetPromise = this.presetsService.create({ steam_id: data.steam_id });
      const saintSoulPromise = this.saintSoulsService.create({ steam_id: data.steam_id });

      const [asset, character, souls, preset, saintSoul] = await Promise.all([
        assetPromise,
        characterPromise,
        ...soulPromises,
        presetPromise,
        saintSoulPromise,
      ]);

      console.log('in router :: ', user, asset, character, souls, preset, saintSoul);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'User created successfully',
    };
  }

  @Post('/login')
  async login(@Body() data: LoginDto) {
    const { steam_id } = data;
    const user = await this.usersService.update({ steam_id });
    return {
      statusCode: user ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      message: user ? 'User created successfully' : 'no user',
      data: user,
    };
  }
}
