import { ApiPropertyOptional } from '@nestjs/swagger';

import { IsBoolean, IsNumber, IsOptional, IsString, Length, Min } from 'class-validator';

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

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  disabled?: boolean;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  @IsOptional()
  categoryId?: number;
}
