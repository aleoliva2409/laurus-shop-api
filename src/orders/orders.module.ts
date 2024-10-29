import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Order, VariantInOrder } from './entities';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Order, VariantInOrder])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
