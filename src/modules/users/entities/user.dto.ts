import { PartialType } from '@nestjs/swagger';

/**
 * DTO for user creation
 */
export class CreateUserDto {
  googleId: string;
  email: string;
  username: string;
  name: string;
}

/**
 * DTO for user update
 */
export class UpdateUserDto extends PartialType(CreateUserDto) {}
