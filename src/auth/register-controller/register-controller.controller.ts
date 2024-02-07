import { Controller, Get, Post, Req, Res, Body, ValidationPipe, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthServiceService } from '../auth-service/auth-service.service';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { validate } from 'class-validator';

@Controller('register-controller')
export class RegisterControllerController {
    constructor(private authService: AuthServiceService) { }
    @Post('createUser')
    async createUser(@Body(new ValidationPipe({ transform: true })) createUser: CreateUserDto, @Res() res: Response) {
        const errors = await validate(createUser);
        if (errors.length > 0) {
            throw new BadRequestException(errors);
        }
        const isAdded = await this.authService.createUser(createUser);
        if (isAdded.status == 201) {
            return res.send({ status: 1, message: isAdded.message, data: isAdded.data })
        } else {
            return res.send({ status: isAdded.status, message: isAdded.message, data: isAdded.data })
        }
    }
}
