import { InjectRepository } from "@nestjs/typeorm";
import { ISkillRepository } from "../../domain/repositories/skillRepository.interface";
import { Skill } from "../entities/Skill.entity";
import { In, Repository } from "typeorm";
import { SkillM } from "../../domain/models/skill";
import { PaginateQuery, Paginated, paginate } from "nestjs-paginate";

export class SkillRepository implements ISkillRepository {
    constructor(
        @InjectRepository(Skill)
        private readonly skillRepository: Repository<Skill>
    ) {}

    async findSkillById(skillId: string): Promise<Skill> {
        return await this.skillRepository.findOne({ where: { id: skillId } });
    }
    
    async findSkillByName(skillName: string): Promise<Skill> {
        return await this.skillRepository.findOne({ where: { name: skillName } });
    }

    async createSkill(skill: SkillM): Promise<SkillM> {
        return await this.skillRepository.save(skill);
    }

    async upsertSkill(skill: SkillM): Promise<SkillM> {
        return await this.skillRepository.save(skill);
    }
    
    async deleteSkill(skillId: string){
        await this.skillRepository.delete(skillId);
    }

    async findSkills(query: PaginateQuery): Promise<Paginated<Skill>> {
        const queryBuilder = this.skillRepository.createQueryBuilder('skill');

        queryBuilder.leftJoinAndSelect('skill.teacherSkills', 'teacherSkills');
        queryBuilder.leftJoinAndSelect('teacherSkills.teacher', 'teacher');
        return await paginate<Skill>(query, queryBuilder, {
            loadEagerRelations: true,
            sortableColumns: ['name'],
            searchableColumns: ['name'],
            defaultSortBy: [['name', 'ASC']],
            relations: { teacherSkills: { teacher: true } }
        });
    }

    async skillsExists(skillIds: string[]): Promise<boolean> {
        const skills = await this.skillRepository.find({ where: { id: In(skillIds) } });
        return skills.length === skillIds.length;
    }

    async findSkillsByIds(skillIds: string[]): Promise<Skill[]> {
        return await this.skillRepository.find({ where: { id: In(skillIds) } });
    }
}