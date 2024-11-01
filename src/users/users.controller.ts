import { Controller, Get, Body, Patch, Param, Delete, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { UpdateProfileDto, UpdateUserDto } from './dto';
import { GetUser } from 'src/shared/decorators';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('all')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('me')
  findMe(@GetUser('id') userId: string) {
    return this.usersService.findMe(userId);
  }

  @Patch('me')
  updateProfile(@GetUser('id') userId: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.usersService.update(userId, updateProfileDto);
  }

  @Patch(':id')
  updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }

  //** ADDRESSES **//

  @Post('me/addresses')
  createAddress() {}

  @Get('me/addresses')
  getAddresses() {}

  @Patch('me/addresses/:addressId')
  updateAddress() {}

  @Delete('me/addresses/:addressId')
  removeAddress() {}
}
