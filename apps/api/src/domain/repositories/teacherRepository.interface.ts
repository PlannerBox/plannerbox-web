import { Teacher } from "../../infrastructure/entities/Teacher.entity";
import { TeacherM } from "../models/teacher";

export interface ITeacherRepository {
    findTeacherById(teacherId: string): Promise<TeacherM>;
    findTeacherByIds(teacherIds: string[]): Promise<Teacher[]>;
    findTeacherByAccountId(accountId: string): Promise<TeacherM>;
    updateTeacher(teacher: TeacherM): Promise<TeacherM>;
}