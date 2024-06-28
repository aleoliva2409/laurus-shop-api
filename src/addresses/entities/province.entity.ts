import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Address } from './address.entity';

@Entity('provinces')
export class Province {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 40 })
  name: string;

  @OneToMany(() => Address, (address) => address.province)
  addresses: Address[];
}
