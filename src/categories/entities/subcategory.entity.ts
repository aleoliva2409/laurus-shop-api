import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Category } from './category.entity';
import { Product } from 'src/products/entities';

@Entity('subcategories')
export class Subcategory {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 20 })
  name: string;

  @OneToMany(() => Product, (products) => products.category)
  products: Product[];

  @ManyToOne(() => Category, (category) => category.subcategories, { nullable: false })
  category: Category;

  // @BeforeInsert()
  // capitalizeName() {
  //   this.name = this.name[0].toUpperCase() + this.name.slice(1).toLocaleLowerCase();
  // }
}
