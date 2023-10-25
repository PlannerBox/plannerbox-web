import { GroupMembersM } from '../../domain/models/groupMembers';
import { GroupMemberSummary } from '../controllers/groupManagement/groupDto.class';
import { GroupMembersDto } from '../controllers/groupManagement/groupMembersDto.class';
import { GroupMembers } from '../entities/GroupMembers.entity';
import { AccountMapper } from './account.mapper';

export class GroupMemberMapper {
  static fromEntityToModel(groupMember: GroupMembers): GroupMembersM {
    return {
      accountId: groupMember.accountId,
      groupId: groupMember.groupId,
      isOwner: groupMember.isOwner,
      account: groupMember.account
        ? AccountMapper.fromEntityToNestedModel(groupMember.account)
        : undefined,
    };
  }

  static fromModelToDto(groupMemberM: GroupMembersM): GroupMembersDto {
    return {
      accountId: groupMemberM.accountId,
      groupId: groupMemberM.groupId,
      isOwner: groupMemberM.isOwner,
      account: groupMemberM.account
        ? AccountMapper.fromNestedModelToNestedDto(groupMemberM.account)
        : undefined,
    };
  }

  static fromEntityToSummary(groupMember: GroupMembers): GroupMemberSummary {
    return {
      groupId: groupMember.groupId,
      groupName: groupMember.group.name,
      isOwner: groupMember.isOwner,
      groupMemberCount: groupMember.group.groupMembers.length,
    };
  }
}
