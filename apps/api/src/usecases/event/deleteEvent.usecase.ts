import { HttpStatus, NotFoundException } from "@nestjs/common";
import { ICourseRepository } from "../../domain/repositories/courseRepository.interface";

export class DeleteEventUseCase {
    constructor(
        private readonly courseRepository: ICourseRepository,
    ) {}

    async deleteEvent(id: string): Promise<any> {
        const course = await this.courseRepository.findCourse(id);
        if (!course) {
            throw new NotFoundException('Cours inconnu');
        }

        await this.courseRepository.deleteCourse(id);

        return {
            statusCode: HttpStatus.NO_CONTENT,
            message: 'Cours supprimé avec succès'
        };
    }
}