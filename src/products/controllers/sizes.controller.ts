import { Controller, Get, HttpStatus, ParseEnumPipe, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { SizesService } from '../services';
import { SizeType } from 'src/shared/types';

@ApiTags('Sizes')
@Controller('sizes')
export class SizesController {
  constructor(private readonly sizesService: SizesService) {}

  @ApiResponse({ status: HttpStatus.OK, description: 'Get all sizes' })
  @ApiQuery({ enum: SizeType, name: 'type', required: true })
  @Get()
  findAll(@Query('type', new ParseEnumPipe(SizeType)) type: SizeType) {
    return this.sizesService.findAll(type);
  }
}
