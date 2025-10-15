import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { LoggerModule } from 'nestjs-pino';

import { RequestsModule } from './modules/requests/requests.module';
import { CatalogsModule } from './modules/catalogs/catalogs.module';
import { TermsModule } from './modules/terms/terms.module';
import { HealthModule } from './modules/health/health.module';
import { DatabaseConfig } from './config/database.config';
import { AppConfig } from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [AppConfig],
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.LOG_LEVEL || 'info',
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
          },
        },
      },
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => DatabaseConfig.getConfig(),
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 minute
        limit: 100, // 100 requests per minute
      },
    ]),
    RequestsModule,
    CatalogsModule,
    TermsModule,
    HealthModule,
  ],
})
export class AppModule {}
