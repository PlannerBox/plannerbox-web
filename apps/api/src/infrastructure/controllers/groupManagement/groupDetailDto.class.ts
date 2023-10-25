import { ApiProperty } from "@nestjs/swagger";
import { GroupMembersDto } from "./groupMembersDto.class";

export class GroupDetailDto {
    @ApiProperty({ type: String, description: 'Group id' })
    id?: string;
    
    @ApiProperty({ type: String, description: 'Group name', maxLength: 100 })
    name: string;

    @ApiProperty({ type: String, description: 'Group color', maxLength: 50 })
    color: string;

    @ApiProperty({ type: GroupMembersDto, description: 'Group members', isArray: true })
    groupMembers: GroupMembersDto[];
}