import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { Invoice } from './invoice.entity';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private readonly InvoiceRepository: Repository<Invoice>,
  ) { }

  create(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    var invoice = new Invoice();
    invoice = { ...createInvoiceDto, id: undefined };
    return this.InvoiceRepository.save(invoice);
  }

  async findAll(): Promise<Invoice[]> {
    return this.InvoiceRepository.find();
  }

  findOne(id: string): Promise<Invoice> {
    return this.InvoiceRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.InvoiceRepository.delete(id);
  }
}