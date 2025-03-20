import { IsNotEmpty, IsString } from 'class-validator';

export class GoogleTokenDTO {
  @IsString()
  @IsNotEmpty()
  token: string;
}
