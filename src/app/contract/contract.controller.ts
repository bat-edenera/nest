import { Controller, Get } from '@nestjs/common';
import { ContractEntity } from './contract.entity';
import { ContractService } from './contract.service';

@Controller('contract')
export class ContractController {
  constructor(
    private readonly contractService: ContractService
  ) { }
  @Get()
  findAll(): Promise<ContractEntity[]> {
    return this.contractService.findAll();
  }
}
