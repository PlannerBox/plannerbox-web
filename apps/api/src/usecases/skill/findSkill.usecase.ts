import { HttpStatus } from "@nestjs/common";
import { PaginateQuery } from "nestjs-paginate";
import { ILogger } from "../../domain/logger/logger.interface";
import { ISkillRepository } from "../../domain/repositories/skillRepository.interface";
import { SkillMapper } from "../../infrastructure/mappers/skill.mapper";

export class FindSkillUseCase {
    constructor(
        private readonly skillRepository: ISkillRepository,
        private readonly logger: ILogger
    ) {}

    async getAllSkills(query: PaginateQuery): Promise<any> {
        const skills = await this.skillRepository.findSkills(query);

        if (!skills) {
            throw HttpStatus.NO_CONTENT;
        }
        
        // Map to DTO
        let skillsDto = [];
        skillsDto = skills.data.map(skill => { return SkillMapper.fromEntityToDto(skill)});

        skills.data = skillsDto;

        return skills;
    }
}