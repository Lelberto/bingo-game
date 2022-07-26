import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import appConfig from './app.config';
import authConfig from './auth.config';
import databaseConfig from './database.config';

/**
 * Configuration module
 * 
 * This module is used to set up the configuration for the application.
 * Use the `ConfigService` (from `@nestjs/config`) to access the configuration.
 */
@Module({
  imports: [NestConfigModule.forRoot({
    isGlobal: true,
    envFilePath: ['.env.development', '.env'],
    load: [appConfig, databaseConfig, authConfig]
  })]
})
export class ConfigModule {}
