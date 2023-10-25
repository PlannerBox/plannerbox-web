import { Controller, Post, HttpCode, Body, Inject, BadRequestException, NotImplementedException, Delete, Param, Get } from "@nestjs/common";
import { ApiTags, ApiResponse, ApiOperation, ApiBody } from "@nestjs/swagger";
import { EventDto } from "./eventDto.class";
import { PlanTrainingUseCase } from "../../../usecases/event/planTraining.usecase";
import { UseCaseProxy } from "../../usecases-proxy/usecases-proxy";
import { UsecasesProxyModule } from "../../usecases-proxy/usecases-proxy.module";
import { ScheduleEventDto } from "./scheduleEventDto.class";
import { PlanCourseUseCase } from "../../../usecases/event/planCourse.usecase";
import { DeleteEventUseCase } from "../../../usecases/event/deleteEvent.usecase";
import { UpdateEventUseCase } from "../../../usecases/event/updateEvent.usecase";
import { FindEventsUseCase } from "../../../usecases/event/findEvents.usecase";
import { Paginate, PaginateQuery, Paginated } from "nestjs-paginate";
import { Course } from "../../entities/Course.entity";
import { PaginatedEventListDto } from "./paginatedEventListDto.class";

@Controller('event-management')
@ApiTags('event-management')
@ApiResponse({
    status: 401,
    description: 'No authorization token was found',
})
export class EventManagementController {
    constructor(
        @Inject(UsecasesProxyModule.PLAN_TRAINING_USECASES_PROXY)
        private readonly planTrainingUseCase: UseCaseProxy<PlanTrainingUseCase>,
        @Inject(UsecasesProxyModule.PLAN_COURSE_USECASES_PROXY)
        private readonly planCourseUseCase: UseCaseProxy<PlanCourseUseCase>,
        @Inject(UsecasesProxyModule.DELETE_EVENT_USECASES_PROXY)
        private readonly deleteEventUseCase: UseCaseProxy<DeleteEventUseCase>,
        @Inject(UsecasesProxyModule.UPDATE_EVENT_USECASES_PROXY)
        private readonly updateEventUseCase: UseCaseProxy<UpdateEventUseCase>,
        @Inject(UsecasesProxyModule.FIND_EVENTS_USECASES_PROXY)
        private readonly findEventsUseCase: UseCaseProxy<FindEventsUseCase>,
    ) {}

    @Get('event/list-paginated')
    @HttpCode(200)
    @ApiOperation({ description: 'List all events (paginated with nestjs-paginate)' })
    @ApiResponse({ status: 200, description: 'Events successfully listed', type: PaginatedEventListDto })
    @ApiResponse({ status: 204, description: 'No events found' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async listEvents(@Paginate() query: PaginateQuery): Promise<Paginated<Course>> {
        return await this.findEventsUseCase.getInstance().findEvents(query);
    }

    @Post('event/create')
    @HttpCode(200)
    @ApiOperation({ description: 'Create a new course' })
    @ApiResponse({ status: 200, description: 'Course successfully planned' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'Skill or teacher not found' })
    @ApiBody({ type: ScheduleEventDto })
    async scheduleEvent(@Body() courses: ScheduleEventDto): Promise<any> {
        switch (courses.parent.eventType) {
            case 0:
                return await this.planCourseUseCase.getInstance().planCourse(courses);
            case 1:
            case 2:
                return await this.planTrainingUseCase.getInstance().planTraining(courses);
            default:
                throw new BadRequestException('courseType must be 0, 1 or 2');
        }
    }

    @Post('event/update')
    @HttpCode(200)
    @ApiOperation({ description: 'Update a course' })
    @ApiResponse({ status: 200, description: 'Course successfully updated' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'Course not found' })
    @ApiBody({ type: EventDto })
    async updateEvent(@Body() event: EventDto): Promise<any> {
        return await this.updateEventUseCase.getInstance().updateEvent(event);
    }

    @Delete('event/delete/:id')
    @HttpCode(204)
    @ApiOperation({ description: 'Delete a course' })
    @ApiResponse({ status: 204, description: 'Course successfully deleted' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'Course not found' })
    async deleteEvent(@Param('id') id: string): Promise<any> {
        return await this.deleteEventUseCase.getInstance().deleteEvent(id);
    }
}