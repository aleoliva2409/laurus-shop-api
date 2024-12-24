import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Image } from '../entities';

@Injectable()
export class ImagesService {
  constructor(@InjectRepository(Image) private readonly imagesRepository: Repository<Image>) {}

  async saveImage(variantId: string, url: string, idImageStorage: string): Promise<void> {
    await this.imagesRepository.save({
      url,
      cloudinaryId: idImageStorage,
      variantId,
    });
  }
}
