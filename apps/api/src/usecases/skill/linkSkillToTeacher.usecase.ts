import { HttpStatus, NotFoundException } from "@nestjs/common";
import { TeacherSkillsDto } from "../../infrastructure/controllers/skillManagement/teacherSkillsDto";
import { TeacherRepository } from "../../infrastructure/repositories/teacher.repository";
import { TeacherSkills } from "../../infrastructure/entities/TeacherSkills.entity";
import { TeacherSkillsRepository } from "../../infrastructure/repositories/teacherSkills.repository";

export class LinkSkillToTeacherUseCase {
    constructor(
        private readonly teacherRepository: TeacherRepository,
        private readonly teacherSkillsRepository: TeacherSkillsRepository
    ) {}

    async addTeacherSkills(teacherSkillsDto: TeacherSkillsDto): Promise<any> {
        let teacherM = await this.teacherRepository.findTeacherById(teacherSkillsDto.teacherId);

        if (!teacherM) {
            throw new NotFoundException("Teacher not found");
        }
        
        if (!teacherM.teacherSkills || teacherM.teacherSkills.length === 0) {
            teacherM.teacherSkills = [];
        }

        // Pour chaque skillId, on ajoute le skill à la liste des skills du teacher
        let teacherSkills: TeacherSkills[] = [];
        teacherSkillsDto.skills.forEach(skillId => {
            const teacherSkill = new TeacherSkills(teacherSkillsDto.teacherId, skillId);
            teacherSkills.push(teacherSkill);
        });
        await this.teacherSkillsRepository.saveTeacherSkills(teacherSkills);

        return {
            statusCode: HttpStatus.OK,
            message: 'Les compétences du professeur ont été mises à jour'
        };
    }
}
