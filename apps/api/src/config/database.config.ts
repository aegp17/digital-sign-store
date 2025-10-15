import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export class DatabaseConfig {
  static getConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      url: process.env.DATABASE_URL || 'postgres://app:app@localhost:5432/app',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV === 'development',
      logging: process.env.NODE_ENV === 'development',
      migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
      migrationsRun: false,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    };
  }
}
