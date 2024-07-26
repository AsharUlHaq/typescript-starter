import { PartialType } from '@nestjs/mapped-types';
import { IsString, Length, MinLength } from 'class-validator';
// import { CreateProjectDto } from './create-user.dto';

export class UpdateUserDto {
  @IsString()
  @Length(3, 30, { message: 'Invalid Username' })
  username?: string;

  @MinLength(11)
  number?: string;

  @IsString()
  age?: string;

  @IsString()
  country?: string;

  @IsString()
  city?: string;
}
