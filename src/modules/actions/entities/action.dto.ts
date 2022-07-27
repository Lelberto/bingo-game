import { PartialType } from '@nestjs/swagger';

/**
 * DTO for action creation
 */
export class CreateActionDto {
  description: string;
  result: string;
}

/**
 * DTO for action update
 */
export class UpdateActionDto extends PartialType(CreateActionDto) {

}
