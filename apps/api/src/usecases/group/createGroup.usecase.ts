import { ILogger } from "../../domain/logger/logger.interface";
import { IGroupRepository } from "../../domain/repositories/groupRepository.interface";
import { NewGroupDto } from "../../infrastructure/controllers/groupManagement/groupDto.class";
import { GroupMapper } from "../../infrastructure/mappers/group.mapper";

export class CreateGroupUseCase {
    constructor(
        private readonly groupRepository: IGroupRepository,
        private readonly logger: ILogger
    ) {}

    async createGroup(group: NewGroupDto): Promise<any> {
        const newGroup = GroupMapper.fromNewDtoToModel(group);
        
        await this.groupRepository.createGroup(newGroup);

        this.logger.log('CreateGroupUseCase', `Group ${newGroup.name} created`);
        
        return newGroup;
    }
}