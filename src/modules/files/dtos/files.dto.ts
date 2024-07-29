import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { fileStatus } from '../../../common/enums/fileStatus.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFileDto {
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly content: Buffer;

  @IsEnum(fileStatus)
  @IsOptional()
  @ApiProperty()
  readonly status?: fileStatus = fileStatus.PENDING;
}