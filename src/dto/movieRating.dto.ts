import { IsNotEmpty, IsNumber, Min, Max } from 'class-validator';

export class movieRatingDto {
  @IsNotEmpty({ message: 'Movie Id cannot be empty' })
  movieId: string;

  @IsNumber({},{ message: 'Rating must be a number' })
  @Min(1,{message: 'Minimum 1 rating must be added'})
  @Max(5,{message: 'Max 5 rating allowed'})
  rating: number;
}
