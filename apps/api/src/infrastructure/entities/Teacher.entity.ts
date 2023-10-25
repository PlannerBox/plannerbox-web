import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from './Account.entity';
import { TeacherSkills } from './TeacherSkills.entity';
import { Course } from './Course.entity';

@Index('Teacher_pkey', ['id'], { unique: true })
@Entity('Teacher', { schema: 'public' })
export class Teacher {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column("boolean", { name: 'intern', default: () => 'true' })
  intern: boolean;

  @OneToOne(() => Account, { eager: true, cascade: true, onDelete:"CASCADE"})
  @JoinColumn([{ name: 'accountId', referencedColumnName: 'id' }])
  account: Account;

  @OneToMany(() => TeacherSkills, teacherSkills => teacherSkills.teacher)
  teacherSkills: TeacherSkills[];

  @ManyToMany(() => Course, course => course.skills)
  courses: Course[];
}
