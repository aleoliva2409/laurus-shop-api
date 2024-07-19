import { Module } from '@nestjs/common';

import { ColorsController, ProductsController, SizesController } from './controllers';
import { ColorsService, ProductsService, SizesService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Color, Product, Size } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Color, Product, Size])],
  controllers: [ColorsController, ProductsController, SizesController],
  providers: [ColorsService, ProductsService, SizesService],
})
export class ProductsModule {}
