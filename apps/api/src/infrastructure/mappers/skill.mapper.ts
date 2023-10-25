import { SkillM } from "../../domain/models/skill";
import { SkillDto } from "../controllers/skillManagement/skillDto.class";
import { Skill } from "../entities/Skill.entity";

export class SkillMapper {
    static toDomain(skillDto: SkillDto) : SkillM {
        const skill = new SkillM();
        skill.id = skillDto.id;
        skill.name = skillDto.name;


        return skill;
    }

    static toDto(skill: SkillM) : SkillDto {
        const skillDto = new SkillDto();
        skillDto.id = skill.id;
        skillDto.name = skill.name;
        return skillDto;
    }

    static fromEntityToDto(skill: Skill) : SkillDto {
        const skillDto = new SkillDto();
        skillDto.id = skill.id;
        skillDto.name = skill.name;
        skillDto.externTeachersNumber = skill.teacherSkills.filter(ts => !ts.teacher.intern).length;
        skillDto.internTeachersNumber = skill.teacherSkills.filter(ts => ts.teacher.intern).length;
        return skillDto;
    }
}