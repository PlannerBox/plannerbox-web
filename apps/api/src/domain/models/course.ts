import { Course } from "../../infrastructure/entities/Course.entity";
import { Group } from "../../infrastructure/entities/Group.entity";
import { Room } from "../../infrastructure/entities/Room.entity";
import { Skill } from "../../infrastructure/entities/Skill.entity";
import EventType from "./enums/eventType.enum";
import { TeacherM } from "./teacher";

export class CourseM {
    id?: string;
    name: string;
    startDate: string;
    endDate: string;
    type: EventType;
    group: Group;
    parent?: Course;
    skills: Skill[];
    teachers: TeacherM[];
    room: Room;
}