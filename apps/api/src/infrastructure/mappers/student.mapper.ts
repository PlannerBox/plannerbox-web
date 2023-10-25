import { StudentM } from "../../domain/models/student";
import { StudentAccountDetailedDto } from "../controllers/userManagement/studentAccountDto.class";
import { GenericUserAccountDto } from "../controllers/userManagement/userAccountDto.class";
import { Student } from "../entities/Student.entity";
import { AccountMapper } from "./account.mapper";

export class StudentMapper {
    static fromModeltoEntity(studentM: StudentM): Student {
        return {
            id: studentM.studentId,
            formationMode: studentM.formationMode,
            account: AccountMapper.fromModelToEntity(studentM)
        }
    }

    static fromEntityToModel(student: Student): StudentM {
        return {
            studentId: student.id,
            formationMode: student.formationMode,
            ...AccountMapper.fromEntityToModel(student.account)
        }
    }

    static fromDtoToModel(studentDto: StudentAccountDetailedDto): StudentM {
        return {
            studentId: studentDto.studentId,
            formationMode: studentDto.formationMode,
            ...AccountMapper.fromUpdateDtoToModel(studentDto)
        }
    }

    static fromGenericDtoToModel(studentDto: GenericUserAccountDto): StudentM {
        return {
            studentId: studentDto.studentId,
            formationMode: studentDto.formationMode,
            ...AccountMapper.fromGenericDtoToModel(studentDto)
        }
    }
}