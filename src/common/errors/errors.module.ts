import { Module } from '@nestjs/common';
import { ErrorService } from './errors.service';

@Module({
  controllers: [],
  providers: [ErrorService],
  exports: [ErrorService],
})
export class ErrorModule {}