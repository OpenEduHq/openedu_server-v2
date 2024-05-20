import { IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  githubId: string;

  @IsString()
  LinkdinId: string;

  @IsString()
  portfolio: string;
}
