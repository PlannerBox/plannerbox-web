import { PaginateQuery, Paginated } from "nestjs-paginate";
import { ICourseRepository } from "../../domain/repositories/courseRepository.interface";
import { CourseMapper } from "../../infrastructure/mappers/course.mapper";
import { Course } from "../../infrastructure/entities/Course.entity";

export class FindEventsUseCase {
    constructor(
        private readonly courseRepository: ICourseRepository,
    ) {}

    async findEvents(query: PaginateQuery): Promise<Paginated<Course>> {
        let eventList = await this.courseRepository.findEvents(query);
        let summaryEvent = [];
        summaryEvent = eventList.data.map(event => {
            return CourseMapper.fromEntityToModel(event);
        });
        eventList.data = summaryEvent;
        return eventList;
    }
}