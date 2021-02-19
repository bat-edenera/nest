import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ContractEntity } from '../contract.entity';
@Entity('conItem')
export class ContractItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => ContractEntity, (contract) => contract.items)
  contract: ContractEntity;

  @Column()
  amount: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  tax: string;

  @Column()
  num: string;

  @Column()
  taxRate: string;

  @Column()
  unit: string;

  @Column()
  price: string;
}