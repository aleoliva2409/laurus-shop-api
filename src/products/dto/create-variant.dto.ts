import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateVariantDto {
  @ApiPropertyOptional({ example: '0003299303000' })
  @IsString()
  @IsOptional()
  sku?: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  sizeId: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  mainVariant: boolean;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  @IsOptional()
  colorId?: number;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  disabled?: boolean;

  @ApiProperty({ example: 5 })
  @IsNumber()
  stock: number;
}
