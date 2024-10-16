import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, IsNull, Repository, UpdateResult } from 'typeorm';

import { CategoryDto, CreateCategoryDto, SubcategoryDto, UpdateCategoryDto } from './dto';
import { Category } from './entities';
import { errorManager } from 'src/shared/utils';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
    // private readonly dataSource: DataSource,
  ) {}

  async createCategory(createCategoryDto: CreateCategoryDto, parentId?: number): Promise<void> {
    try {
      //? use "entityManager.create" because @BeforeInsert doesn't work
      let category: Category;

      if (parentId) {
        await this.findOne(parentId);
        category = this.categoriesRepository.create({ ...createCategoryDto, parentId });
      } else {
        category = this.categoriesRepository.create(createCategoryDto);
      }

      await this.categoriesRepository.save(category);
    } catch (error) {
      errorManager(error);
    }
  }

  async findAll(children: boolean): Promise<CategoryDto[]> {
    try {
      const categories = await this.categoriesRepository.find({
        where: { parentId: IsNull() },
        order: { name: 'asc' },
      });

      if (children) {
        const categoriesWithSubcategories = await this.mapperSubcategories(categories);

        return categoriesWithSubcategories;
      }

      return this.mapperCategories(categories);
    } catch (error) {
      errorManager(error);
    }
  }

  async findCategory(id: number, children: boolean = false): Promise<CategoryDto> {
    try {
      const category = await this.findOne(id);

      if (children) {
        const categoriesWithSubcategories = await this.mapperSubcategories([category]);

        return categoriesWithSubcategories[0];
      }

      return this.mapperCategories(category);
    } catch (error) {
      errorManager(error);
    }
  }

  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto): Promise<UpdateResult> {
    try {
      await this.findOne(id);

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
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<UpdateResult> {
    try {
      const subcategory = await this.findOne(subcategoryId);

      if (subcategory.parentId !== categoryId) {
        throw new BadRequestException(
          "Cannot update subcategory under its parent category. There's no match.",
        );
      }

      //? use "entityManager.create" because @BeforeUpdate doesn't work
      const subcategoryToUpdate = this.categoriesRepository.create({
        ...updateCategoryDto,
        parentId: categoryId,
      });

      return await this.categoriesRepository.update(subcategoryId, subcategoryToUpdate);
    } catch (error) {
      errorManager(error);
    }
  }

  async removeCategory(id: number): Promise<void> {
    const queryRunner = this.categoriesRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await this.findOne(id);

      //??? manager has all methods
      // await queryRunner.manager.delete(Category, id);

      // ??? many forms to delete multiple rows at once
      // await queryRunner.manager.delete(Category, { parentId: id });
      // await queryRunner.query(`DELETE FROM categories WHERE parent_id = ${id} or id = ${id}`);

      await queryRunner.query('DELETE FROM categories WHERE parent_id = $1 or id = $1', [id]);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      errorManager(error);
    } finally {
      await queryRunner.release();
    }
  }

  async removeSubcategory(categoryId: number, subcategoryId: number): Promise<DeleteResult> {
    try {
      const subcategory = await this.findOne(subcategoryId);

      if (subcategory.parentId !== categoryId) {
        throw new BadRequestException(
          "Cannot remove subcategory under its parent category. There's no match.",
        );
      }

      return await this.categoriesRepository.delete(subcategoryId);
    } catch (error) {
      errorManager(error);
    }
  }

  async findOne(id: number): Promise<Category> {
    try {
      const category = await this.categoriesRepository.findOneBy({ id });

      if (!category) throw new NotFoundException(`Cannot find category with id ${id}`);

      return category;
    } catch (error) {
      errorManager(error);
    }
  }

  mapperCategories(categories: Category): CategoryDto;
  mapperCategories(categories: Category[]): CategoryDto[];
  mapperCategories(categories: Category | Category[]): CategoryDto | CategoryDto[] {
    if (Array.isArray(categories)) {
      return categories.map(({ id, name }) => ({ id, name }));
    }

    return { id: categories.id, name: categories.name };
  }

  async mapperSubcategories(categories: Category[]): Promise<CategoryDto[]> {
    const categoriesWithSubcategories: CategoryDto[] = [];

    for (const { id, name } of categories) {
      const subcategories = await this.categoriesRepository.find({
        where: { parentId: id },
        order: { name: 'asc' },
      });

      const subcategoriesFormatted: SubcategoryDto[] = subcategories.map(
        ({ id, name, parentId }) => ({ id, name, parentId }),
      );

      categoriesWithSubcategories.push({
        id,
        name,
        subcategories: subcategoriesFormatted,
      });
    }

    return categoriesWithSubcategories;
  }

  async deleteAllCategories() {
    const query = this.categoriesRepository.createQueryBuilder('category');

    return await query.delete().where({}).execute();
  }

  // ??? TRANSACTION with DataSource
  // async removeCategory(id: number): Promise<void> {
  //   const queryRunner = this.dataSource.createQueryRunner();
  //   await queryRunner.connect();
  //   await queryRunner.startTransaction();
  //   try {
  //     await this.findOne(id);

  //     await queryRunner.manager.delete(Category, { parentId: id });
  //     await queryRunner.manager.delete(Category, id);

  //     await queryRunner.commitTransaction();
  //   } catch (error) {
  //     await queryRunner.rollbackTransaction();
  //     errorManager(error);
  //   } finally {
  //     await queryRunner.release();
  //   }
  // }
}
