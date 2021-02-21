import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { InvoiceEntity } from '../invoice.entity';


@Entity()
export class Commodity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => InvoiceEntity, (invoice) => invoice.items)
  invoice: InvoiceEntity;

  @Column({ nullable: true })
  amount: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  tax: string;

  @Column({ nullable: true })
  num: string;

  @Column({ nullable: true })
  taxRate: string;

  @Column({ nullable: true })
  unit: string;

  @Column({ nullable: true })
  price: string;
}