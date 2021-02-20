/// <refrence path="../../shared/AipOcrClient/index.d.ts" />;
import { Body, Controller, Delete, Get, Param, Post, UseInterceptors, UploadedFile, HttpStatus, HttpException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InvoiceEntity } from './invoice.entity';
import { InvoiceService } from './invoice.service';
const OcrClient = require('../../shared/AipOcrClient');
const fs = require('fs');

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file, @Body('contract') contractId) {
    try {
      var type = file.mimetype.split('/'), result;
      if (type[0] === 'image') {
        let image = fs.readFileSync(file.path).toString('base64')
        result = await OcrClient.vatInvoice(image);
      } else {
        result = await OcrClient.vatInvoicePdf(file.path);
      }
      if (result.error_code) {
        throw new HttpException(result.error_msg, HttpStatus.BAD_REQUEST);
      }
      return this.invoiceService.saveOcrResult(result, contractId)
    } catch (e) { }
  }

  @Post()
  create(@Body() CreateInvoiceDto): Promise<InvoiceEntity> {
    return this.invoiceService.create(CreateInvoiceDto);
  }

  @Get()
  findAll(): Promise<InvoiceEntity[]> {
    return this.invoiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<InvoiceEntity> {
    return this.invoiceService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.invoiceService.remove(id);
  }
}