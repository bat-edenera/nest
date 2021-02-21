import { Controller, Get, Post, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ContractEntity } from './contract.entity';
import { ContractService } from './contract.service';
import { Response } from 'express';
import XLSX from 'xlsx';
import path from 'path'
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
    let workbook = XLSX.read(file.buffer);
    let xlsData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
    let name = file.originalname.replace(path.extname(file.originalname), '')
    return this.contractService.saveFromXlsx(xlsData, name)

  }

  @Get('template')
  getHello(@Res() res: Response) {
    res.sendFile(path.join(process.cwd(), './public/template', 'contract.xlsx'));
  }
}
