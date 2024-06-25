import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sizes')
export class Size {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 5 })
  name: string;

  // @Column('enum', { enum: SizeType })
  // type: SizeType;

  @Column('integer')
  order: number;

  // @OneToMany(() => Variant, (variant) => variant.size)
  // variants: Variant[];
}
