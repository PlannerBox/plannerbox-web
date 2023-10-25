import { NotFoundException } from "@nestjs/common";
import { ILogger } from "../../domain/logger/logger.interface";
import { ISkillRepository } from "../../domain/repositories/skillRepository.interface";

export class DeleteSkillUseCase {
    constructor(
        private readonly skillRepository: ISkillRepository,
        private readonly logger: ILogger
    ) {}

    async deleteSkill(skillId: string): Promise<any> {
        await this.skillRepository.findSkillById(skillId);

        if (!skillId) {
            throw new NotFoundException('Skill not found');
        }

        this.skillRepository.deleteSkill(skillId);

        this.logger.log('CreateSkillUseCase', `Skill ${skillId} deleted`);
        
        return true;
    }
}