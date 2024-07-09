import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { OrderStatus } from '../../shared/types';

import { Address, User } from '../../users/entities';
import { VariantInOrder } from './variant-in-order.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('boolean', { default: false, name: 'is_paid' })
  isPaid: boolean;

  @Column('date', { name: 'paid_at', nullable: true })
  paidAt?: Date;

  @Column('boolean', { default: false, name: 'is_delivered' })
  isDelivered: boolean;

  @Column('date', { name: 'delivered_at', nullable: true })
  deliveredAt?: Date;

  @Column('enum', { enum: OrderStatus, default: OrderStatus.pendingToPay })
  status: OrderStatus;

  //TODO: add payType
  // @Column('enum', { enum: OrderStatus, default: OrderStatus.pendingToPay })
  // payType: payType;

  // @Column('decimal', {
  //   name: 'sub_total',
  //   precision: 10,
  //   scale: 2,
  //   transformer: {
  //     from: (price: number) => Number(price),
  //     to: (price: number) => Number(price),
  //   },
  // })
  // subTotal: number;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    transformer: {
      from: (price: number) => Number(price),
      to: (price: number) => Number(price),
    },
  })
  total: number;

  @Column('integer', { name: 'total_items' })
  totalItems: number;

  @OneToMany(() => VariantInOrder, (variantInOrder) => variantInOrder.order)
  variantInOrder: VariantInOrder[];

  @ManyToOne(() => Address, (address) => address.orders, { nullable: true })
  address: Address;

  @ManyToOne(() => User, (user) => user.orders, { nullable: false })
  user: User;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt: Date;
}
