import { Column, Entity, PrimaryColumn, OneToMany, ManyToOne } from 'typeorm';
import { ContractEntity } from '../contract/contract.entity';
import { Commodity } from './commodity/commodity.entity';

@Entity('invoice')
export class InvoiceEntity {
  //发票代码
  @PrimaryColumn()
  id: string;

  @Column({ nullable: true })
  date: string;

  @Column({ nullable: true })
  num: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  sellerName: string;

  @Column({ nullable: true })
  purchaserName: string;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
  created: Date;

  @OneToMany((type) => Commodity, (item) => item.invoice, {
    cascade: ["insert"]
  })
  items: Commodity[];

  @ManyToOne((type) => ContractEntity, contract => contract.invoices)
  contract: ContractEntity
}