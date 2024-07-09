import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { Category, Subcategory } from './entities';
import { capitalize } from 'src/shared/utils';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
    @InjectRepository(Subcategory)
    private readonly subcategoriesRepository: Repository<Subcategory>,
  ) {}

  async createCategory(createCategoryDto: CreateCategoryDto): Promise<void> {
    try {
      const { name } = createCategoryDto;
      await this.categoriesRepository.save({ name: capitalize(name) });
    } catch (error) {
      //validateError(error);
    }
  }

  async createSubcategory(
    categoryId: number,
    createSubcategoryDto: CreateCategoryDto,
  ): Promise<void> {
    try {
      await this.findCategory(categoryId);

      await this.subcategoriesRepository.save({
        name: capitalize(createSubcategoryDto.name),
        category: { id: categoryId },
      });
    } catch (error) {
      //validateError(error);
    }
  }

  async findAll(children: boolean): Promise<Category[]> {
    try {
      return await this.categoriesRepository.find({
        order: { name: 'asc' },
        relations: { subcategories: children },
      });
    } catch (error) {
      //validateError(error);
    }
  }

  async findCategory(id: number): Promise<Category> {
    try {
      const category = await this.categoriesRepository.findOneBy({ id });

      if (!category) {
        throw new NotFoundException(`Cannot find category with id ${id}`);
      }

      return category;
    } catch (error) {
      //validateError(error);
    }
  }

  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto): Promise<UpdateResult> {
    try {
      const { name } = updateCategoryDto;

      await this.findCategory(id);

      return await this.categoriesRepository.update(id, { name: capitalize(name) });
    } catch (error) {
      //validateError(error);
    }
  }

  async updateSubcategory(
    categoryId: number,
    subcategoryId: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<UpdateResult> {
    try {
      const { name } = updateCategoryDto;

      await this.findCategory(categoryId);

      return await this.subcategoriesRepository.update(subcategoryId, {
        name: capitalize(name),
      });
    } catch (error) {
      //validateError(error);
    }
  }

  async removeCategory(id: number): Promise<DeleteResult> {
    try {
      await this.findCategory(id);

      return await this.categoriesRepository.delete(id);
    } catch (error) {
      //validateError(error);
    }
  }

  async removeSubcategory(categoryId: number, subcategoryId: number): Promise<DeleteResult> {
    try {
      await this.findCategory(categoryId);

      return await this.subcategoriesRepository.delete(subcategoryId);
    } catch (error) {
      //validateError(error);
    }
  }

  async deleteAllCategories() {
    const query = this.categoriesRepository.createQueryBuilder('category');

    return await query.delete().where({}).execute();
  }
}
