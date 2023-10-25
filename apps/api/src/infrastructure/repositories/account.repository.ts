import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { In, Repository } from 'typeorm';
import {
  AccountM,
  AccountWithoutPassword,
  UserAccountDetailsM,
} from '../../domain/models/account';
import Role from '../../domain/models/enums/role.enum';
import { IAccountRepository } from '../../domain/repositories/accountRepository.interface';
import { Account } from '../entities/Account.entity';
import { Admin } from '../entities/Admin.entity';
import { RolePermissions } from '../entities/RolePermissions.entity';
import { Student } from '../entities/Student.entity';
import { Teacher } from '../entities/Teacher.entity';
import { AccountMapper } from '../mappers/account.mapper';


@Injectable()
export class AccountRepository implements IAccountRepository {
  constructor(
    @InjectRepository(Account)
    private readonly accountEntityRepository: Repository<Account>,
    @InjectRepository(RolePermissions)
    private readonly rolePermissionsEntityRepository: Repository<RolePermissions>,
    @InjectRepository(Admin)
    private readonly adminEntityRepository: Repository<Admin>,
    @InjectRepository(Student)
    private readonly studentEntityRepository: Repository<Student>,
    @InjectRepository(Teacher)
    private readonly teacherEntityRepository: Repository<Teacher>,
  ) {}

  async findAccount(query: PaginateQuery): Promise<Paginated<Account>> {
    const queryBuilder =
      this.accountEntityRepository.createQueryBuilder('account');

    queryBuilder.leftJoinAndSelect(
      'account.rolePermissions',
      'rolePermissions',
    );
    queryBuilder.leftJoinAndSelect('account.groups', 'groups');

    return await paginate<Account>(query, queryBuilder, {
      loadEagerRelations: true,
      sortableColumns: [
        'id',
        'username',
        'firstname',
        'lastname',
        'rolePermissions',
        'active',
        'groups',
      ],
      nullSort: 'last',
      defaultSortBy: [['username', 'ASC']],
      searchableColumns: [
        'id',
        'username',
        'firstname',
        'lastname',
        'rolePermissions',
        'active',
        'groups',
      ],
      filterableColumns: {
        id: true,
        username: true,
        firstname: true,
        lastname: true,
        'rolePermissions.role': true,
        active: true,
        groups: true,
      },
      relations: {
        rolePermissions: true,
        groups: { group: { groupMembers: true } },
      },
    });
  }

  async updateAccount(account: AccountM): Promise<AccountWithoutPassword> {
    const accountEntity = AccountMapper.fromModelToEntity(account);
    await this.accountEntityRepository.save(accountEntity);

    const createdAccount = AccountMapper.fromEntityToModel(accountEntity);
    const { password, ...info } = createdAccount;
    return info;
  }

  async updateAccountState(username: string, active: boolean): Promise<void> {
    await this.accountEntityRepository.update(
      { username: username },
      { active: active },
    );
  }

  async getAccountByUsername(username: string): Promise<AccountM> {
    const accountEntity: Account = await this.accountEntityRepository.findOne({
      where: {
        username: username,
      },
    });

    if (!accountEntity) {
      return null;
    }
    return AccountMapper.fromEntityToModel(accountEntity);
  }

  async findAccountById(id: string): Promise<AccountM> {
    const accountEntity: Account = await this.accountEntityRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!accountEntity) {
      return null;
    }
    return AccountMapper.fromEntityToModel(accountEntity);
  }

  async accountExists(ids: string[]): Promise<boolean> {
    const accounts = await this.accountEntityRepository.find({ where: { id: In(ids) } });
    return accounts.length === ids.length;
}

  async updateLastLogin(username: string): Promise<void> {
    await this.accountEntityRepository.update(
      {
        username: username,
      },
      { lastLogin: () => 'CURRENT_TIMESTAMP' },
    );
  }

  async updateRefreshToken(
    username: string,
    refreshToken: string,
  ): Promise<void> {
    await this.accountEntityRepository.update(
      {
        username: username,
      },
      { hashRefreshToken: refreshToken },
    );
  }

  async createAccount(account: AccountM): Promise<AccountWithoutPassword> {
    const createdAccountEntity = await this.linkAccountToSubClass(account);
    const createdAccount =
      AccountMapper.fromEntityToModel(createdAccountEntity);
    const { password, ...info } = createdAccount;
    return info;
  }

  async resetPassword(username: string, newPassword: string): Promise<void> {
    await this.accountEntityRepository.update(
      { username: username },
      { password: newPassword },
    );
  }


  async deleteAccount(id: string): Promise<void> {
    await this.accountEntityRepository.delete({ id: id });
  }


  async getAllAccounts(): Promise<AccountWithoutPassword[]> {
    const accountEntities = await this.accountEntityRepository.find();
    return accountEntities.map((accountEntity) => {
      const { password, ...info } =
        AccountMapper.fromEntityToModel(accountEntity);
      return info;
    });
  }

  async findUserAccountDetails(id: string, username: string): Promise<UserAccountDetailsM> {
    let accountEntity = null;
    if (id) {
      accountEntity = await this.accountEntityRepository.findOne({
        where: {
          id: id,
        },
        relations: {
          groups: { group: true },
        },
      });
    } else {
      accountEntity = await this.accountEntityRepository.findOne({
        where: {
          username: username,
        },
        relations: {
          groups: { group: true },
        },
      });
    }

    if (!accountEntity) {
      return null;
    }

    const account = AccountMapper.fromEntityToModel(accountEntity);
    const userAccountDetails = new UserAccountDetailsM();
    userAccountDetails.id = account.id;
    userAccountDetails.username = account.username;
    userAccountDetails.firstname = account.firstname;
    userAccountDetails.lastname = account.lastname;
    userAccountDetails.birthDate = account.birthDate;
    userAccountDetails.birthPlace = account.birthPlace;
    userAccountDetails.lastLogin = account.lastLogin;
    userAccountDetails.hashRefreshToken = account.hashRefreshToken;
    userAccountDetails.active = account.active;
    userAccountDetails.role = account.role;
    userAccountDetails.rolePermissions = account.rolePermissions;
    userAccountDetails.groups = account.groups;

    switch (account.role) {
      case Role.Admin:
        const adminEntity = await this.adminEntityRepository.findOne({
          where: {
            account: {
              id: account.id,
            },
          },
        });
        userAccountDetails.adminId = adminEntity.id;
        break;
      case Role.Student:
        const studentEntity = await this.studentEntityRepository.findOne({
          where: {
            account: {
              id: account.id,
            },
          },
        });
        userAccountDetails.studentId = studentEntity.id;
        userAccountDetails.formationMode = studentEntity.formationMode;
        break;
      case Role.ExternTeacher:
      case Role.InternTeacher:
        const teacherEntity = await this.teacherEntityRepository.findOne({
          where: {
            account: {
              id: account.id,
            },
          },
          relations: { teacherSkills: { skill: true }}
        });
        userAccountDetails.teacherId = teacherEntity.id;
        userAccountDetails.intern = teacherEntity.intern;
        userAccountDetails.teacherSkills = teacherEntity.teacherSkills;
        break;
    }

    return userAccountDetails;
  }

  private async linkAccountToSubClass(account: AccountM): Promise<Account> {
    const accountEntity = AccountMapper.fromModelToEntity(account);
    accountEntity.rolePermissions =
      await this.rolePermissionsEntityRepository.findOne({
        where: {
          role: account.role,
        },
      });

    switch (account.role) {
      case Role.Admin:
        const createdAdminAccountEntity = await this.adminEntityRepository.save(
          {
            account: accountEntity,
          },
        );
        return createdAdminAccountEntity.account;
      case Role.Student:
        const student = new Student();
        student.account = accountEntity;
        student.formationMode = account.formationMode;
        const createdStudentAccountEntity =
          await this.studentEntityRepository.save(student);
        return createdStudentAccountEntity.account;
      case Role.ExternTeacher:
      case Role.InternTeacher:
        const teacher = new Teacher();
        teacher.account = accountEntity;
        teacher.intern = account.role === Role.InternTeacher;
        const createdTeacherAccountEntity =
          await this.teacherEntityRepository.save(teacher);
        return createdTeacherAccountEntity.account;
    }
  }
}
