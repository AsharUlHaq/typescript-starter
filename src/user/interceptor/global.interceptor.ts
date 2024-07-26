import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class GlobalInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((responseData) => {
        let status = 200;
        let message = 'Success';
        let data: unknown = null;
        if (responseData) {
          if (typeof responseData == 'string') {
            message = responseData;
          } else if (Array.isArray(responseData)) {
            data = responseData;
          } else {
            status = responseData?.status || 200;
            message = responseData?.message || 'Success';
            data = responseData?.data || null;
          }
        }
        context.switchToHttp().getResponse().status(status);
        return { status, message, data };
      }),
    );
  }
}
