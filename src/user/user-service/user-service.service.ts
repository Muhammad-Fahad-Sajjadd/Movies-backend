import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { updateUserProfileDto } from 'src/dto/updateUserProfile.dto';
import { Genere } from 'src/mongoose-schemas/Genere.schema';
import { Movies } from 'src/mongoose-schemas/movies.schema';
import { User } from 'src/mongoose-schemas/User.schema';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UserServiceService {
    constructor(
        @InjectModel(Movies.name) private movieModel: Model<Movies>,
        @InjectModel(Genere.name) private genereModel: Model<Genere>,
        @InjectModel(User.name) private userModel: Model<User>,
    ) { }

    async updateUserProfile(userId: string, updateUserProfileData: updateUserProfileDto) {
        try {
            const fieldsToUpdate = Object.keys(updateUserProfileData);
    
            if (fieldsToUpdate.length === 0) {
                return {status:0,message:'Please specify at least one field to update'}
            }
            const updatedFields = {};
            fieldsToUpdate.forEach(field => {
                updatedFields[field] = updateUserProfileData[field];
            });

            if (updateUserProfileData.imageFile) {
                const uploadDir = path.join(__dirname, '..', '..', 'user-profile-images');
                if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir, { recursive: true });
                }

                const fileName = `${Date.now()}-${updateUserProfileData.imageFile.originalname}`;
                const filePath = path.join(uploadDir, fileName);

                await fs.promises.writeFile(filePath, updateUserProfileData.imageFile.buffer);

                updatedFields['imagePath'] = filePath;
            }
    
            const updateUserData = await this.userModel.findByIdAndUpdate(userId, updatedFields, { new: true,select: '-password' });
            
            if (!updateUserData) {
                return {status: 0, message: 'User not found'};
            }
    
            return {status:1,message:'User Profile updated successfully',data:updateUserData};
        } catch (error) {
            console.log(error)
            return { status: 0, message: 'Error while updating User Profile' }
        }
    }

    async getUserProfile(userId: string) {
      try {
          const UserData = await this.userModel.findById(userId,{ select: '-password' });
          
          if (!UserData) {
              return {status: 0, message: 'User not found'};
          }
  
          return {status:1,message:'User get Successfully',data:UserData};
      } catch (error) {
          console.log(error)
          return { status: 0, message: 'Error while updating User Profile' }
      }
  }
    

    async userGiveMovieRating(userId: string, movieRatingData) {
        try {
          const { movieId, rating } = movieRatingData;
      
          const movie = await this.movieModel.findById(movieId);
          if (!movie) {
            return {status:0,message:'movie not found'}
          }
      
          movie.ratings.push(rating);
          await movie.save();
      
          const user = await this.userModel.findById(userId);
          if (!user) {
            return {status:0,message:'User not found'}
          }
      
          const alreadyRated = user.ratedMovies.some((ratedMovie) => ratedMovie.movieId === movieId);
          if (alreadyRated) {
            return {status:0,message:'Movie Already rated by the user'};
          }
      
          user.ratedMovies.push({ movieId, rating });
          await user.save();
      
          return { status: 1, message: 'Movie rating added successfully', data: movie };
        } catch (error) {
          return { status: 0, message: 'Error while adding movie rating', error };
        }
      }
      
}
