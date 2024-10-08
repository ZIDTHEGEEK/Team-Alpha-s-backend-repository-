import { IsEmail, IsString } from 'class-validator';

export class GetUserWalletAddressByEmailDto {
  @IsString()
  @IsEmail()
  email: string;
}
