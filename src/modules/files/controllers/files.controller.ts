import { Controller, Post, UploadedFile, UseInterceptors, Body, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from '../services/files.service';
import { UploadFileDto } from '../dtos/upload-file.dto';
import { ProcessFileDto } from '../dtos/process-file.dto';


@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() uploadFileDto: UploadFileDto) {
    // Llama al servicio para cargar el archivo
    const fileUrl = await this.fileService.uploadFile(file);
    return { fileUrl };
  }

  @Post('process')
  async processFile(@Body() processFileDto: ProcessFileDto) {
    // Obtén la URL del archivo subido desde el cuerpo de la solicitud
    const fileUrl = processFileDto.fileUrl; // Asegúrate de que `fileUrl` esté en el DTO
    // Procesa el archivo usando la URL
    const processedFileUrl = await this.fileService.processFile(fileUrl, processFileDto);

    // Configura las cabeceras y envía la respuesta
    return {
      processedFileUrl,
      count: processedFileUrl.length, // Ajusta si es necesario
    };
  }
}
