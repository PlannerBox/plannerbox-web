import { InjectRepository } from "@nestjs/typeorm";
import { GroupRepository } from "../../infrastructure/repositories/group.repository";
import { IGroupRepository } from "../../domain/repositories/groupRepository.interface";

export class DeleteGroupUseCase {
    constructor(
        @InjectRepository(GroupRepository)
        private readonly groupRepository: IGroupRepository
    ) {}

    async deleteGroup(groupId: string): Promise<any> {
        return await this.groupRepository.deleteGroup(groupId);
    }
}