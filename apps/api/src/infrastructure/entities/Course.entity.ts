import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Tree } from "typeorm";
import { Group } from "./Group.entity";
import { Skill } from "./Skill.entity";
import EventType from "../../domain/models/enums/eventType.enum";
import { Teacher } from "./Teacher.entity";
import { Room } from "./Room.entity";

@Index('Course_pkey', ['id'], { unique: true })
@Tree('adjacency-list')
@Entity('Course', { schema: 'public' })
export class Course {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Column ('character varying', { name: 'name', nullable: false, length: 100 })
    name: string;

    @Column ('timestamp without time zone', { name: 'startDate', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    startDate: Date;

    @Column ('timestamp without time zone', { name: 'endDate', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    endDate: Date;

    @Column('enum', { name: 'type', nullable: false, enum: EventType, default: EventType.Class })
    type: EventType;

    @ManyToOne(() => Course, (course) => course.children, { onDelete: 'SET NULL' })
    parent: Course;

    @OneToMany(() => Course, (course) => course.parent)
    children: Course[];

    @ManyToOne(() => Group, (group) => group, { onDelete: 'CASCADE' })
    @JoinColumn([{ name: 'groupId', referencedColumnName: 'id' }])
    group: Group;

    @ManyToOne(() => Room, (room) => room, { onDelete: 'CASCADE' })
    @JoinColumn([{ name: 'roomId', referencedColumnName: 'id' }])
    room: Room;

    @ManyToMany(() => Teacher, (teacher) => teacher.courses, { onDelete: 'CASCADE' })
    @JoinTable({ name: 'CourseTeachers' })
    teachers: Teacher[];

    @ManyToMany(() => Skill, (skill) => skill.courses, { eager: true })
    @JoinTable({ name: 'CourseSkills' })
    skills: Skill[];
}