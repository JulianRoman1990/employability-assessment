import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from "@nestjs/common";
import { LogService } from "../services/log.service";
import { CreateLogDto } from "../dtos/create-log.dto";
import { Log } from "../entities/log.entity";
import { PaginationDto } from "src/common/dtos/pagination.dto";

@Controller("logs")
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Post()
  async create(@Body() createLogDto: CreateLogDto): Promise<Log> {
    return this.logService.create(createLogDto);
  }

  @Get()
  async findAll(
    @Query() paginationDto: PaginationDto
  ): Promise<{ logs: Log[]; total: number }> {
    const { page = 1, limit = 10 } = paginationDto;
    return this.logService.findAll(page, limit);
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Log> {
    return this.logService.findOne(id);
  }
}
