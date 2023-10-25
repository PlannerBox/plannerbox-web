import { ILogger } from "../../domain/logger/logger.interface";
import { IGroupRepository } from "../../domain/repositories/groupRepository.interface";
import { GroupDto } from "../../infrastructure/controllers/groupManagement/groupDto.class";
import { GroupMapper } from "../../infrastructure/mappers/group.mapper";

export class UpdateGroupUseCase {
    constructor(
        private readonly groupRepository: IGroupRepository,
        private readonly logger: ILogger
    ) {}
    
    async updateGroup(group: GroupDto): Promise<any> {
        const updatedGroup = GroupMapper.fromDtoToModel(group);
        
        await this.groupRepository.updateGroup(updatedGroup);

        this.logger.log('UpdateGroupUseCase', `Group ${updatedGroup.name} updated`);
        
        return updatedGroup;
    }
}