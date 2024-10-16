import { IsString } from 'class-validator';

export class UpdateDraftDto {
  @IsString()
  body: string;
}
