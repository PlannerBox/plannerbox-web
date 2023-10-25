import { CourseM } from "../../domain/models/course";
import { Course } from "../entities/Course.entity";
import { TeacherMapper } from "./teacher.mapper";

export class CourseMapper {
    static fromEntityToModel(course: Course): CourseM {
        return {
            id: course.id,
            name: course.name,
            startDate: course.startDate.toLocaleString(),
            endDate: course.endDate.toLocaleString(),
            type: course.type,
            group: course.group,
            skills: course.skills,
            teachers: course.teachers.map(teacher => TeacherMapper.fromEntityToModel(teacher)),
            room: course.room,
            parent: !course.parent ? null : course.parent,
        };
    }

    static fromModelToEntity(course: CourseM): Course {
        return {
            id: course.id,
            name: course.name,
            startDate: new Date(course.startDate),
            endDate: new Date(course.endDate),
            type: course.type,
            group: course.group,
            skills: course.skills,
            teachers: course.teachers.map(teacher => TeacherMapper.fromModelToEntity(teacher)),
            room: course.room,
            parent: !course.parent ? null : course.parent,
            children: null
        };
    }
}