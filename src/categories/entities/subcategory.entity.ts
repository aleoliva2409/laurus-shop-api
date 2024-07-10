import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Category } from './category.entity';
import { Product } from '../../products/entities';
import { capitalize } from '../../shared/utils';

@Entity('subcategories')
export class Subcategory {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 20, unique: true })
  name: string;

  @OneToMany(() => Product, (products) => products.category)
  products: Product[];

  @ManyToOne(() => Category, (category) => category.subcategories, { nullable: false })
  category: Category;

  @BeforeInsert()
  @BeforeUpdate()
  capitalizeName() {
    this.name = capitalize(this.name);
  }
}
