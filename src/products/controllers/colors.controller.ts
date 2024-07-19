import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { ColorsService } from '../services';

@ApiTags('Colors')
@Controller('colors')
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {}

  @ApiResponse({ status: HttpStatus.OK, description: 'Get all colors' })
  @Get()
  findAll() {
    return this.colorsService.findAll();
  }
}
