import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import appConfig from './configs/app.config';
import { WinstonModule } from 'nest-winston';
import { LoggerModule } from './modules/logger/logger.module';
import * as winston from 'winston';

@Module({
  imports: [
    WinstonModule.forRoot({
      format: winston.format.json(),
      level: 'debug',
      transports: [new winston.transports.Console()],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: ['.env'],
    }),
    UserModule,
    LoggerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
