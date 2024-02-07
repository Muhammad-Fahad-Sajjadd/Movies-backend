import { Injectable } from '@nestjs/common';
import { JwtService as jwtService } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(private readonly jwtService: jwtService) { }

  async generateToken(payload: any) {
    const expiresIn = '1h';
    return await this.jwtService.signAsync(payload,{ expiresIn });
  }

  async verifyToken(token: string) {
    try {
      return this.jwtService.verifyAsync(token);
    } catch (error) {
      return { status: 0, message: 'Invalid Token' };
    }
  }
}
