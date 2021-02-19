import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import BaseEntity from '../../shared/utils/base.entity'

@Entity('storage')
export class StorageEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  enable: boolean;

  @Column()
  remark: string;

  @Column()
  createTime: Date;

  @Column()
  creator: string;
}