import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

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