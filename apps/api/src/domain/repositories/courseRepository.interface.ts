import { PaginateQuery, Paginated } from "nestjs-paginate";
import { Course } from "../../infrastructure/entities/Course.entity";
import { CourseM } from "../models/course";
import EventType from "../models/enums/eventType.enum";

export interface ICourseRepository {
    findEvents(query: PaginateQuery): Promise<Paginated<Course>>;
    findCourse(id: string): Promise<CourseM>;
    insertCourse(course: Course): Promise<any>;
    upsertCourse(course: CourseM): Promise<any>;
    countCourseByType(type: EventType): Promise<number>;
    deleteCourse(id: string): Promise<any>;
}