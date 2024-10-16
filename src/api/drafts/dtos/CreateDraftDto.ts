import { IsString } from 'class-validator';

export class CreateDraftDto {
  @IsString()
  sender: string;

  @IsString()
  body: string;

  @IsString()
  aesKey: string;

  @IsString()
  iv: string;
}
