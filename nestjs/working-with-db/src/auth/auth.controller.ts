import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { username: string; password: string }) {
    const user = await this.authService.validateUser(loginDto.username, loginDto.password);
    if (!user) throw new Error('Invalid credentials');
    return this.authService.login(user);
  }

  // Example protected route
  @UseGuards(AuthGuard('jwt')) // 'jwt' matches the default strategy name
  @Post('profile')
  getProfile(@Request() req) {
    return req.user; // Returns the user object from the JWT payload
  }
}