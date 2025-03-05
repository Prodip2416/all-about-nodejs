import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from "Bearer <token>" header
      ignoreExpiration: false, // Reject expired tokens
      secretOrKey: 'your-secret-key', // Must match the secret in JwtModule
    });
  }

  async validate(payload: any) {
    // This runs after the token is verified
    // Payload is the decoded JWT (e.g., { sub: "userId", username: "john" })
    return { userId: payload.sub, username: payload.username };
  }
}