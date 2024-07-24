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

import { Order } from '../../orders/entities';
import { Province } from './province.entity';
import { User } from './user.entity';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 50, name: 'full_name' })
  fullName: string;

  @Column('varchar', { length: 20 })
  phone: string;

  @Column('varchar', { length: 30 })
  street: string;

  @Column('varchar', { length: 10, nullable: true })
  number?: string;

  @Column('varchar', { length: 5, nullable: true })
  floor?: string;

  @Column('varchar', { length: 15 })
  zipCode: string;

  @Column('varchar', { length: 25 })
  city: string;

  @Column('varchar', { length: 25, nullable: true })
  location?: string;

  @Column('varchar', { length: 30, name: 'between_street_1', nullable: true })
  betweenStreet1?: string;

  @Column('varchar', { length: 30, name: 'between_street_2', nullable: true })
  betweenStreet2?: string;

  @Column('varchar', { length: 128, nullable: true })
  observations?: string;

  @Column()
  provinceId: number;

  @Column()
  userId: string;

  @OneToMany(() => Order, (order) => order.address)
  orders: Order[];

  @ManyToOne(() => Province, (province) => province.addresses, { nullable: false })
  province: Province;

  @ManyToOne(() => User, (user) => user.addresses, { nullable: false })
  user: User;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt: Date;
}
