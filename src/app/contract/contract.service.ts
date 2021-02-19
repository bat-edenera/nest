import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContractEntity } from './contract.entity';

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(ContractEntity)
    private readonly ContractRespositry: Repository<ContractEntity>
  ) { }

  findAll(): Promise<ContractEntity[]> {
    return this.ContractRespositry.find({ relations: ['items'] });
  }
}
