import { HttpStatus, NotFoundException } from "@nestjs/common";
import { IAccountRepository } from "../../domain/repositories/accountRepository.interface";
import { ICourseRepository } from "../../domain/repositories/courseRepository.interface";
import { IGroupRepository } from "../../domain/repositories/groupRepository.interface";
import { ISkillRepository } from "../../domain/repositories/skillRepository.interface";
import { ScheduleEventDto } from "../../infrastructure/controllers/eventManagement/scheduleEventDto.class";
import { ITeacherRepository } from "../../domain/repositories/teacherRepository.interface";
import { Course } from "../../infrastructure/entities/Course.entity";
import { IRoomRepository } from "../../domain/repositories/roomRepository.interface";
import { Room } from "../../infrastructure/entities/Room.entity";

export class PlanCourseUseCase {
    constructor(
        private readonly skillRepository: ISkillRepository,
        private readonly accountRepository: IAccountRepository,
        private readonly groupRepository: IGroupRepository,
        private readonly courseRepository: ICourseRepository,
        private readonly teacherRepository: ITeacherRepository,
        private readonly roomRepository: IRoomRepository,
    ) {}

    async planCourse(events: ScheduleEventDto): Promise<any> {

        // Check if skills and accounts exists
        const skillsExists = await this.skillRepository.skillsExists(events.parent.skills);
        if (!skillsExists) {
            throw new NotFoundException('Liste des compétences invalide');
        }
        const teacherAccountsExists = await this.accountRepository.accountExists(events.parent.teachers);
        if (!teacherAccountsExists) {
            throw new NotFoundException('Liste des enseignants invalide');
        }
        const groupExists = await this.groupRepository.findGroup(events.parent.groupId);
        if (!groupExists) {
            throw new NotFoundException('Groupe inconnu');
        }
        const roomExists = await this.roomRepository.getRoom(events.parent.roomId);
        if (!roomExists) {
            throw new NotFoundException('Salle inconnue');
        }

        // Get skills corresponding to the formation
        const skills = await this.skillRepository.findSkillsByIds(events.parent.skills);

        // Get teachers
        const teachers = await this.teacherRepository.findTeacherByIds(events.parent.teachers);

        const course = new Course();
        course.name = events.parent.name;
        course.startDate = events.parent.startDate;
        course.endDate = events.parent.endDate;
        course.group = groupExists;
        course.type = events.parent.eventType;
        course.skills = skills;
        course.teachers = teachers;
        course.room = roomExists as Room;

        // Create training session (parent)
        let parent = await this.courseRepository.insertCourse(course);

        if (!events.children || events.children.length === 0) {
            return {
                statusCode: HttpStatus.OK,
                message: 'Cours planifié avec succès'
            };
        }

        // Create children
        events.children.forEach(async (child) => {
            const childCourse = new Course();
            childCourse.name = events.parent.name;
            childCourse.startDate = child.startDate;
            childCourse.endDate = child.endDate;
            childCourse.group = groupExists;
            childCourse.type = events.parent.eventType;
            childCourse.skills = skills;
            childCourse.teachers = teachers;
            childCourse.room = roomExists as Room;
            childCourse.parent = parent;
            await this.courseRepository.insertCourse(childCourse);
        });

        return {
            statusCode: HttpStatus.OK,
            message: 'Cours planifiés avec succès'
        };
    }
}