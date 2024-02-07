import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';

export class authenticateUserDto {
    @IsEmail({}, { message: 'Please provide a valid email' })
    @IsNotEmpty({ message: 'Email cannot be empty' })
    email: string;

    @IsString({ message: 'Password must be a string' })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @IsNotEmpty({ message: 'Password cannot be empty' })
    password: string;

}
