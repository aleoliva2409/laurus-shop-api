import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { AddVariantInOrderDto, CreateOrderDto, UpdateOrderDto } from './dto';
import { Order, VariantInOrder } from './entities';
import { errorManager } from 'src/shared/utils';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    @InjectRepository(VariantInOrder)
    private readonly variantInOrderRepository: Repository<VariantInOrder>,
  ) {}

  async create(createOrderDto: CreateOrderDto, userId: string): Promise<void> {
    try {
      const { variants, ...rest } = createOrderDto;
      const order = this.ordersRepository.create({ ...rest, userId });

      await this.ordersRepository.save(order);

      variants.forEach(async (variant: AddVariantInOrderDto) => {
        await this.addVariantInOrder(variant);
      });
    } catch (error) {
      errorManager(error);
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

  async addVariantInOrder(addVariantInOrderDto: AddVariantInOrderDto): Promise<void> {
    try {
      await this.variantInOrderRepository.save(addVariantInOrderDto);
    } catch (error) {
      errorManager(error);
    }
  }
}
