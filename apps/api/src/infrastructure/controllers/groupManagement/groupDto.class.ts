import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';
import { GroupType } from '../../../domain/models/enums/groupType.enum';

export class GroupDto {
  @ApiProperty({ type: String, description: 'Group id' })
  id?: string;

  @ApiProperty({ type: String, description: 'Group name' })
  name: string;

  @ApiProperty({ type: String, description: 'Group color' })
  color: string;

  @ApiProperty({
    enum: GroupType,
    enumName: 'GroupType',
    description: 'Type of the group (default is Class)',
  })
  type?: GroupType;
}

export class NewGroupMemberDto {
  @ApiProperty({ type: String, description: 'Account id' })
  accountId: string;

  @ApiProperty({ type: Boolean, description: 'Is owner' })
  isOwner: boolean;
}

export class NewGroupDto extends GroupDto {
  @ApiProperty({ type: NewGroupMemberDto, description: 'Group members' })
  @IsOptional()
  @IsArray()
  groupMembers?: NewGroupMemberDto[];
}

export class GroupMemberSummary {
  @ApiProperty({ type: String, description: 'Group id' })
  groupId: string;
  @ApiProperty({ type: String, description: 'Group name' })
  groupName: string;
  @ApiProperty({ type: String, description: 'User status in the group' })
  isOwner: boolean;
  @ApiProperty({ type: Number, description: 'Number of members in the group' })
  groupMemberCount: number;
}
