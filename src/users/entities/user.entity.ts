import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Role } from 'src/shared/types/enum/role';

@Entity('users')
export class User {
  //TODO: determinate id's type(uuid or number)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 50, name: 'full_name' })
  fullName: string;

  @Column('varchar', { length: 40, unique: true })
  email: string;

  @Column('varchar', { length: 20 })
  password: string;

  @Column('boolean', { default: true, name: 'is_active' })
  isActive: boolean;

  @Column('enum', { enum: Role, default: Role.client })
  role: Role;

  // @OneToMany(() => Order, (order) => order.user)
  // orders: Order[];

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt: Date;
}
