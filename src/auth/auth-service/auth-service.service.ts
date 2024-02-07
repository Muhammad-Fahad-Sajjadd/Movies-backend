import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '../../mongoose-schemas/User.schema';
import { JwtService } from '../../jwt/jwt/jwt.service';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { authenticateUserDto } from 'src/dto/authenticateUser.dto';

@Injectable()
export class AuthServiceService {
    constructor(@InjectModel(User.name) private userModel: Model<User>, private jwt: JwtService) { }

    async createUser(User: CreateUserDto) {
        try {
            const isEmailExist = await this.userModel.findOne({ email: User.email }).exec();
            if (!isEmailExist) {
                const saltRounds = 10;
                const salt = await bcrypt.genSalt(saltRounds);
                const hashedPassword = await bcrypt.hash(User.password, salt);
                let newUser = new this.userModel({
                    ...User,
                    password: hashedPassword
                });
                const UserId = { _id: newUser._id.toString() }
                const token = await this.jwt.generateToken(UserId);
                newUser.jwtToken = token
                await newUser.save();
                return { status: 201, message: 'User Added Successfully!', data: newUser };
            } else {
                return { status: 400, message: 'Email Exist!' };
            }
        } catch (error) {
            console.log(error)
            return { status: 500, message: 'Something went wrong' };
        }
    }
    async login(authDetails: authenticateUserDto) {
        try {
            
            const User = await this.userModel.findOne({ email: authDetails.email }).exec();
            if (!User) {
                return { status: 404, message: 'User not found!' };
            }
            const passwordMatch = await bcrypt.compare(authDetails.password, User.password.toString());
            if (passwordMatch) {
                const UserId = { _id: User._id.toString() }
                const token = await this.jwt.generateToken(UserId);
                const responseUser = { ...User.toObject(), jwtToken: undefined, password: undefined, jwt: token };
                return { status: 200, message: 'User Logged in!', data: responseUser };
            } else {
                return { status: 400, message: 'Inavlid Password!' };
            }
        } catch (error) {
            return { status: 500, message: 'Something went wrong!' };
        }
    }
}
