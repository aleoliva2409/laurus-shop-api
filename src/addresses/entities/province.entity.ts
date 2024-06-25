import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('provinces')
export class Province {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 40 })
  name: string;
}
