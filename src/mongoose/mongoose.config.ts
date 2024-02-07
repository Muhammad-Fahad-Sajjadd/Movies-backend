import { MongooseModuleOptions } from '@nestjs/mongoose';

export const mongooseConfig: MongooseModuleOptions = {
  uri: 'mongodb://127.0.0.1:27017/rockvilleMovies',
  dbName: 'rockvilleMovies',
};
