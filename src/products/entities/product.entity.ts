import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Category, Subcategory } from '../../categories/entities';
import { SizeType } from '../../shared/types';
import { Variant } from './variant.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 100, unique: true })
  title: string;

  @Column('varchar', { length: 220 })
  description: string;

  @Column('varchar', { length: 50 })
  slug: string;

  @Column('decimal', {
    nullable: false,
    precision: 10,
    scale: 2,
    transformer: {
      from: (price: number) => Number(price),
      to: (price: number) => Number(price),
    },
  })
  price: number;

  @Column('varchar', { length: 150, nullable: true })
  imageUrl?: string;

  @Column('boolean', { name: 'is_visible', default: true })
  isVisible: boolean;

  // @Column('varchar', { length: 15, array: true, default: [] })
  // tags?: string[];

  @Column('enum', { enum: SizeType, name: 'size_type' })
  sizeType: SizeType;

  @ManyToOne(() => Category, (category) => category.products, { nullable: false })
  category: Category;

  @ManyToOne(() => Subcategory, (subcategory) => subcategory.products, {
    nullable: false,
  })
  subcategory: Subcategory;

  @OneToMany(() => Variant, (variant) => variant.product)
  variants: Variant[];

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt: Date;

  @BeforeInsert()
  insertSlug() {
    if (!this.slug) this.slug = this.title;

    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '')
      .replaceAll('.', '');
  }

  @BeforeUpdate()
  checkSlug() {
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '')
      .replaceAll('.', '');
  }
}
