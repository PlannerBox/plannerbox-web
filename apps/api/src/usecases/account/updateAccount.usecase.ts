import { IBcryptService } from "../../domain/adapters/bcrypt.interface";
import { AccountWithoutPassword, AccountM } from "../../domain/models/account";
import { IAccountRepository } from "../../domain/repositories/accountRepository.interface";
import { ILogger } from "../../domain/logger/logger.interface";
import { GenericUserAccountDto, UserAccountDto, UserAccountWithoutPasswordDto } from "../../infrastructure/controllers/userManagement/userAccountDto.class";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { StudentAccountDetailedDto } from "../../infrastructure/controllers/userManagement/studentAccountDto.class";
import { StudentM } from "../../domain/models/student";
import { IStudentRepository } from "../../domain/repositories/studentRepository.interface";
import { StudentMapper } from "../../infrastructure/mappers/student.mapper";
import { AccountMapper } from "../../infrastructure/mappers/account.mapper";
import { IAdminRepository } from "../../domain/repositories/adminRepository.interface";
import { ITeacherRepository } from "../../domain/repositories/teacherRepository.interface";
import { TeacherM } from "../../domain/models/teacher";
import { TeacherMapper } from "../../infrastructure/mappers/teacher.mapper";


export class UpdateAccountUseCase {
    constructor(
        private readonly accountRepository: IAccountRepository,
        private readonly studentRepository: IStudentRepository,
        private readonly adminRepository: IAdminRepository,
        private readonly teacherRepository: ITeacherRepository,
        private readonly bcryptService: IBcryptService,
        private readonly logger: ILogger,
    ) { }

    async updateAccount(userAccountDto: GenericUserAccountDto): Promise<AccountWithoutPassword> {

        let account = await this.accountRepository.findAccountById(userAccountDto.id);
        switch (account.role) {
            case 'student':
                const studentAccount = StudentMapper.fromGenericDtoToModel(userAccountDto);
                return await this.updateStudent(studentAccount);
            case 'internTeacher':
            case 'externTeacher':
                const teacherAccount = TeacherMapper.fromGenericDtoToModel(userAccountDto);
                return await this.updateTeacher(teacherAccount);
            case 'admin':
                const adminAccount = AccountMapper.fromGenericDtoToModel(userAccountDto);
                return await this.updateAdmin(adminAccount);
            default:
                throw new NotFoundException('Role not found');
        }
    }

    private async updateStudent(studentM: StudentM): Promise<any> {
        const student = await this.studentRepository.findStudentByAccountId(studentM.id);

        if (!student) {
            this.logger.error('UpdateAccountUseCases updateStudentAccount', 'Account not found')
            throw new NotFoundException('Account not found');
        }

        student.username = studentM.username ?? student.username;
        student.firstname = studentM.firstname ?? student.firstname;
        student.lastname = studentM.lastname ?? student.lastname;
        student.birthDate = studentM.birthDate ?? student.birthDate;
        student.birthPlace = studentM.birthPlace ?? student.birthPlace;
        student.active = studentM.active ?? student.active;
        student.formationMode = studentM.formationMode ?? student.formationMode;

        return await this.studentRepository.updateStudent(student);
    }

    private async updateTeacher(teacherM: TeacherM): Promise<any> {
        const teacher = await this.teacherRepository.findTeacherByAccountId(teacherM.teacherId);

        if (!teacher) {
            this.logger.error('UpdateAccountUseCases updateTeacher', 'Account not found')
            throw new NotFoundException('Account not found');
        }

        teacher.username = teacherM.username ?? teacher.username;
        teacher.firstname = teacherM.firstname ?? teacher.firstname;
        teacher.lastname = teacherM.lastname ?? teacher.lastname;
        teacher.birthDate = teacherM.birthDate ?? teacher.birthDate;
        teacher.birthPlace = teacherM.birthPlace ?? teacher.birthPlace;
        teacher.active = teacherM.active ?? teacher.active;
        teacher.role = teacherM.role ?? teacher.role;
        teacher.rolePermissions = teacherM.rolePermissions ?? teacher.rolePermissions;
        teacher.intern = teacherM.intern ?? teacher.intern;

        return await this.teacherRepository.updateTeacher(teacher);
    }

    private async updateAdmin(adminAccount: AccountM): Promise<any> {
        const admin = await this.accountRepository.findAccountById(adminAccount.id);

        if (!admin) {
            this.logger.error('UpdateAccountUseCases updateAdmin', 'Account not found')
            throw new NotFoundException('Account not found');
        }
        console.log(adminAccount);
        admin.username = adminAccount.username ?? admin.username;
        admin.firstname = adminAccount.firstname ?? admin.firstname;
        admin.lastname = adminAccount.lastname ?? admin.lastname;
        admin.birthDate = adminAccount.birthDate ?? admin.birthDate;
        admin.birthPlace = adminAccount.birthPlace ?? admin.birthPlace;
        admin.active = adminAccount.active ?? admin.active;
        admin.role = adminAccount.role ?? admin.role;
        admin.rolePermissions = adminAccount.rolePermissions ?? admin.rolePermissions;

        return await this.accountRepository.updateAccount(admin);
    }
}