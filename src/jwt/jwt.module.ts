import { Module } from '@nestjs/common';
import { JwtService } from './jwt/jwt.service';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    NestJwtModule.register({
      secret: 'FAH0085', // Replace with your secret key
      signOptions: { expiresIn: '1m' }, // Token expiration time
    }),
  ],
  providers: [JwtService],
  exports : [JwtService]
})
export class JwtModule {}
