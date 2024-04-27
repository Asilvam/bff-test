import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
const logger = new Logger('MAIN');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');
  app.useLogger(new Logger());

  app.use('/api/healthz', (req, res) => {
    const message = 'healthz OK';
    logger.log(message);
    res.send(message);
  });

  await app.listen(AppModule.port);
}
bootstrap();
