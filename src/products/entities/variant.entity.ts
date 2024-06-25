import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  // @ManyToOne(() => Size, (size) => size.variants)
  // size: Size;

  // @ManyToOne(() => Color, (color) => color.variants)
  // color?: Color;

  // @ManyToOne(() => Product, (product) => product.variants)
  // product: Product;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt: Date;
}
