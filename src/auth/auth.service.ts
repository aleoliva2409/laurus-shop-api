import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { compareSync } from 'bcrypt';
import { Response } from 'express';

import { UsersService } from 'src/users/users.service';
import { IAuthResponse } from './types/auth.interface';
import { errorManager } from 'src/shared/utils';
import { User } from 'src/users/entities';
import { LoginDto, RegisterDto } from './dto';
import { CreateUserDto } from 'src/users/dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async register(registerDto: RegisterDto): Promise<IAuthResponse> {
    try {
      const user = await this.usersService.create(registerDto);

      return {
        ...this.generateJwt(user.id),
        user,
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
      });

      if (!user) {
        throw new UnauthorizedException('Credentials are not authorized');
      }

      const { password: userPass, ...restUser } = user;

      if (!compareSync(password, userPass)) {
        throw new UnauthorizedException('Credentials are not authorized');
      }

      return {
        ...this.generateJwt(restUser.id),
        user: restUser as User,
      };
    } catch (error) {
      errorManager(error);
    }
  }

  async googleLogin(createUserDto: CreateUserDto, res: Response) {
    const { email } = createUserDto;

    const user = await this.usersService.findOneWithFilters({
      where: { email },
    });

    if (user) {
      res.redirect(
        this.configService.getOrThrow<string>('REDIRECT_AUTH_TOKEN') + '?' + createUserDto.fullName,
      );
      return {
        ...this.generateJwt(user.id),
        user,
      };

      // TODO: ver lo del redirect
    }

    const newUser = await this.usersService.create(createUserDto);

    // TODO: ver lo del redirect
    // res.redirect(
    //   this.configService.getOrThrow<string>('REDIRECT_AUTH_TOKEN') + createUserDto.fullName,
    // );

    return {
      ...this.generateJwt(newUser.id),
      user: newUser,
    };
  }

  async refreshToken(userId: string) {
    try {
      const user = await this.usersService.findOne(userId);

      return {
        ...this.generateJwt(user.id),
        user,
      };
    } catch (error) {
      errorManager(error);
    }
  }

  private generateJwt(userId: string) {
    return {
      token: this.jwtService.sign({ id: userId }),
      refreshToken: this.jwtService.sign(
        { id: userId },
        {
          secret: this.configService.getOrThrow<string>('REFRESH_JWT_SECRET'),
          expiresIn: this.configService.getOrThrow<string>('REFRESH_JWT_EXPIRE_IN'),
        },
      ),
    };
  }
}
