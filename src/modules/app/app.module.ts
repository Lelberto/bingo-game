import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { ControllerModule } from '../controllers/controller.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    ControllerModule
  ]
})
export class AppModule {}
