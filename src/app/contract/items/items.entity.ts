import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ContractEntity } from '../contract.entity';
@Entity()
export class ContractItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => ContractEntity, (contract) => contract.items)
  contract: ContractEntity;

  @Column({ nullable: true })
  amount: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  taxPrice: string;

  @Column({ nullable: true })
  num: string;

  @Column({ nullable: true })
  date: string;

  @Column({ nullable: true })
  code: string;

  @Column({ nullable: true })
  price: string;
}