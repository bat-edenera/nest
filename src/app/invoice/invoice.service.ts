import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContractEntity } from '../contract/contract.entity';
import { Commodity } from './commodity/commodity.entity';
import { InvoiceEntity } from './invoice.entity';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(InvoiceEntity)
    private InvoiceRepository: Repository<InvoiceEntity>,
    @InjectRepository(ContractEntity)
    private ContractRepository: Repository<ContractEntity>,
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
  async saveOcrResult({ words_result: result }, contractId) {
    let exit = await this.InvoiceRepository.findOne(result.InvoiceCode);
    if (exit) {
      throw new HttpException('请不要上传重复发票', HttpStatus.CREATED);
    }

    let invoice = new InvoiceEntity();
    invoice.contract = await this.ContractRepository.findOne(contractId);
    invoice.id = result.InvoiceCode;
    invoice.date = result.InvoiceDate;
    invoice.num = result.InvoiceNum;
    invoice.type = result.InvoiceType;
    invoice.sellerName = result.SellerName;
    invoice.purchaserName = result.PurchaserName;
    invoice.items = [];
    console.log('test', invoice)
    //
    if (result.CommodityName.length && result.CommodityName.length > 0) {
      for (let i = 0; i < result.CommodityName.length; i++) {
        let commodity = new Commodity();
        commodity.amount = result.CommodityAmount[i].word;
        commodity.name = result.CommodityName[i].word;
        commodity.num = result.CommodityNum[i].word;
        commodity.type = result.CommodityType[i].word;
        commodity.tax = result.CommodityTax[i].word;
        commodity.taxRate = result.CommodityTaxRate[i].word;
        commodity.unit = result.CommodityUnit[i].word;
        commodity.price = result.CommodityPrice[i].word;
        invoice.items.push(commodity)
      }
    }
    return this.InvoiceRepository.save(invoice);
    // return result;
  }
  /**
   * 对账
   */
  async check(id) {
    let contract = await this.ContractRepository.findOne(id, { relations: ['items'] });
    let invoice = await this.InvoiceRepository.find({ relations: ['items'], where: { contract } });
    return { invoice, contract }
  }
}