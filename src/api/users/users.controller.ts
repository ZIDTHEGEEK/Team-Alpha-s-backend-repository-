import { AuthUser } from 'src/decorators/auth';
import { Users } from 'src/models/users.model';
import { UsersService } from './users.service';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('me')
  async getActiveUser(@AuthUser() user: Users) {
    return await this.userService.getActiveUser(user._id);
  }
}
