import { Controller, Get, Param } from '@nestjs/common';
import { GenericService } from './generic.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('characters') // Tag for the controller
@Controller('generic')
export class GenericController {
  constructor(private readonly genericService: GenericService) {}

  @ApiOperation({ summary: 'List all characters' }) // Operation summary
  @ApiResponse({
    status: 200,
    description: 'List of characters returned successfully',
  }) // Response description
  @Get('characters/:id')
  getAllCharacters(@Param('id') id: number): Promise<any> {
    return this.genericService.getAllCharacters(id);
  }
}
