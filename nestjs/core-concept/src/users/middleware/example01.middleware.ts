import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ExampleMiddleware01 implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('example middleware--- 02');

    next();
  }
}
