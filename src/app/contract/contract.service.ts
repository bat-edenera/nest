import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContractEntity } from './contract.entity';
import { ContractItem } from './items/items.entity';

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(ContractEntity)
    private readonly ContractRespositry: Repository<ContractEntity>
  ) { }

  findAll(): Promise<ContractEntity[]> {
    return this.ContractRespositry.find();
  }
  create(contract): Promise<ContractEntity> {
    return this.ContractRespositry.save(contract);
  }
  saveFromXlsx(xlsData, name) {
    // try {
    // } catch (e) { 
    //   throw new HttpException(result.error_msg, HttpStatus.BAD_REQUEST);
    // }
    let contract = new ContractEntity();
    contract.items = [];
    xlsData.forEach(el => {
      let item = new ContractItem();
      item.code = el['存货编号'];
      item.name = el['商品品名'];
      item.type = el['规格型号'];
      item.num = el['数量（PCS)'];
      item.taxPrice = el['含税单价'];
      item.price = el['原单价'];
      item.amount = el['价税合计'];
      item.date = el['交货日期'];
      contract.items.push(item)
    })
    contract.name = name;
    return this.ContractRespositry.save(contract)
  }
}
