import { Group } from "../../infrastructure/entities/Group.entity";
import { GroupMembers } from "../../infrastructure/entities/GroupMembers.entity";
import { RolePermissions } from "../../infrastructure/entities/RolePermissions.entity";
import { TeacherSkills } from "../../infrastructure/entities/TeacherSkills.entity";
import { FormationMode } from "./enums/formationMode.enum";
import Role from "./enums/role.enum";


export class AccountWithoutPassword {
  id?: string;
  username: string;
  firstname: string;
  lastname: string;
  birthDate: Date;
  birthPlace: string;
  lastLogin?: Date;
  hashRefreshToken?: string;
  active: boolean;
  role: Role;
  rolePermissions?: RolePermissions;
  groups?: GroupMembers[];
}

export class AccountM extends AccountWithoutPassword {
  password?: string;
  formationMode?: FormationMode;
}

export class NestedAccountM {
  id?: string;
  username: string;
  firstname: string;
  lastname: string;
}

export class UserAccountDetailsM extends AccountM {
  studentId?: string;
  formationMode?: FormationMode;
  teacherId?: string;
  intern?: boolean;
  teacherSkills?: TeacherSkills[];
  adminId?: string;
}