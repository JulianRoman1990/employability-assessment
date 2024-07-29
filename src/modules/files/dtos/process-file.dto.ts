import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsEnum, IsBoolean } from 'class-validator';

export class ProcessFileDto {
  @ApiProperty({
    description: 'Column by which to sort the data',
    example: 'name',
  })
  @IsString()
  @IsNotEmpty()
  sortColumn: string;

  @ApiPropertyOptional({
    description: 'Whether to remove duplicate entries',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  removeDuplicates?: boolean;

  @ApiPropertyOptional({
    description: 'Whether to validate the file format',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  validateFormat?: boolean; 

  @ApiProperty({
    description: 'Order in which to sort the data',
    enum: ['asc', 'desc'],
    example: 'asc',
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(['asc', 'desc'])
  sortOrder: 'asc' | 'desc';

  @ApiPropertyOptional({
    description: 'Format of the output file',
    enum: ['csv', 'xlsx', 'pdf', 'json', 'xml', 'txt'],
    example: 'csv',
  })
  @IsString()
  @IsOptional()
  outputFormat: 'csv' | 'xlsx' | 'pdf' | 'json' | 'xml' | 'txt';

  @ApiProperty({
    description: 'URL of the file to be processed',
    example: 'http://example.com/file/12345',
  })
  @IsString()
  @IsNotEmpty()
  fileUrl: string;
}
