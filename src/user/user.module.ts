import { Module } from '@nestjs/common';
import { MongooseSchemasModule } from 'src/mongoose-schemas/mongoose-schemas.module';
import { JwtModule } from 'src/jwt/jwt.module';
import { UserControllerController } from './user-controller/user-controller.controller';
import { UserServiceService } from './user-service/user-service.service';

@Module({
    imports: [MongooseSchemasModule, JwtModule],
    controllers: [UserControllerController],
    providers: [UserServiceService]
})
export class UserModule {}
