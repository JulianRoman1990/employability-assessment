import { IsString, IsNotEmpty, IsOptional, IsEnum, IsBoolean } from 'class-validator';

export class ProcessFileDto {
  @IsString()
  @IsNotEmpty()
  sortColumn: string;

  @IsOptional()
  @IsBoolean()
  removeDuplicates?: boolean;

  @IsOptional()
  @IsBoolean()
  validateFormat?: boolean; 

  @IsString()
  @IsNotEmpty()
  @IsEnum(['asc', 'desc'])
  sortOrder: 'asc' | 'desc';

  @IsString()
  @IsOptional()
  outputFormat: 'csv' | 'xlsx' | 'pdf' | 'json' | 'xml' | 'txt';

  @IsString()
  @IsNotEmpty()
  fileUrl: string;
}
