import { Module } from '@nestjs/common';
import { CloudinaryService } from './services/cloud-services.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [CloudinaryService],
  exports: [CloudinaryService],
})
export class ConnectCloudModule {}
