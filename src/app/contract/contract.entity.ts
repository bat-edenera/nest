import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { InvoiceEntity } from '../invoice/invoice.entity';
import { ContractItemEntity } from './conitems/conitems.entity';
@Entity('contract')
export class ContractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
  created: Date;

  @OneToMany((type) => ContractItemEntity, (item) => item.contract)
  items: ContractItemEntity[];

  @OneToMany((type) => InvoiceEntity, (invoice) => invoice.contract)
  invoices: ContractItemEntity[];
}