import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserService } from '../user.service';

/**
 * Username to user pipe
 * 
 * Used to transform the `:username` parameter to the corresponding user.
 * 
 * This pipe can be used with `@Param()`.
 */
@Injectable()
export class UsernameToUserPipe implements PipeTransform<string, Promise<User>> {
  
  private readonly userService: UserService;

  public constructor(userService: UserService) {
    this.userService = userService;
  }

  public async transform(username: string, metadata: ArgumentMetadata): Promise<User> {
    if (metadata.type === 'param') {
      return await this.userService.findByUsername(username);
    }
    throw new Error(`${this.constructor.name} can only be used with @Param()`);
  }
}
