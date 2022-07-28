import { Controller, Get, Param } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { ResolveUserPipe } from '../users/pipes/resolve-user.pipe';
import { UserService } from '../users/user.service';

/**
 * User controller
 * 
 * Path : `/users`
 */
@Controller('users')
export class UserController {

  private readonly userService: UserService;

  public constructor(userService: UserService) {
    this.userService = userService;
  }

  @Get()
  public async find() {
    return {
      users: await this.userService.find()
    }
  }

  @Get(':username')
  public async findByUsername(@Param('username', ResolveUserPipe) user: User) {
    return {
      user
    }
  }
}
