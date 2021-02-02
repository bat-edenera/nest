import { Controller, Get } from '@nestjs/common';
import { StorageService } from './storage.service';

@Controller('storage')
export class StorageController {
  constructor(
    private readonly storageService: StorageService
  ) { }

  @Get()
  getList() {
    return this.storageService.getList()
  }
}
