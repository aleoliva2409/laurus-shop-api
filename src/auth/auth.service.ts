import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';

import { CreateUserDto } from 'src/users/dto';
import { UsersService } from 'src/users/users.service';
import { IAuthResponse } from './types/auth.interface';
import { LoginDto } from './dto/login.dto';
import { errorManager } from 'src/shared/utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<IAuthResponse> {
    try {
      const user = await this.usersService.create(createUserDto);

      const userCreated = { ...user };
      delete userCreated.password;

      return {
        token: this.generateJwt(user.id),
        user: userCreated,
      };
    } catch (error) {
      errorManager(error);
    }
  }

  async login(loginDto: LoginDto): Promise<IAuthResponse> {
    try {
      const { email, password } = loginDto;
      const user = await this.usersService.findOneWithFilters({
        where: { email },
        select: { password: true, id: true },
      });

      if (!user) {
        throw new UnauthorizedException('Credentials are not authorized');
      }

      if (!compareSync(password, user.password)) {
        throw new UnauthorizedException('Credentials are not authorized');
      }

      const userCreated = await this.usersService.findOne(user.id);

      return {
        token: this.generateJwt(user.id),
        user: userCreated,
      };
    } catch (error) {
      errorManager(error);
    }
  }

  private generateJwt(userId: number) {
    return this.jwtService.sign({ id: userId });
  }
}
