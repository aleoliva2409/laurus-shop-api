import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Color } from './color.entity';
import { Product } from './product.entity';
import { Size } from './size.entity';

@Entity('variants')
export class Variant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('integer')
  stock: number;

  @Column('varchar', { length: 50 })
  sku: string;

  // @Column('decimal', {
  //   nullable: false,
  //   precision: 10,
  //   scale: 2,
  //   transformer: {
  //     from: (price: number) => Number(price),
  //     to: (price: number) => Number(price),
  //   },
  // })
  // price: number;

  // @Column('text', { array: true, default: [] })
  // images?: string[] = [];

  // @OneToMany(() => VariantInOrder, (variantInOrder) => variantInOrder.variant)
  // variantInOrder: VariantInOrder[];

  @ManyToOne(() => Size, (size) => size.variants, { nullable: false })
  size: Size;

  @ManyToOne(() => Color, (color) => color.variants, { nullable: true })
  color?: Color;

  @ManyToOne(() => Product, (product) => product.variants, { nullable: false })
  product: Product;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt: Date;
}
