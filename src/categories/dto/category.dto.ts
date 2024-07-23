import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SubcategoryDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Electronics' })
  name: string;

  @ApiProperty({ example: 1 })
  parentId: number;
}

export class CategoryDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Electronics' })
  name: string;

  @ApiPropertyOptional({ nullable: true })
  parentId?: number;

  @ApiPropertyOptional({ isArray: true, type: SubcategoryDto })
  subcategories?: SubcategoryDto[];
}
