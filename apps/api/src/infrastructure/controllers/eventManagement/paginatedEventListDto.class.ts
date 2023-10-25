import { ApiProperty } from "@nestjs/swagger";
import EventType from "../../../domain/models/enums/eventType.enum";
import { Course } from "../../entities/Course.entity";
import { Group } from "../../entities/Group.entity";
import { Room } from "../../entities/Room.entity";
import { Skill } from "../../entities/Skill.entity";
import { Teacher } from "../../entities/Teacher.entity";
import { UUID } from "crypto";

class EventOutputDto {
    @ApiProperty({ name: 'id', type: String })
    id: UUID;

    @ApiProperty({ name: 'name', type: String })
    name: string;

    @ApiProperty({ name: 'startDate', type: Date })
    startDate: Date;

    @ApiProperty({ name: 'endDate', type: Date })
    endDate: Date;

    @ApiProperty({ name: 'eventType', enum: EventType })
    eventType: EventType;

    @ApiProperty({ name: 'group', type: Group })
    group: Group;

    @ApiProperty({ name: 'skills', type: [Skill] })
    skills: Skill[];

    @ApiProperty({ name: 'teachers', type: [Teacher] })
    teachers: Teacher[];

    @ApiProperty({ name: 'room', type: Room })
    room: Room;

    @ApiProperty({ name: 'parent', type: Course })
    parent: Course;       
}

class MetaData {
    @ApiProperty({ name: 'itemsPerPage', type: Number })
    itemsPerPage: number;

    @ApiProperty({ name: 'totalItems', type: Number })
    totalItems: number;

    @ApiProperty({ name: 'currentPage', type: Number })
    currentPage: number;

    @ApiProperty({ name: 'totalPages', type: Number })
    totalPages: number;

    @ApiProperty({ name: 'sortBy', type: [String] })
    sortBy: string[];
}

class Links {
    @ApiProperty({ name: 'first', type: String })
    first: string;

    @ApiProperty({ name: 'previous', type: String })
    previous: string;

    @ApiProperty({ name: 'current', type: String })
    current: string;

    @ApiProperty({ name: 'next', type: String })
    next: string;

    @ApiProperty({ name: 'last', type: String })
    last: string;
}

export class PaginatedEventListDto {
    @ApiProperty({ name: 'data', type: [EventOutputDto] })
    data: EventOutputDto[];

    @ApiProperty({ name: 'meta', type: MetaData })
    meta: MetaData;

    @ApiProperty({ name: 'links', type: Links })
    links: Links;
}