import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Variant } from './variant.entity';

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 255 })
  url: string;

  @Column()
  variantId: string;

  @ManyToOne(() => Variant, (variant) => variant.images)
  variant: Variant;
}
