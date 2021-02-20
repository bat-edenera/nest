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
export class ContractModule { }
