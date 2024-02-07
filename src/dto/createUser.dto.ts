import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Please provide a valid email' })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @IsNotEmpty({ message: 'Password cannot be empty' })
  password: string;

  @IsString({ message: 'Confirm Password must be a string' })
  @MinLength(8, { message: 'Confirm Password must be at least 8 characters long' })
  @IsNotEmpty({ message: 'Confirm Password cannot be empty' })
  confirmPassword: string;
}
