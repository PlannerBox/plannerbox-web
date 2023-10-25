import { Course } from '../../infrastructure/entities/Course.entity';
import { TeacherSkills } from '../../infrastructure/entities/TeacherSkills.entity';
import { AccountWithoutPassword } from './account';

export class TeacherM extends AccountWithoutPassword {
    teacherId: string;
    intern: boolean;
    teacherSkills?: TeacherSkills[];
    courses?: Course[];
}
