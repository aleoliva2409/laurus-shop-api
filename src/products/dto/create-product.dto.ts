import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString, Length, Min } from 'class-validator';

import { SizeType } from '../../shared/types';

export class CreateProductDto {
  @ApiProperty({ example: 'ART. 200' })
  @IsString()
  @Length(4, 100)
  title: string;

  @ApiProperty({ example: 'Pantalon de jean MOM' })
  @IsString()
  @Length(10, 220)
  description: string;

  @ApiProperty({ example: 3999 })
  @IsNumber()
  @Min(1)
  price: number;

  @ApiProperty({ example: SizeType.alpha })
  @IsEnum(SizeType)
  sizeType: SizeType;

  @ApiProperty({ example: 1 })
  @IsNumber()
  categoryId: number;

  @ApiPropertyOptional({ example: '0003299303000' })
  @IsString()
  @IsOptional()
  sku?: string;

  @ApiProperty()
  @IsBoolean()
  mainVariant: boolean;

  @ApiProperty({ example: 11 })
  @IsNumber()
  sizeId: number;

  @ApiPropertyOptional({ example: 5 })
  @IsNumber()
  @IsOptional()
  colorId?: number;

  @ApiProperty({ example: 5 })
  @IsNumber()
  stock: number;
}
