import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ExampleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('example middleware--- 01');
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
  }
}
