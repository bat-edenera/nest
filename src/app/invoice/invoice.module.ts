import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceEntity } from './invoice.entity';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';
import { Commodity } from './commodity/commodity.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
const moment = require('moment')
const path = require('path')

@Module({
  imports: [
    TypeOrmModule.forFeature([InvoiceEntity, Commodity]),
    // MulterModule.register({
    //   storage: diskStorage({
    //     destination: path.join(__dirname, `../../fileUpload/invoice/${moment().format('YYYY-MM-DD')}`),
    //     filename: (req, file, cb) => {
    //       return cb(null, new Date().getTime() + '-' + file.originalname);
    //     },
    //   }),
    // })
  ],
  providers: [InvoiceService],
  controllers: [InvoiceController],
})
export class InvoiceModule { }