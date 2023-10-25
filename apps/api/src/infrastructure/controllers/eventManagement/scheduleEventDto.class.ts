import { ApiProperty } from "@nestjs/swagger";
import { ChildEventDto } from "./childEventDto.class";
import { EventDto } from "./eventDto.class";

export class ScheduleEventDto {
    @ApiProperty({ required: true, name: 'parent', type: EventDto })
    parent: EventDto;

    @ApiProperty({ required: false, name: 'children', type: [ChildEventDto] })
    children: ChildEventDto[];
}