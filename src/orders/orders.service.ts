import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CreateOrderDto, UpdateOrderDto } from './dto';
import { Order, VariantInOrder } from './entities';
import { errorManager } from 'src/shared/utils';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly ordersRepository: Repository<Order>,
    private readonly dataSource: DataSource,
  ) {}

  //TODO: stop serve when transaction is failed, check error
  async create(createOrderDto: CreateOrderDto, userId: string): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { variants, ...rest } = createOrderDto;

      const order = queryRunner.manager.create(Order, { ...rest, userId });

      await queryRunner.manager.save(order);

      //?? don't use forEach!! because queryRunner doesn't works with it
      for (const variant of variants) {
        const variantInOrder = queryRunner.manager.create(VariantInOrder, {
          ...variant,
          orderId: order.id,
        });

        await queryRunner.manager.save(variantInOrder);
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      queryRunner.rollbackTransaction();
      errorManager(error);
    } finally {
      queryRunner.release();
    }
  }

  async findAll(): Promise<Order[]> {
    try {
      return await this.ordersRepository.find({
        relations: {
          variantInOrder: { variant: { product: true, color: true, size: true } },
        },
        order: { id: 'asc' },
      });
    } catch (error) {
      errorManager(error);
    }
  }

  async findOne(id: string): Promise<Order> {
    try {
      const order = await this.ordersRepository.findOne({
        where: { id },
        relations: {
          variantInOrder: { variant: { product: true, color: true, size: true } },
        },
      });

      if (!order) {
        throw new NotFoundException(`Order ${id} not found`);
      }

      return order;
    } catch (error) {
      errorManager(error);
    }
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<UpdateResult> {
    try {
      await this.findOne(id);

      return await this.ordersRepository.update(id, { ...updateOrderDto });
    } catch (error) {
      errorManager(error);
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    try {
      await this.findOne(id);

      return await this.ordersRepository.softDelete(id);
    } catch (error) {
      errorManager(error);
    }
  }
}
