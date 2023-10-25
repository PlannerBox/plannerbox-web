import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from './Account.entity';
import { FormationMode } from '../../domain/models/enums/formationMode.enum';

@Index('Student_pkey', ['id'], { unique: true })
@Entity('Student', { schema: 'public' })
export class Student {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ type: 'enum', name: 'formationMode', enum: FormationMode, default: FormationMode.Presentiel})
  formationMode: FormationMode;

  @OneToOne(() => Account, { eager: true, cascade: true, onDelete:"CASCADE" })
  @JoinColumn([{ name: 'accountId', referencedColumnName: 'id' }])
  account: Account;
}
