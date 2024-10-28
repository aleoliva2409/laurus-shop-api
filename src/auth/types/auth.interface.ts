import { User } from 'src/users/entities/user.entity';

export interface IJwtPayload {
  id: number;
}

export interface IAuthResponse {
  token: string;
  user: User;
}
