import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SelectPresetDto {
  @ApiProperty({ description: '스팀아이디' })
  @IsString()
  steam_id: string;

  @ApiProperty({ description: '닉네임' })
  @IsString()
  name: string;
}
