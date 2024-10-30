import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Order } from './order.entity';
import { Variant } from '../../products/entities';

@Entity('variants_in_orders')
export class VariantInOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('integer')
  quantity: number;

  @Column('varchar', { nullable: false })
  variantId: string;

  @Column('varchar', { nullable: false })
  orderId: string;

  @ManyToOne(() => Variant, (variant) => variant.variantInOrder)
  variant: Variant;

  @ManyToOne(() => Order, (order) => order.variantInOrder)
  order: Order;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt: Date;
}
