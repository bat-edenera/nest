import { Controller, Get, Post, UseInterceptors, UploadedFile, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ContractEntity } from './contract.entity';
import { ContractService } from './contract.service';
import XlSX from 'xlsx';

@Controller('contract')
export class ContractController {
  constructor(
    private readonly contractService: ContractService
  ) { }
  @Get()
  findAll(): Promise<ContractEntity[]> {
    return this.contractService.findAll();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    let wb = XlSX.read(file.buffer);
    console.log('test', wb)
    let contract = new ContractEntity();
    contract.name = file.originalname;
    let result: any;
    try {
      if (result.error_code) {
        throw new HttpException(result.error_msg, HttpStatus.BAD_REQUEST);
      }
    } catch (e) { }
  }
}
