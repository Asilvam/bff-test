import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configVar } from '../shared/confi-var';
import { SharedModule } from '../shared/shared.module';
import { LoggerMiddleware } from '../shared/logger-middleware/logger.middleware';
import { Configuration } from '../shared/env.enum';
import * as process from 'node:process';
import { GenericModule } from './generic/generic.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `environment/${process.env.NODE_ENV || 'local'}.env`,
      load: [configVar],
    }),
    SharedModule,
    GenericModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  static port: number | string;

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }

  constructor(private readonly configService: ConfigService) {
    const logger = new Logger(AppModule.name);
    AppModule.port = this.configService.get(Configuration.PORT);
    logger.log(
      `Configure on ENVIRONMENT: ${this.configService.get(Configuration.NODE_ENV)}`,
    );
    logger.log(
      `Configure NODE PORT on ${this.configService.get(Configuration.PORT)}`,
      AppModule.name,
    );
    logger.log(`CUSTOM VARS: ${JSON.stringify(configVar())}`);
  }

  configureSwagger(app) {
    const options = new DocumentBuilder()
      .setTitle('Your API Title')
      .setDescription('Your API description')
      .setVersion('1.0')
      .addTag('your-tag')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
  }
}
