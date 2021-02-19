import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvoiceEntity } from './invoice.entity';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(InvoiceEntity)
    private readonly InvoiceRepository: Repository<InvoiceEntity>,
  ) { }

  create(invoice): Promise<InvoiceEntity> {
    return this.InvoiceRepository.save(invoice);
  }

  async findAll(): Promise<InvoiceEntity[]> {
    return this.InvoiceRepository.find();
  }

  findOne(id: string): Promise<InvoiceEntity> {
    return this.InvoiceRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.InvoiceRepository.delete(id);
  }
}