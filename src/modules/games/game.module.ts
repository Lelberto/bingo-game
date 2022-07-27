import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamePlayer } from './entities/game-player.entity';
import { Game } from './entities/game.entity';
import { GamePlayerService } from './game-player.service';
import { GameService } from './game.service';

/**
 * Game module
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([Game, GamePlayer])
  ],
  providers: [GameService, GamePlayerService],
  exports: [GameService, GamePlayerService]
})
export class GameModule {}
