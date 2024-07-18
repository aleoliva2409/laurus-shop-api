import { Module } from '@nestjs/common';

import { ColorsController, ProductsController, SizesController } from './controllers';
import { ColorsService, ProductsService, SizesService } from './services';

@Module({
  controllers: [ColorsController, ProductsController, SizesController],
  providers: [ColorsService, ProductsService, SizesService],
})
export class ProductsModule {}
