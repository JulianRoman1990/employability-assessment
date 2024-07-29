import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Log } from "../entities/log.entity";
import { CreateLogDto } from "../dtos/create-log.dto";
import { isUUID } from "class-validator";

@Injectable()
export class LogService {
  constructor(@InjectModel(Log.name) private logModel: Model<Log>) {}

  async create(createLogDto: CreateLogDto): Promise<Log> {
    const createdLog = new this.logModel(createLogDto);
    return createdLog.save();
  }

  async findAll(
    page: number,
    limit: number
  ): Promise<{ logs: Log[]; total: number }> {
    const [logs, total] = await Promise.all([
      this.logModel
        .find()
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.logModel.countDocuments().exec(),
    ]);
    return { logs, total };
  }

  async findOne(id: string): Promise<Log> {
    if (!isUUID(id)) {
      throw new NotFoundException(`Invalid UUID: ${id}`);
    }

    const log = await this.logModel.findOne({ userId: id });
    if (!log) {
      throw new NotFoundException(`Log with user ID ${id} not found`);
    }
    return log;
  }
}
