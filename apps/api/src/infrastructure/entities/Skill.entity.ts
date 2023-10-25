import { Column, Entity, Index, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TeacherSkills } from "./TeacherSkills.entity";
import { Course } from "./Course.entity";

@Index('Skill_pkey', ['id'], { unique: true })
@Entity('Skill', { schema: 'public' })
export class Skill {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Column({ type: 'varchar', name: 'name', length: 100 })
    name: string;

    @OneToMany(() => TeacherSkills, teacherSkills => teacherSkills.skill)
    teacherSkills: TeacherSkills[];

    @ManyToMany(() => Course, course => course.skills)
    courses: Course[];
}