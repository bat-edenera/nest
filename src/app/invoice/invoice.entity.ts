import { Column, Entity, PrimaryColumn, OneToMany, ManyToOne } from 'typeorm';
import { ContractEntity } from '../contract/contract.entity';
import { CommodityEntity } from './commodity/commodity.entity';

@Entity('invoice')
export class InvoiceEntity {
  //发票代码
  @PrimaryColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  num: string;

  @Column()
  type: string;

  @Column()
  sellerName: string;

  @Column()
  purchaserName: string;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
  created: Date;

  @OneToMany((type) => CommodityEntity, (item) => item.invoice)
  items: CommodityEntity[];

  @ManyToOne((type) => ContractEntity, contract => contract.invoices)
  contract: ContractEntity
}