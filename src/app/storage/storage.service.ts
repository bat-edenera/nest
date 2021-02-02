import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StorageEntity } from './storage.entity';

@Injectable()
export class StorageService {
  constructor(
    @InjectRepository(StorageEntity)
    private readonly storageRepository: Repository<StorageEntity>
  ) { }

  getList(): Promise<StorageEntity[]> {
    return this.storageRepository.find()
  }


}
