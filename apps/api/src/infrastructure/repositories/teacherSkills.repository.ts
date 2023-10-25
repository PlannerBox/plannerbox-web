import { InjectRepository } from "@nestjs/typeorm";
import { ITeacherSkillsRepository } from "../../domain/repositories/teacherSkillsRepository.interface";
import { TeacherSkills } from "../entities/TeacherSkills.entity";
import { Repository } from "typeorm";

export class TeacherSkillsRepository implements ITeacherSkillsRepository {
    constructor(
        @InjectRepository(TeacherSkills)
        private readonly teacherSkillsRepository: Repository<TeacherSkills>
    ) {}

    async saveTeacherSkills(teacherSkills: TeacherSkills[]): Promise<any> {
        await this.teacherSkillsRepository.delete({ teacherId: teacherSkills[0].teacherId });
        return await this.teacherSkillsRepository.save(teacherSkills);
    }
}