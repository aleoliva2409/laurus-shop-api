import { ApiPropertyOptional } from '@nestjs/swagger';

import { IsBoolean, IsNumber, IsOptional, IsString, Length, Min } from 'class-validator';

import { Category, Subcategory } from '../../categories/entities';

export class UpdateProductDto {
  @ApiPropertyOptional({ example: 'ART. 200' })
  @IsString()
  @Length(4, 100)
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ example: 'Pantalon de jean MOM' })
  @IsString()
  @Length(10, 220)
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: 3999 })
  @IsNumber()
  @Min(1)
  @IsOptional()
  price?: number;

  @ApiPropertyOptional({ example: 'http://localhost:3001/api/image' })
  @IsString()
  @IsOptional()
  @IsOptional()
  imageUrl?: string;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  isVisible?: boolean;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  @IsOptional()
  category?: Category;

  @ApiPropertyOptional({ example: 5 })
  @IsNumber()
  @IsOptional()
  subcategory?: Subcategory;
}
