import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { InvoiceEntity } from '../invoice/invoice.entity';
import { ContractItem } from './items/items.entity';
@Entity('contract')
export class ContractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
  created: Date;

  @OneToMany((type) => ContractItem, (item) => item.contract)
  items: ContractItem[];

  @OneToMany((type) => InvoiceEntity, (invoice) => invoice.contract)
  invoices: InvoiceEntity[];

}