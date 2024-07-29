import { Module } from '@nestjs/common';
import { PersistenceModule } from './persistence/persistence.module';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './config/db-config';
import { FilesModule } from './modules/files/files.module';
import { ErrorModule } from './common/errors/errors.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig],
      envFilePath: '.env',
    }),
    PersistenceModule,
    FilesModule,
    ErrorModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
