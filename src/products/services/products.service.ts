import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateProductDto, UpdateProductDto } from '../dto';
import { Product, Variant } from '../entities';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private readonly productsRepository: Repository<Product>,
    @InjectRepository(Variant) private readonly variantsRepository: Repository<Variant>,
  ) {}

  create(createProductDto: CreateProductDto) {
    console.log(createProductDto);
    return 'This action adds a new product';
  }

  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  findAllVariants(): Promise<Variant[]> {
    return this.variantsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    console.log(updateProductDto);
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
