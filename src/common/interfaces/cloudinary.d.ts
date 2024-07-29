declare module 'cloudinary' {
  import { Readable } from 'stream';

  export interface CloudinaryUploadResponse {
    secure_url: string;
    url: string;
    public_id: string;
    format: string;
    original_filename: string;
    // Añade otros campos si es necesario
  }

  export namespace v2 {
    export function uploader.upload_stream(
      callback: (error: any, result: CloudinaryUploadResponse) => void
    ): Readable;
  }
}