import { Module } from '@nestjs/common';
import { PersistenceModule } from './persistence/persistence.module';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './config/db-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig],
      envFilePath: '.env',
    }),
    PersistenceModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
