import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';

import { User } from 'src/users/entities';

export const GetUser = createParamDecorator((data: string, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest();
  const user: User = req.user;

  if (!user) throw new InternalServerErrorException('User not found(request)');

  if (!data) return user;

  if (!user.hasOwnProperty(data))
    throw new InternalServerErrorException('Property does not exist in user object');

  return user[data];
});
