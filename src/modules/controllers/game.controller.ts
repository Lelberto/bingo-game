import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ActionService } from '../actions/action.service';
import { CreateActionDto } from '../actions/entities/action.dto';
import { AccessTokenAuthGuard } from '../auth/jwt/guards/access-token-auth.guard';
import { CreateGameDto } from '../games/entities/game.dto';
import { Game } from '../games/entities/game.entity';
import { GameService } from '../games/game.service';
import { IdToGamePipe } from '../games/pipes/id-to-game.pipe';
import { ReqUser } from '../users/decorators/req-user.decorator';
import { User } from '../users/entities/user.entity';

/**
 * Game controller
 * 
 * Path: `/games`
 */
@Controller('games')
export class GameController {

  private readonly gameService: GameService;
  private readonly actionService: ActionService;

  public constructor(gameService: GameService, actionService: ActionService) {
    this.gameService = gameService;
    this.actionService = actionService;
  }

  @Post()
  @UseGuards(AccessTokenAuthGuard)
  public async create(@Body() dto: CreateGameDto, @ReqUser() author: User) {
    return {
      game: await this.gameService.create(dto, author)
    };
  }

  @Get()
  public async find() {
    return {
      games: await this.gameService.find()
    };
  }

  @Get(':id')
  public async findById(@Param('id', IdToGamePipe) game: Game) {
    return {
      game
    };
  }

  @Post(':id/actions')
  @UseGuards(AccessTokenAuthGuard)
  public async createAction(@Param('id', IdToGamePipe) game: Game, @ReqUser() author: User, @Body() dto: CreateActionDto) {
    return {
      action: await this.actionService.create(dto, author, game)
    };
  }
}
