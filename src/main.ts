import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
const logger = new Logger('MAIN');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');
  app.useLogger(new Logger());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.use('/api/healthz', (req, res) => {
    const message = 'healthz OK';
    logger.log(message);
    res.send(message);
  });
  app.get(AppModule).configureSwagger(app);

  await app.listen(AppModule.port);
}
bootstrap();
