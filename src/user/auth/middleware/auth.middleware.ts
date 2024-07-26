import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { ENV } from 'src/utils/env.utils';

@Injectable()
export class Protect implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const authorizationHeader = req.headers.authorization;
      if (!authorizationHeader) throw new UnauthorizedException('Unauthorized');

      const [bearer, token] = authorizationHeader.split(' ');
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException('Unauthorized');
      }

      const payload: any = verify(token, ENV.JWT_SECRET);
      req['userId'] = payload.id;

      next();
    } catch (error: any) {
      throw new UnauthorizedException('unauthorized');
    }
  }
}
