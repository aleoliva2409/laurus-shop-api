import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';

import { MulterFile } from 'src/shared/types';

@Injectable()
export class CloudinaryService {
  private readonly uploadPreset: string;

  constructor(private readonly configService: ConfigService) {
    cloudinary.config({
      cloud_name: configService.getOrThrow('CLOUDINARY_CLOUD_NAME'),
      api_key: configService.getOrThrow('CLOUDINARY_API_KEY'),
      api_secret: configService.getOrThrow('CLOUDINARY_API_SECRET'),
    });

    this.uploadPreset = configService.getOrThrow('CLOUDINARY_UPLOAD_PRESET');
  }

  async uploadImage(image: MulterFile): Promise<UploadApiResponse> {
    const buffer = image.buffer;
    const mimetype = image.mimetype;
    const base64 = Buffer.from(buffer).toString('base64');

    const imageBase64 = `data:${mimetype};base64,${base64}`;

    const resp = await cloudinary.uploader.upload(imageBase64, {
      upload_preset: this.uploadPreset,
    });

    return resp;
  }

  //TODO: hacer el removeImage
}
