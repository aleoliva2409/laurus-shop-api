import { Injectable } from '@nestjs/common';

import { CreateProductDto, UpdateProductDto } from '../dto';

@Injectable()
export class ProductsService {
  create(createProductDto: CreateProductDto) {
    console.log(createProductDto);
    return 'This action adds a new product';
  }

  findAll() {
    return `This action returns all products`;
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
