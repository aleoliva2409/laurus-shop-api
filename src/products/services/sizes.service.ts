import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Size } from '../entities';
import { SizeType } from 'src/shared/types';
import { errorManager } from 'src/shared/utils';

@Injectable()
export class SizesService {
  constructor(@InjectRepository(Size) private readonly sizesRepository: Repository<Size>) {}

  async findByType(type: SizeType): Promise<Size[]> {
    try {
      const sizes = await this.sizesRepository.find({
        order: { order: 'asc' },
        where: { type },
      });

      if (sizes.length === 0) throw new NotFoundException('Size type not found');

      return sizes;
    } catch (error) {
      errorManager(error);
    }
  }
}
