import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  fullname: string;

  @IsString()
  email: string;

  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsString()
  publicKey: string;

  @IsString()
  nonce: string;

  @IsString()
  @MinLength(6)
  password: string;
}
