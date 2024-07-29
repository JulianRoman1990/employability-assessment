import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Log extends Document {
  @Prop()
  originalFilePath: string;

  @Prop()
  processedFilePath: string;

  @Prop()
  processType: string;

  @Prop()
  timestamp: Date;
}

export const LogSchema = SchemaFactory.createForClass(Log);
