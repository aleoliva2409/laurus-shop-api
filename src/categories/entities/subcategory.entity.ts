import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import { Category } from './category.entity';

@Entity('subcategories')
export class SubCategory {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 20 })
  name: string;

  //TODO: to add relation
  // category: Category;

  // @OneToMany(() => Product, (products) => products.category)
  // products: Product[];

  // @BeforeInsert()
  // capitalizeName() {
  //   this.name = this.name[0].toUpperCase() + this.name.slice(1).toLocaleLowerCase();
  // }
}
