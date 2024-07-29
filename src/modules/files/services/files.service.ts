import { Injectable } from '@nestjs/common';
import * as cloudinary from 'cloudinary';
import { Readable } from 'stream';
import { File, FileDocument } from '../../files/entities/files.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as MulterFile from 'multer';
import { CloudinaryUploadResponse } from '../../../common/interfaces/cloudinary'; // Importa el tipo definido
import { CreateFileDto } from '../dtos/files.dto';

@Injectable()
export class FilesService {
  private uploadToCloudinary(stream: Readable): Promise<CloudinaryUploadResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream((error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result as CloudinaryUploadResponse); // Afirmación de tipo
        }
      });
      stream.pipe(uploadStream);
    });
  }

  constructor(@InjectModel(File.name) private fileModel: Model<FileDocument>) {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async handleFileUpload(file: MulterFile, createFileDto: CreateFileDto) {
    const bufferStream = new Readable();
    bufferStream.push(file.buffer);
    bufferStream.push(null);

    const result = await this.uploadToCloudinary(bufferStream);

    const createdFile = new this.fileModel({
      filename: file.originalname,
      path: result.secure_url,
      uploadDate: new Date(),
      size: file.size,
      mimetype: file.mimetype,
      description: createFileDto.description,
    });

    await createdFile.save();

    return {
      message: 'File uploaded and saved successfully',
      file: createdFile,
    };
  }
}
