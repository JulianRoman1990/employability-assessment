import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { fileStatus } from 'src/common/enums/fileStatus.enum';

@Schema({ timestamps: true })
export class File extends Document {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  content: Buffer;

  @Prop({ default: fileStatus.PENDING, enum: fileStatus })
  status: fileStatus;
}

export const FileSchema = SchemaFactory.createForClass(File);