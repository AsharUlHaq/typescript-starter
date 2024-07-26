import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './user/user.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GlobalInterceptor } from './user/interceptor/global.interceptor';

@Module({
  imports: [ProjectModule],
  controllers: [AppController],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: GlobalInterceptor },
    AppService,
  ],
})
export class AppModule {}
