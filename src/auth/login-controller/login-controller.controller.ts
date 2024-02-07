import { Controller, Get, Post, Req, Res, Body, ValidationPipe, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthServiceService } from '../auth-service/auth-service.service';
import { authenticateUserDto } from 'src/dto/authenticateUser.dto';
import { validate } from 'class-validator';

@Controller('login-controller')
export class LoginControllerController {
    constructor(private authService: AuthServiceService) { }
    @Post('userLogin')
    async auth(@Body(new ValidationPipe({ transform: true })) authDetails: authenticateUserDto, @Res() res: Response) {
        const errors = await validate(authDetails);
        if (errors.length > 0) {
            throw new BadRequestException(errors);
        }
        const isLogin = await this.authService.login(authDetails);
        if (isLogin.status == 200) {
            return res.send({ status: 1, message: isLogin.message, data: isLogin.data });
        } else {
            return res.send({ status: isLogin.status, message: isLogin.message });
        }
    }
}
