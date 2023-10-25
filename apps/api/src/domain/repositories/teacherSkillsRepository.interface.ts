import { TeacherSkills } from "../../infrastructure/entities/TeacherSkills.entity";

export interface ITeacherSkillsRepository {
    saveTeacherSkills(teacherSkills: TeacherSkills[]): Promise<TeacherSkills[]>;
}