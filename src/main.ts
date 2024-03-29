import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { GlobalValidationPipe } from './common/errors/globalValidatiion.pipe';
import { GlobalHttpExceptionFilter } from './common/errors/globalHttpException.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new GlobalValidationPipe());
  app.useGlobalFilters(new GlobalHttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('test example')
    .setDescription('this is description')
    .setVersion('1.0')
    .addTag('tags')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(5002);
}

bootstrap();
