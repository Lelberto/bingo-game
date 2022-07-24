import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DatabaseConfig } from '../config/database.config';

/**
 * Database module
 */
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (config: ConfigService) => {
        const env = 'development' as string; // TODO Make environment dynamic
        const dbConfig = config.get<DatabaseConfig>('database');
        return {
          type: dbConfig.type as any,
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.user,
          password: dbConfig.password,
          database: dbConfig.name,
          entities: [],
          namingStrategy: new SnakeNamingStrategy(),
          synchronize: env !== 'production',
          dropSchema: env === 'test',
          maxQueryExecutionTime: 1000,
          logging: env === 'development'
        }
      },
      inject: [ConfigService]
    })
  ]
})
export class DatabaseModule {}
