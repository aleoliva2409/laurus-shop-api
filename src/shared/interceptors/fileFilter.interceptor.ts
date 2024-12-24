import { BadRequestException } from '@nestjs/common';

import { FileFilterCB, MulterFile, Req } from '../types';

export const fileFilterInterceptor = (_req: Req, file: MulterFile, cb: FileFilterCB) => {
  if (!file) return cb(new BadRequestException('File is empty'), false);

  const fileExtension = file.mimetype.split('/')[1];
  const validExtensions = ['jpg', 'png', 'gif', 'jpeg'];

  if (!validExtensions.includes(fileExtension))
    return cb(new BadRequestException('File extension is not allowed'), false);
  cb(null, true);
};
