import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SubcategoryDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Electronics' })
  name: string;
}

export class CategoryDto extends SubcategoryDto {
  @ApiPropertyOptional({
    isArray: true,
    type: SubcategoryDto,
    example: [{ id: 4, name: 'Computers' }],
  })
  subcategories: SubcategoryDto[];
}
