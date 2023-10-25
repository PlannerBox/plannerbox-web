import {
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from './Account.entity';

@Index('Admin_pkey', ['id'], { unique: true })
@Entity('Admin', { schema: 'public' })
export class Admin {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @OneToOne(() => Account, { eager: true, cascade: true, onDelete:"CASCADE" })
  @JoinColumn([{ name: 'accountId', referencedColumnName: 'id' }])
  account: Account;
}
