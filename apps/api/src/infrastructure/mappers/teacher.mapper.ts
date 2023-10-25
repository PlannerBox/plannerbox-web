import { TeacherM } from "../../domain/models/teacher";
import { Teacher } from "../entities/Teacher.entity";
import { TeacherSkills } from "../entities/TeacherSkills.entity";
import { AccountMapper } from "./account.mapper";
import { SkillMapper } from "./skill.mapper";

export class TeacherMapper {
    static fromModelToEntity(teacherM: TeacherM): Teacher {
        return {
            id: teacherM.teacherId,
            intern: teacherM.intern,
            teacherSkills: teacherM.teacherSkills,
            courses: teacherM.courses,
            account: AccountMapper.fromModelToEntity(teacherM),
        }
    }

    static fromEntityToModel(teacher: Teacher): TeacherM {
        return {
            teacherId: teacher.id,
            intern: teacher.intern,
            teacherSkills: teacher.teacherSkills,
            ...AccountMapper.fromEntityToModel(teacher.account)
        }
    }

    static fromGenericDtoToModel(teacherDto): TeacherM {
        return {
            teacherId: teacherDto.teacherId,
            intern: teacherDto.intern,
            ...AccountMapper.fromGenericDtoToModel(teacherDto)
        }
    }
}