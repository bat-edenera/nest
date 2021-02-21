import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { InvoiceEntity } from '../invoice/invoice.entity';
import { ContractItem } from './items/items.entity';
@Entity('contract')
export class ContractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
  created: Date;

  @OneToMany((type) => ContractItem, (item) => item.contract, { cascade: ["insert"] })
  items: ContractItem[];

  @OneToMany((type) => InvoiceEntity, (invoice) => invoice.contract)
  invoices: InvoiceEntity[];

}