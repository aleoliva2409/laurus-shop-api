import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 50, name: 'full_name' })
  fullName: string;

  @Column('varchar', { length: 20 })
  phone: string;

  @Column('varchar', { length: 30 })
  street: string;

  @Column('varchar', { length: 10, nullable: true })
  number?: string;

  @Column('varchar', { length: 10, nullable: true })
  floor?: string;

  @Column('varchar', { length: 25 })
  province: string; //TODO: Province Id

  @Column('varchar', { length: 25 })
  city: string;

  @Column('varchar', { length: 25, nullable: true })
  location?: string;

  @Column('varchar', { length: 15 })
  zipCode: string;

  @Column('varchar', { length: 30, name: 'between_street_1', nullable: true })
  betweenStreet1?: string;

  @Column('varchar', { length: 30, name: 'between_street_2', nullable: true })
  betweenStreet2?: string;

  @Column('varchar', { length: 128, nullable: true })
  observations?: string;

  // @Column('')
  // country: Country;

  // @Column('')
  // user: User;
}
