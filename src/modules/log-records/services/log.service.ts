import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log } from '../entities/log.entity';

@Injectable()
export class LogService {
  constructor(@InjectModel(Log.name) private logModel: Model<Log>) {}

  async createLog(originalFilePath: string, processedFilePath: string, processType: string): Promise<Log> {
    const log = new this.logModel({
      originalFilePath,
      processedFilePath,
      processType,
      timestamp: new Date(),
    });
    return log.save();
  }
}
