import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 20 })
  name: string;

  // @OneToMany(() => Product, (products) => products.category)
  // products: Product[];

  // @BeforeInsert()
  // capitalizeName() {
  //   this.name = this.name[0].toUpperCase() + this.name.slice(1).toLocaleLowerCase();
  // }
}
