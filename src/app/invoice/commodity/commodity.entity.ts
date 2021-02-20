import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { InvoiceEntity } from '../invoice.entity';


@Entity()
export class Commodity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => InvoiceEntity, (invoice) => invoice.items)
  invoice: InvoiceEntity;

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