import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UploadFileDto {
  @ApiProperty({
    description: 'Name of the file being uploaded',
    example: 'example-file.txt',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Type of the file being uploaded',
    example: 'text/plain',
  })
  @IsString()
  @IsNotEmpty()
  type: string;
}
