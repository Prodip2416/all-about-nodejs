import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  // Mock user validation (replace with real DB logic)
  async validateUser(username: string, password: string): Promise<any> {
    const user = { id: 1, username: 'john', password: 'pass123' }; // Mock user
    if (user && user.password === password && user.username === username) {
      const { password, ...result } = user; // Strip password from result
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id }; // JWT payload
    return {
      access_token: this.jwtService.sign(payload), // Generate JWT
    };
  }
}