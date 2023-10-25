import { PaginateQuery, Paginated } from "nestjs-paginate";
import { SkillM } from "../models/skill";
import { Skill } from "../../infrastructure/entities/Skill.entity";

export interface ISkillRepository {
    findSkillById(skillId: string): Promise<Skill>;
    findSkillByName(skillName: string): Promise<Skill>;
    createSkill(skill: SkillM): Promise<SkillM>;
    upsertSkill(skill: SkillM): Promise<SkillM>;
    deleteSkill(skillId: string): void;
    findSkills(query: PaginateQuery): Promise<Paginated<Skill>>;
    skillsExists(skillIds: string[]): Promise<boolean>;
    findSkillsByIds(skillIds: string[]): Promise<Skill[]>;
}