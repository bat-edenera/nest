import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ContractModule } from './app/contract/contract.module';
import { InvoiceModule } from './app/invoice/invoice.module';

@Module({
  imports: [TypeOrmModule.forRoot(), InvoiceModule, ContractModule],
})
export class AppModule {
  constructor(private readonly connection: Connection) { }
}
