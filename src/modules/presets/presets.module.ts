import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { Presets } from './presets.entity';
import { PresetsService } from './presets.service';
import { PresetsController } from './presets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DecryptionMiddleware } from './presets.middleware';
import { GlobalHttpExceptionFilter } from '@/common/errors/globalHttpException.filter';
import { GlobalValidationPipe } from '@/common/errors/globalValidatiion.pipe';
// import { UsersService } from '../users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Presets])],
  providers: [PresetsService, GlobalHttpExceptionFilter, GlobalValidationPipe],
  controllers: [PresetsController],
  exports: [PresetsService],
})
export class PresetsModule {}