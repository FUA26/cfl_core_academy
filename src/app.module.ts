import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import appConfig from './configs/app.config';
import { WinstonModule } from 'nest-winston';
import { LoggerModule } from './modules/logger/logger.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { CourseModule } from './modules/course/course.module';
import { ReviewModule } from './modules/review/review.module';

import * as winston from 'winston';
import authConfig from './configs/auth.config';

@Module({
  imports: [
    WinstonModule.forRoot({
      format: winston.format.json(),
      level: 'debug',
      transports: [new winston.transports.Console()],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, authConfig],
      envFilePath: ['.env'],
    }),
    UserModule,
    LoggerModule,
    AuthModule,
    PrismaModule,
    CourseModule,
    ReviewModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
