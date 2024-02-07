import { Module } from '@nestjs/common';
import { LoginControllerController } from './login-controller/login-controller.controller';
import { AuthServiceService } from './auth-service/auth-service.service';
import { RegisterControllerController } from './register-controller/register-controller.controller';
import {MongooseSchemasModule} from '../mongoose-schemas/mongoose-schemas.module';
import {JwtModule} from '../jwt/jwt.module';

@Module({
  imports : [MongooseSchemasModule,JwtModule],
  providers: [AuthServiceService],
  controllers: [LoginControllerController, RegisterControllerController]
})
export class AuthModule {}
