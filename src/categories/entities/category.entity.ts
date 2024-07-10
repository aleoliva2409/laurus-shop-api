import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Product } from '../../products/entities';
import { Subcategory } from './subcategory.entity';
import { capitalize } from '../../shared/utils';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 20, unique: true })
  name: string;

  @OneToMany(() => Product, (products) => products.category)
  products: Product[];

  @OneToMany(() => Subcategory, (subcategory) => subcategory.category)
  subcategories: Subcategory[];

  @BeforeInsert()
  @BeforeUpdate()
  capitalizeName() {
    this.name = capitalize(this.name);
  }
}
