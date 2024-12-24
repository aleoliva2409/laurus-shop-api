import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, FindOneOptions, Repository, UpdateResult } from 'typeorm';

import { CreateProductDto, CreateVariantDto, UpdateProductDto, UpdateVariantDto } from '../dto';
import { Product, Variant } from '../entities';
import { errorManager } from 'src/shared/utils';
// import { ImagesService } from './images.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private readonly productsRepository: Repository<Product>,
    @InjectRepository(Variant) private readonly variantsRepository: Repository<Variant>,
    // private readonly imagesService: ImagesService,
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

  async removeProduct(productId: string): Promise<void> {
    const queryRunner = this.productsRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const products = await this.findProduct(productId, { relations: { variants: true } });

      for (const variant of products.variants) {
        await queryRunner.query('UPDATE variants SET deleted_at = now() WHERE id = $1', [
          variant.id,
        ]);
      }

      await queryRunner.query('UPDATE products SET deleted_at = now() WHERE id = $1', [productId]);

      await queryRunner.commitTransaction();
    } catch (error) {
      queryRunner.rollbackTransaction();
      errorManager(error);
    } finally {
      queryRunner.release();
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

  // *** IMAGES ***
  // async uploadImage(productId: string, variantId: string, file: MulterFile): Promise<void> {
  //   try {
  //     await this.findProduct(productId);

  //     const { secure_url, public_id } = await this.cloudinaryService.uploadImage(file);

  //     //? obtenemos el ID de la imagen en cloudinary
  //     const cloudinaryId = public_id.split('/')[1];

  //     await this.imagesService.saveImage(variantId, secure_url, cloudinaryId);
  //   } catch (error) {
  //     errorManager(error);
  //   }
  // }
}
