import { Controller, Get, Res, Headers, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import { JwtService } from 'src/jwt/jwt/jwt.service';
import { Movies } from 'src/mongoose-schemas/movies.schema';
import { Genere } from 'src/mongoose-schemas/Genere.schema';
import { MoviesServiceService } from '../movies-service/movies-service.service';

@Controller('movies-controller')
export class MoviesControllerController {
    constructor(
        @InjectModel(Movies.name) private movieModel: Model<Movies>,
        @InjectModel(Genere.name) private genereModel: Model<Genere>,
        private jwt: JwtService,
        private moviesService: MoviesServiceService
    ) { }

    @Get('seed-movies-data')
    async seedMoviesData() {
        try {
            const moviesCount = await this.movieModel.countDocuments();
            const genresCount = await this.genereModel.countDocuments();

            if (moviesCount > 0 && genresCount > 0) {
                return { message: 'Data already seeded' };
            }

            // Fetch data from the third-party API
            const moviesResponse = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=eb69e2c15654e03da6e1d13ca46fd48e`);
            const genresResponse = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=eb69e2c15654e03da6e1d13ca46fd48e`);

            const moviesToSave = moviesResponse.data.results.map(movie => ({
                adult: movie.adult,
                backdrop_path: movie.backdrop_path,
                title: movie.title,
                overview: movie.overview,
                genre_ids: movie.genre_ids,
                vote_average: movie.vote_average,
            }));

            const genresToSave = genresResponse.data.genres.map(genre => ({
                id: genre.id,
                name: genre.name,
            }));

            await this.movieModel.insertMany(moviesToSave);
            await this.genereModel.insertMany(genresToSave);

            return { message: 'Movies and genres seeded successfully' };
        } catch (error) {
            console.error('Error seeding data:', error);
            return { error: 'Failed to seed movies and genres data' };
        }
    }

    @Get('getAllmovies')
    async getMovieData(@Res() res: Response, @Headers('authorization') authHeader: string) {
        try {
            if (!authHeader) {
                return res.status(HttpStatus.UNAUTHORIZED).json({ status: 0, message: 'Authorization header is missing' });
            }

            const token = authHeader.split(' ')[1];
            const decodedToken = await this.jwt.verifyToken(token);

            if (!decodedToken) {
                return res.status(HttpStatus.UNAUTHORIZED).json({ status: 0, message: 'Invalid token' });
            }

            const movies = await this.moviesService.getAllMovies();
            if (movies.status == 1) {
                return res.send({ status: movies.status, message: movies.message, data: movies.data });
            } else {
                return res.send({ status: movies.status, message: movies.message });
            }

        } catch (error) {
            console.error('Error getting movie data:', error);
            return res.send({ status: 0, message: error?.message })
        }
    }

    @Get('userRecommendedMovies')
    async userRecommendedVideos(@Res() res: Response, @Headers('authorization') authHeader: string) {
        try {
            if (!authHeader) {
                return res.status(HttpStatus.UNAUTHORIZED).json({ status: 0, message: 'Authorization header is missing' });
            }

            const token = authHeader.split(' ')[1];
            const decodedToken = await this.jwt.verifyToken(token);

            if (!decodedToken) {
                return res.status(HttpStatus.UNAUTHORIZED).json({ status: 0, message: 'Invalid token' });
            }

            const recommededMovies = await this.moviesService.getUserRecommendedMovies(decodedToken?._id);
            if (recommededMovies.status == 1) {
                return res.send({ status: recommededMovies.status, message: recommededMovies.message, data: recommededMovies.data });
            } else {
                return res.send({ status: recommededMovies.status, message: recommededMovies.message });
            }

        } catch (error) {
            console.error('Error getting recommended movie data:', error);
            return res.send({ status: 0, message: error?.message })
        }
    }
}
