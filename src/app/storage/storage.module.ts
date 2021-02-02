import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageEntity } from './storage.entity';
import { StorageController } from './storage.controller';
import { StorageService } from './storage.service';

@Module({
  imports: [TypeOrmModule.forFeature([StorageEntity])],
  exports: [TypeOrmModule],
  controllers: [StorageController],
  providers: [StorageService]
})
export class StorageModule { }
