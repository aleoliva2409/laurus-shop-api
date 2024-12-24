import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

import { MulterFile } from 'src/shared/types';
import { fileFilterInterceptor } from 'src/shared/interceptors';
import { ProductsService } from '../services';
import { CreateProductDto, CreateVariantDto, UpdateProductDto, UpdateVariantDto } from '../dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':productId')
  findOne(@Param('productId', ParseUUIDPipe) productId: string) {
    return this.productsService.findOne(productId);
  }

  @Patch(':productId')
  update(
    @Param('productId', ParseUUIDPipe) productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(productId, updateProductDto);
  }

  @Delete(':productId')
  remove(@Param('productId', ParseUUIDPipe) productId: string) {
    return this.productsService.removeProduct(productId);
  }

  @Post(':productId/variants')
  createVariant(
    @Param('productId', ParseUUIDPipe) productId: string,
    @Body() createVariantDto: CreateVariantDto,
  ) {
    return this.productsService.createVariant(productId, createVariantDto);
  }

  @Patch(':productId/variants/:variantId')
  updateVariant(
    @Param('productId', ParseUUIDPipe) productId: string,
    @Param('variantId', ParseUUIDPipe) variantId: string,
    @Body() updateVariantDto: UpdateVariantDto,
  ) {
    return this.productsService.updateVariant(productId, variantId, updateVariantDto);
  }

  @Delete(':productId/variants/:variantId')
  removeVariant(
    @Param('productId', ParseUUIDPipe) productId: string,
    @Param('variantId', ParseUUIDPipe) variantId: string,
  ) {
    return this.productsService.removeVariant(productId, variantId);
  }

  @UseInterceptors(FileInterceptor('file', { fileFilter: fileFilterInterceptor }))
  @Post(':productId/variants/:variantId/upload-image')
  uploadImage(
    @Param('productId', ParseIntPipe) productId: string,
    @Param('variantId', ParseIntPipe) variantId: string,
    @UploadedFile() file: MulterFile,
  ) {
    return this.productsService.uploadImage(productId, variantId, file);
  }
}
