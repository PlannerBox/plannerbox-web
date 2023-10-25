import { ApiProperty } from "@nestjs/swagger";
import { IsDateString } from "class-validator";

export class ChildEventDto {
    @ApiProperty({ required: true, name: 'startDate' })
    @IsDateString({}, { message: 'startDate doit être une date au format 2023-10-20T09:00:00.000+02:00' })
    startDate: Date;

    @ApiProperty({ required: true, name: 'endDate' })
    @IsDateString({}, { message: 'endDate doit être une date au format 2023-10-20T09:00:00.000+02:00' })
    endDate: Date;
}