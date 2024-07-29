import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogController } from './controllers/log.controller';
import { LogService } from './services/log.service';
import { Log, LogSchema } from './entities/log.entity';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }]),
      ],
      controllers: [LogController],
      providers: [LogService],
})
export class LogModule {}
