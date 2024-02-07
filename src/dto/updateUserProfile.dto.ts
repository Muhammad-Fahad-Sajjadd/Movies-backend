import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Multer } from 'multer';

export class updateUserProfileDto {
    @IsOptional()
    @IsNotEmpty()
    name?: string;
  
    @IsOptional()
    @IsNotEmpty()
    address?: string;
  
    @IsOptional()
    @IsNotEmpty()
    imageFile?: Multer.File;

    @IsOptional()
    @IsNotEmpty()
    Dob?: number;

    @IsOptional()
    @IsNotEmpty()
    genres?: string[];
}
