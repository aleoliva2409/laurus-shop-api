import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  ParseBoolPipe,
  HttpStatus,
} from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CategoriesService } from './categories.service';
import { CategoryDto, CreateCategoryDto, UpdateCategoryDto } from './dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiResponse({ status: HttpStatus.CREATED, description: 'Category created' })
  @Post()
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.createCategory(createCategoryDto);
  }

  @ApiResponse({ status: HttpStatus.CREATED, description: 'Subcategory created' })
  @Post(':categoryId/subcategories')
  createSubcategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Body() createSubcategoryDto: CreateCategoryDto,
  ) {
    return this.categoriesService.createSubcategory(categoryId, createSubcategoryDto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get all categories',
    type: CategoryDto,
    isArray: true,
  })
  @ApiQuery({ name: 'children', type: Boolean, required: true })
  @Get()
  findAll(@Query('children', ParseBoolPipe) children: boolean) {
    return this.categoriesService.findAll(children);
  }

  @ApiResponse({ status: HttpStatus.OK, description: 'Get category by ID', type: CategoryDto })
  @Get(':categoryId')
  findOne(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.categoriesService.findCategory(categoryId);
  }

  @ApiResponse({ status: HttpStatus.OK, description: 'Update category by ID' })
  @Patch(':categoryId')
  updateCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Body() updateSubcategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(categoryId, updateSubcategoryDto);
  }

  @ApiResponse({ status: HttpStatus.OK, description: 'Update subcategory by ID' })
  @Patch(':categoryId/subcategories/:subcategoryId')
  updateSubcategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Param('subcategoryId', ParseIntPipe) subcategoryId: number,
    @Body() updateSubcategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateSubcategory(
      categoryId,
      subcategoryId,
      updateSubcategoryDto,
    );
  }

  @ApiResponse({ status: HttpStatus.OK, description: 'Delete category by ID' })
  @Delete(':categoryId')
  removeCategory(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.categoriesService.removeCategory(categoryId);
  }

  @ApiResponse({ status: HttpStatus.OK, description: 'Delete subcategory by ID' })
  @Delete(':categoryId/subcategories/:subcategoryId')
  removeSubcategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Param('subcategoryId', ParseIntPipe) subcategoryId: number,
  ) {
    return this.categoriesService.removeSubcategory(categoryId, subcategoryId);
  }
}
