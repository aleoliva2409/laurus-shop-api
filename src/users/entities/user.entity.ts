import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Role } from '../../shared/types';

import { Address } from './address.entity';
import { Order } from '../../orders/entities';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 50, name: 'full_name' })
  fullName: string;

  @Column('varchar', { length: 40, unique: true })
  email: string;

  @Column('varchar', { length: 150, select: false })
  password: string;

  @Column('boolean', { default: true, name: 'is_active' })
  isActive: boolean;

  @Column('boolean', { default: false, name: 'is_google_account' })
  isGoogleAccount: boolean;

  @Column('enum', { enum: Role, default: Role.client })
  role: Role;

  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt: Date;
}
