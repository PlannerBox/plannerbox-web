import { InjectRepository } from "@nestjs/typeorm";
import { IGroupMemberRepository } from "../../domain/repositories/groupMemberRepository.interface";
import { Repository } from "typeorm";
import { GroupMembers } from "../entities/GroupMembers.entity";

export class GroupMemberRepository implements IGroupMemberRepository{
    constructor(
        @InjectRepository(GroupMembers)
        private readonly groupMembersRepository: Repository<GroupMembers>
    ) {}

    async upsertGroupMember(groupId: string, accountId: string, isOwner: boolean): Promise<any> {
        return await this.groupMembersRepository.save({
            groupId: groupId,
            accountId: accountId,
            isOwner: isOwner
        });
    }

    async removeGroupMember(groupId: string, accountId: string): Promise<any> {
        return await this.groupMembersRepository.delete({ groupId: groupId, accountId: accountId });
    }

    async findGroupMember(groupId: string, accountId: string): Promise<any> {
        return await this.groupMembersRepository.findOne({ where: { groupId: groupId, accountId: accountId } });
    }

    async findGroupMemberOwner(groupId: string): Promise<any> {
        return await this.groupMembersRepository.findOne({ where: { groupId: groupId, isOwner: true } });
    }
}