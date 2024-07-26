import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MinLength,
  ValidateIf,
} from 'class-validator';
import {} from 'class-transformer';

export class CreateUserDto {
  @IsNotEmpty({ message: 'field is required' })
  @IsString()
  @Length(3, 30, { message: 'Invalid Username' })
  username: string;

  @IsNotEmpty({ message: 'field is required' })
  @IsString()
  @IsEmail({}, { message: 'Invalid Email' })
  @Length(3, 30, { message: 'Invalid Email' })
  email: string;

  @IsNotEmpty({ message: 'field is required' })
  @IsString()
  @Length(8, 30, {
    message: 'password should be min of 8 characters or max of 30 characters',
  })
  // @IsStrongPassword(
  //   {
  //     minLength: 8,
  //     minLowercase: 1,
  //     minUppercase: 1,
  //     minNumbers: 1,
  //     minSymbols: 0,
  //   },
  //   {
  //     message:
  //       'The password should contain at least 1 uppercase character, 1 lowercase, 1 number and should be at least 8 characters long.'
  //    },
  //   )
  password: string;

  @IsNotEmpty({ message: 'field is required' })
  @IsString()
  @Length(8, 30, {
    message:
      'confirm password should be min of 8 characters or max of 30 characters',
  })
  @ValidateIf((o) => o.password)
  confirmPassword: string;

  @IsNotEmpty()
  // @IsNumber()
  // @MaxLength(11)
  @MinLength(11)
  number: string;

  @IsString()
  age: string;

  @IsString()
  gender: string;

  @IsString()
  country: string;

  @IsString()
  city: string;
}
