import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FileDocument = File & Document;

@Schema()
export class File {
  @Prop({ required: true })
  filename: string;

  @Prop({ required: true })
  path: string; // URL de Cloudinary

  @Prop({ required: true })
  uploadDate: Date;

  @Prop({ required: true })
  size: number;

  @Prop({ required: true })
  mimetype: string;

  @Prop()
  description?: string; // Campo opcional para descripción u otros metadatos
}

export const FileSchema = SchemaFactory.createForClass(File);