import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FindOneOptions, Repository } from 'typeorm';

import { CreateUserDto, UpdateProfileDto, UpdateUserDto } from './dto';
import { User } from './entities';
import { errorManager } from 'src/shared/utils';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const userInDb = await this.findOneWithFilters({
        where: { email: createUserDto.email },
      });

      if (userInDb?.email) {
        throw new BadRequestException(`User ${createUserDto.email} already exists`);
      }

      const user = this.usersRepository.create(createUserDto);

      await this.usersRepository.save(user);

      return user;
    } catch (error) {
      errorManager(error);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.usersRepository.find({ where: { isActive: true } });
    } catch (error) {
      errorManager(error);
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.findOneWithFilters({ where: { id } });

      if (!user) {
        throw new NotFoundException(`Cannot find user with id ${id}`);
      }

      return user;
    } catch (error) {
      errorManager(error);
    }
  }

  async findMe(id: string): Promise<User> {
    try {
      const user = await this.findOneWithFilters({
        where: { id },
        relations: { orders: true },
      });

      if (!user) {
        throw new NotFoundException(`User does not exist`);
      }

      return user;
    } catch (error) {
      errorManager(error);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto | UpdateProfileDto) {
    try {
      await this.findOne(id);

      return await this.usersRepository.update(id, updateUserDto);
    } catch (error) {
      errorManager(error);
    }
  }

  async remove(id: string) {
    try {
      await this.findOne(id);

      return await this.usersRepository.softDelete(id);
    } catch (error) {
      errorManager(error);
    }
  }

  findOneWithFilters(filters: FindOneOptions<User>): Promise<User> {
    return this.usersRepository.findOne(filters);
  }

  //** ADDRESSES **//
}
