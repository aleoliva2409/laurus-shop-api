import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Product } from '../../products/entities';
import { capitalize } from '../../shared/utils';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 20, unique: true })
  name: string;

  @Column('integer', { nullable: true, name: 'parent_id', default: null })
  parentId?: number;

  @OneToMany(() => Product, (products) => products.category)
  products: Product[];

  @BeforeInsert()
  @BeforeUpdate()
  capitalizeName() {
    this.name = capitalize(this.name);
  }
}
