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

import { Color } from './color.entity';
import { Image } from './image.entity';
import { Product } from './product.entity';
import { Size } from './size.entity';
import { VariantInOrder } from '../../orders/entities';

@Entity('variants')
export class Variant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('integer')
  stock: number;

  @Column('varchar', { length: 50, nullable: true })
  sku?: string;

  @Column('boolean', { default: false })
  disabled: boolean;

  @Column('boolean', { default: false, name: 'main_variant' })
  mainVariant: boolean;

  @Column('integer', { nullable: false })
  sizeId: number;

  @Column('integer', { nullable: true, default: null })
  colorId?: number;

  @Column('varchar', { nullable: false })
  productId: string;

  @OneToMany(() => VariantInOrder, (variantInOrder) => variantInOrder.variant)
  variantInOrder: VariantInOrder[];

  @OneToMany(() => Image, (image) => image.variant)
  images: Image[];

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
