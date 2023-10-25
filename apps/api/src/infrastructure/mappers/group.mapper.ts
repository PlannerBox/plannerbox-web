import { GroupM, GroupSummary, NestedGroupM } from '../../domain/models/group';
import { GroupDetailDto } from '../controllers/groupManagement/groupDetailDto.class';
import {
  GroupDto,
  NewGroupDto,
} from '../controllers/groupManagement/groupDto.class';
import { Group } from '../entities/Group.entity';
import { GroupMemberMapper } from './groupMember.mapper';

export class GroupMapper {
  static fromModelToSummary(group: Group): GroupSummary {
    const referee = group.groupMembers.find((gm) => gm.isOwner);
    return {
      id: group.id,
      name: group.name,
      referee: referee
        ? `${referee.account.firstname} ${referee.account.lastname}`
        : '',
      memberCount: group.groupMembers.length,
    };
  }

  static fromEntityToModel(group: Group): GroupM {
    return {
      id: group.id,
      name: group.name,
      color: group.color,
      type: group.type,
      groupMembers: group.groupMembers.map((gm) =>
        GroupMemberMapper.fromEntityToModel(gm),
      ),
    };
  }

  static fromEntityToNestedModel(group: Group): NestedGroupM {
    return {
      id: group.id,
      name: group.name,
      color: group.color,
    };
  }

  static fromModelToDetailDto(groupM: GroupM): GroupDetailDto {
    return {
      id: groupM.id,
      name: groupM.name,
      color: groupM.color,
      groupMembers: groupM.groupMembers.map((gm) =>
        GroupMemberMapper.fromModelToDto(gm),
      ),
    };
  }

  static fromNewDtoToModel(groupDto: NewGroupDto): GroupM {
    return {
      name: groupDto.name,
      color: groupDto.color,
      type: groupDto.type,
      groupMembers: groupDto.groupMembers
        ? groupDto.groupMembers.map((gm) => {
            return {
              groupId: '',
              accountId: gm.accountId,
              isOwner: gm.isOwner,
            };
          })
        : [],
    };
  }

  static fromDtoToModel(groupDto: GroupDto): GroupM {
    return {
      id: groupDto.id,
      name: groupDto.name,
      color: groupDto.color,
      type: groupDto.type,
    };
  }
}
