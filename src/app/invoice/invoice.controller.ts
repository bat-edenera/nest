import { Body, Controller, Delete, Get, Param, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { Invoice } from './invoice.entity';
import { InvoiceService } from './invoice.service';
import AipOcr from '../../shared/utils/AipOcrClient';

@Controller('invoice')
export class InvoiceController {
  constructor(
    private readonly invoiceService: InvoiceService,
    private ocrClient: AipOcr
  ) {
    this.ocrClient = new AipOcr()
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    let result = [await this.ocrClient.vatInvoice(file.buffer.toString('base64'))];
    return result
  }

  @Post()
  create(@Body() CreateInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    return this.invoiceService.create(CreateInvoiceDto);
  }

  @Get()
  findAll(): Promise<Invoice[]> {
    return this.invoiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Invoice> {
    return this.invoiceService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.invoiceService.remove(id);
  }
}