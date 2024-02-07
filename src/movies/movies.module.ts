import { Module } from '@nestjs/common';
import { MoviesServiceService } from './movies-service/movies-service.service';
import { MoviesControllerController } from './movies-controller/movies-controller.controller';
import { MongooseSchemasModule } from 'src/mongoose-schemas/mongoose-schemas.module';
import { JwtModule } from 'src/jwt/jwt.module';

@Module({
  imports: [MongooseSchemasModule, JwtModule],
  providers: [MoviesServiceService],
  controllers: [MoviesControllerController]
})
export class MoviesModule { }
