import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GenericController } from './generic.controller';
import { GenericService } from './generic.service';

@Module({
  controllers: [GenericController],
  providers: [GenericService],
  imports: [HttpModule, ConfigModule],
})
export class GenericModule {}
