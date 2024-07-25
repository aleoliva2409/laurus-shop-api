import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, FindOneOptions, Repository, UpdateResult } from 'typeorm';

import { CreateProductDto, CreateVariantDto, UpdateProductDto, UpdateVariantDto } from '../dto';
import { Product, Variant } from '../entities';
import { errorManager } from 'src/shared/utils';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private readonly productsRepository: Repository<Product>,
    @InjectRepository(Variant) private readonly variantsRepository: Repository<Variant>,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<void> {
    const { sku, sizeId, colorId, stock, mainVariant, ...rest } = createProductDto;

    const newProduct = this.productsRepository.create(rest);

    try {
      await this.productsRepository.save(newProduct);

      await this.createVariant(newProduct.id, {
        sku,
        sizeId,
        colorId,
        stock,
        mainVariant,
      });
    } catch (error) {
      errorManager(error);
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      const products = await this.productsRepository.find({
        order: { id: 'asc' },
        relations: {
          category: true,
          variants: { size: true, color: true, images: true },
        },
        where: {
          disabled: false,
        },
        // withDeleted: true, //??? soft delete added
      });

      return products;
    } catch (error) {
      errorManager(error);
    }
  }

  async findOne(productId: string): Promise<Product> {
    return await this.findProduct(productId, {
      order: { id: 'asc' },
      relations: {
        category: true,
        variants: { size: true, color: true, images: true },
      },
      where: {
        disabled: false,
      },
    });
  }

  async updateProduct(
    productId: string,
    updateProductDto: UpdateProductDto,
  ): Promise<UpdateResult> {
    try {
      await this.findProduct(productId);

      const updatedProduct = this.productsRepository.create({ ...updateProductDto });

      return await this.productsRepository.update(productId, updatedProduct);
    } catch (error) {
      errorManager(error);
    }
  }

  async removeProduct(productId: string) {
    try {
      await this.findProduct(productId);

      return await this.productsRepository.softDelete(productId);
    } catch (error) {
      errorManager(error);
    }
  }

  async createVariant(productId: string, createVariantDto: CreateVariantDto): Promise<void> {
    try {
      await this.findProduct(productId);

      const newVariant = this.variantsRepository.create({ ...createVariantDto, productId });

      await this.variantsRepository.save(newVariant);
    } catch (error) {
      errorManager(error);
    }
  }

  async updateVariant(
    productId: string,
    variantId: string,
    updateVariantDto: UpdateVariantDto,
  ): Promise<UpdateResult> {
    try {
      await this.existRelation(productId, variantId);

      const updateVariant = this.variantsRepository.create(updateVariantDto);

      return await this.variantsRepository.update(variantId, updateVariant);
    } catch (error) {
      errorManager(error);
    }
  }

  async removeVariant(productId: string, variantId: string): Promise<DeleteResult> {
    try {
      await this.existRelation(productId, variantId);

      const variantDeleted = await this.variantsRepository.softDelete(variantId);

      return variantDeleted;
    } catch (error) {
      errorManager(error);
    }
  }

  async findProduct(productId: string, options: FindOneOptions<Product> = {}) {
    try {
      const product = await this.productsRepository.findOne({
        ...options,
        where: { ...options.where, id: productId },
      });

      if (!product) {
        throw new NotFoundException(`Cannot find product with id ${productId}`);
      }

      return product;
    } catch (error) {
      errorManager(error);
    }
  }

  async existRelation(productId: string, variantId: string): Promise<void> {
    try {
      const product = await this.findProduct(productId, { relations: { variants: true } });

      const existRelation = product.variants.find((variant) => variant.id === variantId);

      if (!existRelation) {
        throw new NotFoundException(
          `Cannot find variant with id ${variantId} for product ${productId}`,
        );
      }
    } catch (error) {
      errorManager(error);
    }
  }
}
