import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";
import { UUID } from "crypto";

export class TeacherSkillsDto {
    @ApiProperty({ required: true, name: 'teacherId' })
    @IsUUID('4', { message: 'teacherId doit être un UUID' })
    teacherId: UUID;

    @ApiProperty({ required: true, name: 'skills', type: [String] })
    @IsUUID('4', { each: true, message: 'skills doit être un tableau de UUIDs' })
    skills: string[];
}
