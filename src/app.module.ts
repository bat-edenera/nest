import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
// import { StorageModule } from './app/storage/storage.module';
import { UsersModule } from './app/users/users.module';
import { StorageModule } from './app/storage/storage.module';
import { InvoiceModule } from './app/invoice/invoice.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, StorageModule, InvoiceModule],
})
export class AppModule {
  constructor(private readonly connection: Connection) { }
}
