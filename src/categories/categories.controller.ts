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
} from '@nestjs/common';

import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto, UpdateSubcategoryDto } from './dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.createCategory(createCategoryDto);
  }

  @Post(':categoryId/subcategories')
  createSubcategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Body() createSubcategoryDto: CreateCategoryDto,
  ) {
    return this.categoriesService.createSubcategory(categoryId, createSubcategoryDto);
  }

  @Get()
  findAll(@Query('children', ParseBoolPipe) children: boolean) {
    return this.categoriesService.findAll(children);
  }

  @Get(':categoryId')
  findOne(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.categoriesService.findCategory(categoryId);
  }

  @Patch(':categoryId')
  updateCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Body() UpdateSubcategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(categoryId, UpdateSubcategoryDto);
  }

  @Patch(':categoryId/subcategories/:subcategoryId')
  updateSubcategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Param('subcategoryId', ParseIntPipe) subcategoryId: number,
    @Body() updateSubcategoryDto: UpdateSubcategoryDto,
  ) {
    return this.categoriesService.updateSubcategory(
      categoryId,
      subcategoryId,
      updateSubcategoryDto,
    );
  }

  @Delete(':categoryId')
  removeCategory(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.categoriesService.removeCategory(categoryId);
  }

  @Delete(':categoryId/subcategories/:subcategoryId')
  removeSubcategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Param('subcategoryId', ParseIntPipe) subcategoryId: number,
  ) {
    return this.categoriesService.removeSubcategory(categoryId, subcategoryId);
  }
}
