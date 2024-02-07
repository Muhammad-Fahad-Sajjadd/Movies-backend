import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { connect, ConnectOptions } from 'mongoose';
import { mongooseConfig } from '../mongoose/mongoose.config';

@Injectable()
export class DatabaseMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      await connect(mongooseConfig.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: mongooseConfig.dbName,
      } as ConnectOptions);
      next();
    } catch (error) {
      console.error('Database connection error:', error);
      return { status: 0, message: 'Not Connecting to a DB!' };
    }
  }
}
