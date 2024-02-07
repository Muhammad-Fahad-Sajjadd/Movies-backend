import { Controller, Res, Headers, HttpStatus, Body, BadRequestException, ValidationPipe, Put, Post, Get } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { updateUserProfileDto } from 'src/dto/updateUserProfile.dto';
import { Request, Response } from 'express';
import { JwtService } from 'src/jwt/jwt/jwt.service';
import { UserServiceService } from '../user-service/user-service.service';
import { movieRatingDto } from 'src/dto/movieRating.dto';
import { validate } from 'class-validator';

@Controller('user-controller')
export class UserControllerController {
    constructor(
        private jwt: JwtService,
        private userService: UserServiceService
    ) { }

    @Get('getUserProfile')
    async getUserProfile(@Res() res: Response, @Headers('authorization') authHeader: string) {
        try {
            if (!authHeader) {
                return res.status(HttpStatus.UNAUTHORIZED).json({ status: 0, message: 'Authorization header is missing' });
            }

            const token = authHeader.split(' ')[1];
            const decodedToken = await this.jwt.verifyToken(token);

            if (!decodedToken) {
                return res.status(HttpStatus.UNAUTHORIZED).json({ status: 0, message: 'Invalid token' });
            }

            const userProfile = await this.userService.getUserProfile(decodedToken?._id);
            if (userProfile.status == 1) {
                return res.send({ status: userProfile.status, message: userProfile.message, data: userProfile.data });
            } else {
                return res.send({ status: userProfile.status, message: userProfile.message });
            }

        } catch (error) {
            console.error('Error getting movie data:', error);
            return res.send({ status: 0, message: error?.message })
        }
    }

    @Put('updateUserProfile')
    async updateUserProfile(@Res() res: Response, @Headers('authorization') authHeader: string, @Body() updateUserProfileData: updateUserProfileDto) {
        try {
            if (!authHeader) {
                return res.status(HttpStatus.UNAUTHORIZED).json({ status: 0, message: 'Authorization header is missing' });
            }

            const token = authHeader.split(' ')[1];
            const decodedToken = await this.jwt.verifyToken(token);

            if (!decodedToken) {
                return res.status(HttpStatus.UNAUTHORIZED).json({ status: 0, message: 'Invalid token' });
            }


            const updateUserProfile = await this.userService.updateUserProfile(decodedToken?._id, updateUserProfileData);
            if (updateUserProfile.status == 1) {
                return res.send({ status: updateUserProfile.status, message: updateUserProfile.message, data: updateUserProfile.data });
            } else {
                return res.send({ status: updateUserProfile.status, message: updateUserProfile.message });
            }

        } catch (error) {
            console.error('Error getting movie data:', error);
            return res.send({ status: 0, message: error?.message })
        }
    }

    @Post('giveMovieRating')
    async giveMovieRating(@Res() res: Response, @Headers('authorization') authHeader: string, @Body(new ValidationPipe({ transform: true })) movieRatingData: movieRatingDto) {
        console.log('AUTH HEADER', authHeader);
        try {
            if (!authHeader) {
                return res.status(HttpStatus.UNAUTHORIZED).json({ status: 0, message: 'Authorization header is missing' });
            }

            const token = authHeader.split(' ')[1];
            const decodedToken = await this.jwt.verifyToken(token);

            if (!decodedToken) {
                return res.status(HttpStatus.UNAUTHORIZED).json({ status: 0, message: 'Invalid token' });
            }

            const errors = await validate(movieRatingData);
            if (errors.length > 0) {
                throw new BadRequestException(errors);
            }

            const rateMovie = await this.userService.userGiveMovieRating(decodedToken?._id, movieRatingData);
            if (rateMovie.status == 1) {
                return res.send({ status: rateMovie.status, message: rateMovie.message, data: rateMovie.data });
            } else {
                return res.send({ status: rateMovie.status, message: rateMovie.message });
            }

        } catch (error) {
            console.error('Error rating movie:', error);
            return res.send({ status: 0, message: error?.message })
        }
    }
}
