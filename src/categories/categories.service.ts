import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, FindOptionsRelations, Repository, UpdateResult } from 'typeorm';

import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { Category, Subcategory } from './entities';
import { errorManager } from 'src/shared/utils';

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
      //? use "entityManager.create" because @BeforeInsert doesn't work
      const category = this.categoriesRepository.create(createCategoryDto);

      await this.categoriesRepository.save(category);
    } catch (error) {
      errorManager(error);
    }
  }

  async createSubcategory(
    categoryId: number,
    createSubcategoryDto: CreateCategoryDto,
  ): Promise<void> {
    try {
      await this.findCategory(categoryId);

      const subcategory = this.subcategoriesRepository.create({
        ...createSubcategoryDto,
        category: { id: categoryId },
      });

      await this.subcategoriesRepository.save(subcategory);
    } catch (error) {
      errorManager(error);
    }
  }

  async findAll(children: boolean): Promise<Category[]> {
    try {
      return await this.categoriesRepository.find({
        order: { name: 'asc' },
        relations: { subcategories: children },
      });
    } catch (error) {
      errorManager(error);
    }
  }

  async findCategory(id: number, relations?: FindOptionsRelations<Category>): Promise<Category> {
    try {
      const category = await this.categoriesRepository.findOne({
        where: { id },
        relations,
      });

      if (!category) {
        throw new BadRequestException(`Cannot find category with id ${id}`);
      }

      return category;
    } catch (error) {
      errorManager(error);
    }
  }

  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto): Promise<UpdateResult> {
    try {
      await this.findCategory(id);

      //? use "entityManager.create" because @BeforeUpdate doesn't work
      const category = this.categoriesRepository.create({
        ...updateCategoryDto,
      });

      return await this.categoriesRepository.update(id, category);
    } catch (error) {
      errorManager(error);
    }
  }

  async updateSubcategory(
    categoryId: number,
    subcategoryId: number,
    updateSubcategory: UpdateCategoryDto,
  ): Promise<UpdateResult> {
    try {
      const category = await this.findCategory(categoryId, { subcategories: true });

      const existSubcategory = category.subcategories.find(
        (subcategory) => subcategory.id === subcategoryId,
      );

      if (!existSubcategory) {
        throw new BadRequestException(`Subcategory does not link with category ${category.name}`);
      }

      const subcategory = this.subcategoriesRepository.create({
        ...updateSubcategory,
      });

      return await this.subcategoriesRepository.update(subcategoryId, subcategory);
    } catch (error) {
      errorManager(error);
    }
  }

  async removeCategory(id: number): Promise<DeleteResult> {
    try {
      await this.findCategory(id);

      return await this.categoriesRepository.delete(id);
    } catch (error) {
      errorManager(error);
    }
  }

  async removeSubcategory(categoryId: number, subcategoryId: number): Promise<DeleteResult> {
    try {
      const category = await this.findCategory(categoryId, { subcategories: true });

      const existSubcategory = category.subcategories.find(
        (subcategory) => subcategory.id === subcategoryId,
      );

      if (!existSubcategory) {
        throw new BadRequestException(`Subcategory does not link with category ${category.name}`);
      }

      return await this.subcategoriesRepository.delete(subcategoryId);
    } catch (error) {
      errorManager(error);
    }
  }

  async deleteAllCategories() {
    const query = this.categoriesRepository.createQueryBuilder('category');

    return await query.delete().where({}).execute();
  }
}
