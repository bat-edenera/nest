import { Module } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractEntity } from './contract.entity';
import { ContractItem } from './items/items.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContractEntity, ContractItem])],
  providers: [ContractService],
  controllers: [ContractController]
})
export class ContractModule {
  //TODO :
  constructor(private contractService: ContractService) {
    this.contractService.findAll().then(value => {
      if (value.length == 0) {
        let contract = { name: '预置合同', items: [{ amount: '10', name: 'test', num: '10', type: 'hx-l', price: '2' }] }
        this.contractService.create(contract)
      }
    })
  }
}
