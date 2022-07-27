import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ActionService } from '../actions/action.service';
import { CreateActionDto } from '../actions/entities/action.dto';
import { AccessTokenAuthGuard } from '../auth/jwt/guards/access-token-auth.guard';
import { UpdateGamePlayerDto } from '../games/entities/game-player.dto';
import { GamePlayer } from '../games/entities/game-player.entity';
import { CreateGameDto } from '../games/entities/game.dto';
import { Game } from '../games/entities/game.entity';
import { GamePlayerService } from '../games/game-player.service';
import { GameService } from '../games/game.service';
import { ResolveGamePlayerPipe } from '../games/pipes/resolve-game-player.pipe';
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
  private readonly gamePlayerService: GamePlayerService;
  private readonly actionService: ActionService;

  public constructor(gameService: GameService, gamePlayerService: GamePlayerService, actionService: ActionService) {
    this.gameService = gameService;
    this.gamePlayerService = gamePlayerService;
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

  @Get(':id/players')
  public async findPlayers(@Param('id', IdToGamePipe) game: Game) {
    return {
      gamePlayers: await this.gamePlayerService.findByGame(game)
    };
  }

  @Get(':id/join')
  @UseGuards(AccessTokenAuthGuard)
  public async join(@Param('id', IdToGamePipe) game: Game, @ReqUser() user: User) {
    return {
      gamePlayer: await this.gamePlayerService.create(user, game)
    };
  }

  @Patch(':gameId/players/:userId') // TODO Change "id" to "gameId" for all endpoints, and all "userId" to "username" :)
  @UseGuards(AccessTokenAuthGuard)
  public async updatePlayer(@Param(ResolveGamePlayerPipe) gamePlayer: GamePlayer, @Param('id', IdToGamePipe) game: Game, @ReqUser() authUser: User, @Body() dto: UpdateGamePlayerDto) {
    return {
      gamePlayer: await this.gamePlayerService.update(gamePlayer, dto, await this.gamePlayerService.findOneByGame(game, authUser))
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
