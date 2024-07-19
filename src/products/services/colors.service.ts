import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Color } from '../entities';
import { errorManager } from 'src/shared/utils';

@Injectable()
export class ColorsService {
  constructor(@InjectRepository(Color) private readonly colorsRepository: Repository<Color>) {}

  async findAll(): Promise<Color[]> {
    try {
      const colors = await this.colorsRepository.find({ order: { name: 'asc' } });

      if (colors.length === 0) throw new NotFoundException('No colors found');

      return colors;
    } catch (error) {
      errorManager(error);
    }
  }
}
