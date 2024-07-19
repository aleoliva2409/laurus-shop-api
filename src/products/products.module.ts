import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ColorsController, ProductsController, SizesController } from './controllers';
import { ColorsService, ProductsService, SizesService } from './services';
import { Color, Product, Size, Variant } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Color, Product, Size, Variant])],
  controllers: [ColorsController, ProductsController, SizesController],
  providers: [ColorsService, ProductsService, SizesService],
})
export class ProductsModule {}
