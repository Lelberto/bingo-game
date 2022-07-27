import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { GameService } from './game.service';

/**
 * Game module
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([Game])
  ],
  providers: [GameService],
  exports: [GameService]
})
export class GameModule {}
