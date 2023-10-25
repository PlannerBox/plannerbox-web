import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsOptional, IsUUID } from "class-validator";
import { UUID } from "crypto";
import EventType from "../../../domain/models/enums/eventType.enum";
import { Timestamp } from "typeorm";

export class EventDto {
    @ApiProperty({ required: false, name: 'id' })
    id?: UUID;

    @ApiProperty({ required: false, name: 'skillIds', type: [String] })
    @IsOptional()
    @IsUUID('4', { each: true, message: 'skillIds doit être un tableau de UUIDs' })
    skills: UUID[];

    @ApiProperty({ required: false, name: 'teacherIds', type: [String], description: 'Teacher account ids, used to schedule teacher formation or set class teacher(s)' })
    @IsOptional()
    @IsUUID('4', { each: true, message: 'teachers doit être un tableau de UUIDs' })
    teachers: UUID[];

    @ApiProperty({ required: false, name: 'groupIds', description: 'GroupId' })
    @IsOptional()
    @IsUUID('4', { message: 'groups doit être un UUID' })
    groupId: UUID;

    @ApiProperty({ required: true, name: 'roomId' })
    @IsOptional()
    @IsUUID('4', { message: 'roomId doit être un UUID' })
    roomId: UUID;

    @ApiProperty({ required: false, name: 'name', description: 'Name of the session' })
    @IsOptional()
    name: string;

    @ApiProperty({ required: true, name: 'startDate', type: Timestamp})
    @IsDateString({}, { message: 'startDate doit être une date au format 2023-10-20T09:00:00.000+02:00' })
    startDate: Date;

    @ApiProperty({ required: true, name: 'endDate' })
    @IsDateString({}, { message: 'endDate doit être une date au format 2023-10-20T09:00:00.000+02:00' })
    endDate: Date;

    @ApiProperty({ required: true, name: 'eventType' })
    eventType: EventType;
}

