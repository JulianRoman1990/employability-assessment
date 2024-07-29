import { Controller, Post, UploadedFile, UseInterceptors, Body, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from '../services/files.service';
import { UploadFileDto } from '../dtos/upload-file.dto';
import { ProcessFileDto } from '../dtos/process-file.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiConsumes } from '@nestjs/swagger';

@ApiTags('Files 📁')
@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @ApiOperation({ summary: 'Upload a file 📤' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File to upload',
    type: UploadFileDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The file has been successfully uploaded. 🎉',
    schema: {
      type: 'object',
      properties: {
        fileUrl: {
          type: 'string',
          example: 'http://example.com/file/12345',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid file upload request. 🚫',
    type: String,
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() uploadFileDto: UploadFileDto) {
    // Llama al servicio para cargar el archivo
    const fileUrl = await this.fileService.uploadFile(file);
    return { fileUrl };
  }

  @Post('process')
  @ApiOperation({ summary: 'Process an uploaded file 🔄' })
  @ApiBody({
    description: 'Details for processing the file',
    type: ProcessFileDto,
  })
  @ApiResponse({
    status: 200,
    description: 'The file has been successfully processed. ✔️',
    schema: {
      type: 'object',
      properties: {
        processedFileUrl: {
          type: 'string',
          example: 'http://example.com/file/processed/12345',
        },
        count: {
          type: 'number',
          example: 100,
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid processing request. 🚫',
    type: String,
  })
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
