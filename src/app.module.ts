import { Module } from '@nestjs/common';

import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, CategoriesModule, OrdersModule, ProductsModule],
})
export class AppModule {}
