import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config';

async function bootstrap() {
  const serverConfig = config.get('server');

  const logger = new Logger('bootstrap');
  const post = process.env.PORT || serverConfig.port;
  const app = await NestFactory.create(AppModule);
  await app.listen(post);
  logger.log(`Application listening on port ${post}`)
}
bootstrap();
