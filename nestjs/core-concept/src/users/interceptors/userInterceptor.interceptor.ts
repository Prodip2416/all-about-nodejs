import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { User, UserResponse } from '../interface/userInterface.interface';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<UserResponse<User>> {
    return next.handle().pipe(
      map((data: User) => ({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      })),
    );
  }
}
