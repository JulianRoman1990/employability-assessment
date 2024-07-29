import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as tmp from 'tmp';
import * as xml2js from 'xml2js';
import { CloudinaryService } from 'src/modules/connect-cloud/services/cloud-services.service';
import { LogService } from 'src/modules/log-records/services/log.service';
import { UploadFileDto } from '../dtos/upload-file.dto';
import { ProcessFileDto } from '../dtos/process-file.dto';

@Injectable()
export class FileService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly logService: LogService,
  ) {}

  async uploadFile(uploadFileDto: UploadFileDto, file: Express.Multer.File): Promise<string> {
    return this.cloudinaryService.uploadFile(file);
  }

  async processFile(fileUrl: string, processFileDto: ProcessFileDto): Promise<string> {
    const fileContent = await this.downloadFile(fileUrl);
    const parsedData = await this.parseXml(fileContent);

    if (processFileDto.removeDuplicates) {
      this.removeDuplicates(parsedData);
    }

    if (processFileDto.validateFormat) {
      this.validateFormat(parsedData);
    }

    this.sortData(parsedData, processFileDto.sortColumn, processFileDto.sortOrder);

    const processedXml = this.buildXml(parsedData);
    const processedFilePath = await this.saveTempFile(processedXml);
    const processedFileUrl = await this.cloudinaryService.uploadFile(processedFilePath);

    await this.logService.createLog(fileUrl, processedFileUrl, 'process');

    return processedFileUrl;
  }

  private async downloadFile(fileUrl: string): Promise<string> {
    // Implementar lógica para descargar el archivo desde Cloudinary
    return '';
  }

  private async parseXml(xml: string): Promise<any> {
    return new Promise((resolve, reject) => {
      xml2js.parseString(xml, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  private removeDuplicates(data: any): any {
    // Implementar eliminación de registros duplicados
    return data;
  }

  private validateFormat(data: any): any {
    // Implementar validación de formato
    return data;
  }

  private sortData(data: any, sortColumn: string, sortOrder: 'asc' | 'desc'): any {
    // Implementar ordenación
    return data;
  }

  private buildXml(data: any): string {
    const builder = new xml2js.Builder();
    return builder.buildObject(data);
  }

  private async saveTempFile(content: string): Promise<Express.Multer.File> {
    const tempFile = tmp.fileSync();
    fs.writeFileSync(tempFile.name, content);
    return {
      originalname: 'processed.xml',
      buffer: fs.readFileSync(tempFile.name),
      mimetype: 'application/xml',
    } as Express.Multer.File;
  }
}
