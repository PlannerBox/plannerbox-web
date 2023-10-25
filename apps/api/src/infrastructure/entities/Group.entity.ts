import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { GroupMembers } from "./GroupMembers.entity";
import { GroupType } from "../../domain/models/enums/groupType.enum";
import { Course } from "./Course.entity";

@Index('Group_pkey', ['id'], { unique: true })
@Entity('Group', { schema: 'public' })
export class Group {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Column('character varying', { name: 'name', nullable: false, length: 100 })
    name: string;

    @Column('character varying', { name: 'color', nullable: false, length: 50 })
    color: string;

    @Column('enum', { name: 'type', nullable: false, enum: GroupType, default: GroupType.Class })
    type: GroupType;

    @OneToMany(() => GroupMembers, (groupMembers) => groupMembers.group, { cascade: true, eager: true })
    groupMembers: GroupMembers[];

    @OneToMany(() => Course, (course) => course.group, { cascade: true })
    courses: Course[];
}