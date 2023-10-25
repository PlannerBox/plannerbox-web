import { AccountM } from './account';
import { FormationMode } from './enums/formationMode.enum';

export class StudentM extends AccountM {
    studentId: string;
    formationMode: FormationMode;
}
