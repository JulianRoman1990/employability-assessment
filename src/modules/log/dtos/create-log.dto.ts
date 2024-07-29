import { IsString } from 'class-validator';

export class CreateLogDto {
  @IsString()
  readonly operation: string;

  @IsString()
  readonly fileId: string;

  @IsString()
  readonly message: string;

  @IsString()
  readonly status: string;
}
