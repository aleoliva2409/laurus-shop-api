import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Variant } from './variant.entity';

@Entity('colors')
export class Color {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 20 })
  name: string;

  @Column('varchar', { length: 7 })
  code: string;

  @OneToMany(() => Variant, (variant) => variant.color)
  variants: Variant[];
}
