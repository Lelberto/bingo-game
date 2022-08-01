import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserService } from '../user.service';

/**
 * Resolve an user by username
 */
@Injectable()
export class ResolveUserPipe implements PipeTransform<string, Promise<User>> {
  
  private readonly userService: UserService;

  public constructor(userService: UserService) {
    this.userService = userService;
  }

  public async transform(username: string, metadata: ArgumentMetadata): Promise<User> {
    return await this.userService.findByUsername(username);
  }
}
