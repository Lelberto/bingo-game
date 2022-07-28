import { PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

/**
 * DTO for action creation
 */
export class CreateActionDto {
  @IsString()
  description: string;
  
  @IsString()
  result: string;

  @IsString()
  targetId: string;
}

/**
 * DTO for action update
 */
export class UpdateActionDto extends PartialType(CreateActionDto) {

}
