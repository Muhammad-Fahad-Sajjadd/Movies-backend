import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { mongooseConfig } from './mongoose/mongoose.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseMiddleware } from './middleware/database.middleware';
import { JwtModule } from './jwt/jwt.module';
import { AuthModule } from './auth/auth.module';
import { MongooseSchemasModule } from './mongoose-schemas/mongoose-schemas.module';
import { MoviesModule } from './movies/movies.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => mongooseConfig,
    }),
    JwtModule,
    AuthModule,
    MongooseSchemasModule,
    MoviesModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DatabaseMiddleware).forRoutes('register-controller','login-controller','movies-controller');
  }
}
