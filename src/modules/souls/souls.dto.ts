import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
export class updateSoulDto {
  @ApiProperty({ description: '스팀아이디' })
  @IsString()
  steam_id: string;

  @ApiProperty({ description: 'soul 대분류' })
  @IsNumber()
  saint_soul: number;

  @ApiProperty({ description: 'soul 소분류' })
  @IsNumber()
  soul: number;

  @ApiProperty({ description: 'flag' })
  @IsNumber()
  flag: number;
}

export class SelectAllSoulDto {
  @ApiProperty({ description: '스팀아이디' })
  @IsString()
  steam_id: string;

  @ApiProperty({ description: '닉네임' })
  @IsString()
  name: string;
}
