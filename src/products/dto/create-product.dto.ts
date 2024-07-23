import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  Min,
} from 'class-validator';

import { Category } from '../../categories/entities';
import { SizeType } from '../../shared/types';
import { Color } from '../entities';

export class CreateProductDto {
  @ApiProperty({ example: 'ART. 200' })
  @IsString()
  @Length(4, 100)
  title: string;

  @ApiProperty({ example: 'Pantalon de jean MOM' })
  @IsString()
  @Length(10, 220)
  description: string;

  @ApiPropertyOptional({ example: 'art_200' })
  @IsString()
  @MaxLength(50)
  @IsOptional()
  slug?: string;

  @ApiProperty({ example: 3999 })
  @IsNumber()
  @Min(1)
  price: number;

  @ApiPropertyOptional({ example: 'http://localhost:3001/api/image' })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  isVisible: boolean;

  @ApiProperty({ example: SizeType.alpha })
  @IsEnum(SizeType)
  sizeType: SizeType;

  @ApiProperty({ example: 1 })
  @IsNumber()
  category: Category;

  @ApiPropertyOptional({ example: '0003299303000' })
  @IsString()
  @IsOptional()
  sku?: string;

  @ApiProperty({ example: SizeType.alpha })
  @IsEnum(SizeType)
  size: SizeType;

  @ApiPropertyOptional({ example: 5 })
  @IsNumber()
  @IsOptional()
  color?: Color;

  @ApiProperty({ example: 5 })
  @IsNumber()
  stock: number;
}
