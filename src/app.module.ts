import { Module } from '@nestjs/common';

import { AddressesModule } from './addresses/addresses.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AddressesModule,
    AuthModule,
    CategoriesModule,
    OrdersModule,
    ProductsModule,
    UsersModule,
  ],
})
export class AppModule {}
