import { Injectable } from '@nestjs/common';
import { Movies } from 'src/mongoose-schemas/movies.schema';
import { Genere } from 'src/mongoose-schemas/Genere.schema';
import { User } from 'src/mongoose-schemas/User.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MoviesServiceService {
    constructor(
        @InjectModel(Movies.name) private movieModel: Model<Movies>,
        @InjectModel(Genere.name) private genereModel: Model<Genere>,
        @InjectModel(User.name) private userModel: Model<User>,
    ) { }

    async getAllMovies() {
        try {
            const movies = await this.movieModel.find();
            const updatedMovies = [];
    
            for (const movie of movies) {
                const updatedGenres = [];
                for (const genreId of movie.genre_ids) {
                    const genre = await this.getGenreName(genreId);
                    updatedGenres.push(genre ? genre.name : null);
                }
                updatedMovies.push({ ...movie.toJSON(), genre_names: updatedGenres });
            }
    
            return { status: 1, message: 'Get Movies Successfully', data: updatedMovies };
        } catch (error) {
            return { status: 0, message: 'Failed to get movies data' };
        }
    }

    async getUserRecommendedMovies(userId: string) {
        try {
            const user = await this.userModel.findById(userId);
            if (!user) {
                return { status: 0, message: 'User not found' };
            }

            const userGenres = user.genres;
            if(userGenres?.length==0){
                return {status:0,message:'Unable to Recommed movies, Genere not found in user profile, Please update profile first to add user fav genere then try again! As movies are currently being recommeded based on user Fav Generes'}
            }
            const genreObjects = await this.genereModel.find({ name: { $in: userGenres } });
            const genreIds = genreObjects.map(genre => genre.id);

            const recommendedMovies = await this.movieModel.find({ genre_ids: { $in: genreIds } });

            const updatedRecommendedMovies = [];
            for (const movie of recommendedMovies) {
                const updatedGenres = [];
                for (const genreId of movie.genre_ids) {
                    const genre = await this.genereModel.findOne({ id: genreId });
                    updatedGenres.push(genre ? genre.name : null);
                }
                updatedRecommendedMovies.push({ ...movie.toJSON(), genre_names: updatedGenres });
            }

            return { status: 1, message: 'Recommended Movies', data: updatedRecommendedMovies };
        } catch (error) {
            console.error('Error getting user recommended movies:', error);
            return { status: 0, message: 'Failed to get recommended movies' };
        }
    }

    async getGenreName(genreId: number) {
        try {
            const genre = await this.genereModel.findOne({ id: genreId });
            return genre;
        } catch (error) {
            console.error('Error getting genre:', error);
            return null;
        }
    }
}
