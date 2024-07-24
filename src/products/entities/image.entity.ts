import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Variant } from './variant.entity';

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  url: string;

  @Column('varchar', { name: 'cloudinary_id', length: 30 })
  cloudinaryId: string;

  @Column('boolean', { name: 'is_cover', default: false })
  isCover: boolean;

  @Column()
  variantId: string;

  @ManyToOne(() => Variant, (variant) => variant.images)
  variant: Variant;
}
