import { StudentM } from "../models/student";

export interface IStudentRepository {
    findStudentById(studentId: string): Promise<StudentM>;
    findStudentByAccountId(accountId: string): Promise<StudentM>;
    updateStudent(student: StudentM): Promise<StudentM>;
}