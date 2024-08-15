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

import { DeliveryStatus, PaymentStatus, PaymentType, ShippingStatus } from '../../shared/types';
import { Address, User } from '../../users/entities';
import { VariantInOrder } from './variant-in-order.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('boolean', { name: 'is_paid', default: false })
  isPaid: boolean;

  @Column('date', { name: 'paid_at', nullable: true, default: null })
  paidAt?: Date;

  @Column('boolean', { name: 'is_delivered', default: false })
  isDelivered: boolean;

  @Column('date', { name: 'delivered_at', nullable: true, default: null })
  deliveredAt?: Date;

  @Column('enum', { enum: PaymentType, name: 'payment_type', nullable: false })
  paymentType: PaymentType;

  @Column('enum', { enum: PaymentStatus, name: 'payment_status', default: PaymentStatus.noPay })
  paymentStatus: PaymentStatus;

  @Column('enum', { enum: ShippingStatus, name: 'shipping_status', default: null, nullable: true })
  shippingStatus: ShippingStatus;

  @Column('enum', { enum: DeliveryStatus, name: 'delivery_status', default: null, nullable: true })
  deliveryStatus: DeliveryStatus;

  @Column('varchar', { length: 70, name: 'transaction_id', default: null, nullable: true })
  transactionId?: string;

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

  @Column('integer')
  userId: number;

  @Column('integer', { nullable: true, default: null })
  addressId: number;

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
