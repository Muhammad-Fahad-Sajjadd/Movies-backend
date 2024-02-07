import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './User.schema';
import { Movies,MovieSchema } from './movies.schema';
import { Genere,GenereSchema } from './Genere.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Movies.name, schema: MovieSchema }]),
    MongooseModule.forFeature([{ name: Genere.name, schema: GenereSchema }]),
  ],
  exports: [MongooseModule],
  controllers: [],
  providers: [],
})
export class MongooseSchemasModule {}
