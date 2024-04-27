import { Controller, Get, Param } from '@nestjs/common';
import { GenericService } from './generic.service';

@Controller('generic')
export class GenericController {
  constructor(private readonly genericService: GenericService) {}

  @Get('characters/:id')
  getAllCharacters(@Param('id') id: number): Promise<any> {
    return this.genericService.getAllCharacters(id);
  }
}
