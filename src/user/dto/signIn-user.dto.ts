import { IsEmail, IsNotEmpty, isNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail({}, { message: 'Invalid Email' })
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
