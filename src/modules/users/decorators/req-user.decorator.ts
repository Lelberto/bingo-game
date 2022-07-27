import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../entities/user.entity';

/**
 * Request user parameter decorator
 * 
 * This decorator is used to get the authenticated user from the request. This is same as `req.user`.
 */
export const ReqUser = createParamDecorator<unknown, ExecutionContext, User>((data, ctx) => {
  return ctx.switchToHttp().getRequest().user;
});
