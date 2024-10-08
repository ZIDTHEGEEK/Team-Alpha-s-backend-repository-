import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/CreateUserDto';
import { CreatedUserDto } from './dtos/CreatedUserDto';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { LoginUserDto } from './dtos/LoginUserDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('create-account')
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreatedUserDto> {
    const createdUser = await this.authService.createUser(createUserDto);
    return createdUser;
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginUserDto: LoginUserDto): Promise<{ token: string }> {
    const token = await this.authService.login(loginUserDto);
    return token;
  }

  @Post('connect-wallet')
  @HttpCode(200)
  async connectWalletAuthenticate(
    @Body() { walletAddress }: { walletAddress: string },
  ): Promise<{ token: string }> {
    const token =
      await this.authService.connectWalletAuthenticate(walletAddress);
    return token;
  }
}
