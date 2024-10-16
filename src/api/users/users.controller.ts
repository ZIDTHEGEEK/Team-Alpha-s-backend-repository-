import { AuthUser } from 'src/decorators/auth';
import { Users } from 'src/models/users.model';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UpdateUserDto } from './dtos/updateUserDto';
import { GetUserWalletAddressByEmailDto } from './dtos/getUserWalletAddressByEmailDto';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('me')
  async getActiveUser(@AuthUser() user: Users) {
    return await this.userService.getActiveUser(user._id);
  }

  @Put('me')
  async updateActiveUser(
    @Body() updateUserDto: UpdateUserDto,
    @AuthUser() user: Users,
  ) {
    return await this.userService.updateActiveUser(user._id, updateUserDto);
  }

  @Post('email')
  async getUserWalletAddressByEmail(
    @Body() body: GetUserWalletAddressByEmailDto,
  ) {
    const user = await this.userService.getUserByEmail(body.email);
    return user.walletAddress;
  }

  @Get('email/:email')
  async getUserByEmail(@Param('email') email: string) {
    const user = await this.userService.getUserByEmail(email);
    return user;
  }
}
