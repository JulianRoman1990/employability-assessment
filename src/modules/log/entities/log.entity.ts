import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsEnum, IsString, IsDate, IsNumber } from 'class-validator';
import { FileType } from 'src/common/enums/logs.enums';


@Schema({ timestamps: true })
export class Log extends Document {
  @Prop({ type: String, required: true })
  @IsString()
  originalFileName: string;

  @Prop({ type: String, required: true })
  @IsString()
  processedFilePath: string;

  @Prop({ type: String, enum: FileType, default: FileType.CSV,  required: true })
  @IsEnum(FileType)
  fileType: FileType;

  @Prop({ type: Date, required: true })
  @IsDate()
  uploadDate: Date;

  @Prop({ type: String, required: true })
  @IsString()
  userId: string;

  @Prop({ type: Number, required: true })
  @IsNumber()
  recordCount: number;
}

export const LogSchema = SchemaFactory.createForClass(Log);
