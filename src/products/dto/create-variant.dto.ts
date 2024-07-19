import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

import { Color } from '../entities';
import { SizeType } from '../../shared/types';

export class CreateVariantDto {
  @ApiPropertyOptional({ example: '0003299303000' })
  @IsString()
  @IsOptional()
  sku?: string;

  @ApiProperty({ example: SizeType.alpha })
  @IsEnum(SizeType)
  size: SizeType;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  @IsOptional()
  color?: Color;

  @ApiProperty({ example: 5 })
  @IsNumber()
  stock: number;
}
