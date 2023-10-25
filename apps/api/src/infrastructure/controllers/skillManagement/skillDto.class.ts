import { ApiProperty } from "@nestjs/swagger";

export class SkillDto {
    @ApiProperty({ required: false, name: 'id' })
    id?: string;
    @ApiProperty({ required: true, name: 'name' })
    name: string;
    @ApiProperty({ required: false, name: 'intern teachers count', description: 'Number of teachers who are intern and have this skill' })
    internTeachersNumber?: number;
    @ApiProperty({ required: false, name: 'extern teachers count', description: 'Number of teachers who are extern and have this skill' })
    externTeachersNumber?: number;
}