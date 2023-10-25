import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID, Matches, MaxLength } from "class-validator";
import Role from "../../../domain/models/enums/role.enum";
import FormationMode from "../../../domain/models/enums/formationMode.enum";
import { GroupMemberSummary } from "../groupManagement/groupDto.class";
import { TeacherSkillsM } from "../../../domain/models/teacherSkills";

export class UserAccountWithoutPasswordDto {
  @ApiProperty({ required: false })
  @IsUUID(4, { message: 'Id is not a valid UUID' })
  readonly id?: string;

  @IsNotEmpty({ message: 'User name cannot be empty' })
  @IsEmail()
  @IsString()
  readonly username: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'First name cannot be empty' })
  @MaxLength(50, { message: 'First name too long' })
  @IsString()
  readonly firstname: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Last name cannot be empty' })
  @MaxLength(50, { message: 'Last name too long' })
  @IsString()
  readonly lastname: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Birth date cannot be empty' })
  @IsDateString()
  readonly birthDate: Date;

  @IsOptional()
  @IsString()
  @MaxLength(50, { message: 'Birth place too long' })
  @IsNotEmpty({ message: 'Birth place can not be empty' })
  readonly birthPlace: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Active cannot be empty' })
  readonly active: boolean;

  @IsOptional()
  @IsNotEmpty({ message: 'Role cannot be empty' })
  readonly role: Role;
}

export class UserAccountDto extends UserAccountWithoutPasswordDto {
  @ApiProperty({ required: true })
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{10,})(?!.*(.)\1{2,})/, {message: 'password too weak'})
  readonly password: string;
}

export class GenericUserAccountDto extends UserAccountWithoutPasswordDto {
  @ApiProperty({ required: false })
  readonly studentId?: string;
  @ApiProperty({ required: false })
  readonly formationMode?: FormationMode;

  @ApiProperty({ required: false })
  readonly teacherId?: string;
  @ApiProperty({ required: false })
  readonly intern?: boolean;
  @ApiProperty({ required: false })
  readonly teacherSkills?: TeacherSkillsM[];
  @ApiProperty({ required: false })
  readonly adminId?: string;
}

export class AccountSummaryDto {
  @ApiProperty({ type: String, description: 'User id' })
  readonly id: string;
  @ApiProperty({ type: String, description: 'User name', maxLength: 255 })
  readonly username: string;
  @ApiProperty({ type: String, description: 'User first name', maxLength: 50 })
  readonly firstname: string;
  @ApiProperty({ type: String, description: 'User last name', maxLength: 50 })
  readonly lastname: string;
  @ApiProperty({ type: Date, description: 'User birth date' })
  readonly birthDate: Date;
  @ApiProperty({ type: String, description: 'User birth place', maxLength: 50 })
  readonly birthPlace: string;
  @ApiProperty({ type: Boolean, description: 'Account active status' })
  readonly active: boolean;
  @ApiProperty({ enum: Role, description: 'User role' })
  readonly role: Role;
  @ApiProperty({ type: GroupMemberSummary, description: 'User groups summary', isArray: true })
  readonly groups?: GroupMemberSummary[];
}

export class TeacherAccountDto {
  @ApiProperty({ required: true, type: String })
  @IsNotEmpty({ message: 'L\'id de l\'enseignant ne peut pas être vide' })
  readonly teacherId: string;

  @ApiProperty({ required: true, type: Boolean })
  @IsNotEmpty({ message: 'Le statut de l\'enseignant ne peut pas être vide' })
  readonly intern: boolean;
}

export class StudentAccountDto {
    
  @ApiProperty({ required: true, type: String })
  @IsNotEmpty({ message: 'L\'id de l\'étudiant ne peut pas être vide' })
  readonly studentId: string

  @ApiProperty({ required: true, enum: FormationMode, enumName: 'FormationMode' })
  @IsNotEmpty({ message: 'Le mode de formation ne peut pas être vide' })
  readonly formationMode: FormationMode;
}

export class UserAccountSummaryDto extends AccountSummaryDto {
  @ApiProperty({ type: StudentAccountDto, description: 'Student details' })
  readonly student?: StudentAccountDto;
  @ApiProperty({ type: TeacherAccountDto, description: 'Teacher details' })
  readonly teacher?: TeacherAccountDto;
  @ApiProperty({ type: String, description: 'Admin id' })
  readonly adminId?: string;
}