import { ApiProperty } from "@nestjs/swagger";
import { NestedAccountDto } from "./nestedAccountDto.class";

export class GroupMembersDto {
    @ApiProperty({ type: String, description: 'Account id' })
    accountId: string;
    
    @ApiProperty({ type: String, description: 'Group id' })
    groupId: string;

    @ApiProperty({ type: Boolean, description: 'Is the account owner of the group' })
    isOwner: boolean;

    @ApiProperty({ type: NestedAccountDto, description: 'Account details' })
    account?: NestedAccountDto;
}