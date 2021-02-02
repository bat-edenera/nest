import { Column, Entity } from 'typeorm'
// import BaseEntity from '../../shared/utils/baseEntity'

@Entity('storage')
export class StorageEntity {
  @Column()
  name: string;

  @Column()
  enable: boolean;

  @Column()
  remark: string;

  @Column()
  createDate: Date;

  @Column()
  creator: string;
}