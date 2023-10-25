import { InjectRepository } from "@nestjs/typeorm";
import { StudentM } from "../../domain/models/student";
import { IStudentRepository } from "../../domain/repositories/studentRepository.interface";
import { Student } from "../entities/Student.entity";
import { Repository } from "typeorm";
import { StudentMapper } from "../mappers/student.mapper";

export class StudentRepository implements IStudentRepository {
    constructor(
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>
    ) {}

    async findStudentById(studentId: string): Promise<StudentM> {
        const studentEntity: Student = await this.studentRepository.findOne({
            where: {
                id: studentId
            }
        });

        if (!studentEntity) {
            return null;
        }

        return StudentMapper.fromEntityToModel(studentEntity);
    }

    async findStudentByAccountId(accountId: string): Promise<StudentM> {
        const studentEntity: Student = await this.studentRepository.findOne({
            where: {
                account: { id: accountId }
            }
        });

        if (!studentEntity) {
            return null;
        }

        return StudentMapper.fromEntityToModel(studentEntity);
    }

    async updateStudent(student: StudentM): Promise<StudentM> {
        const studentEntity = StudentMapper.fromModeltoEntity(student);

        await this.studentRepository.save(studentEntity);

        return StudentMapper.fromEntityToModel(studentEntity);
    }
}