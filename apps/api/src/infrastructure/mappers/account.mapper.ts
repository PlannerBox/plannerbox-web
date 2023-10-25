import { AccountM, NestedAccountM } from '../../domain/models/account';
import { AuthSignUpDto } from '../controllers/auth/authSignUpDto.class';
import { NestedAccountDto } from '../controllers/groupManagement/nestedAccountDto.class';
import {
  AccountSummaryDto,
  GenericUserAccountDto,
  UserAccountDto,
  UserAccountWithoutPasswordDto,
} from '../controllers/userManagement/userAccountDto.class';
import { Account } from '../entities/Account.entity';
import { GroupMemberMapper } from './groupMember.mapper';

export class AccountMapper {
  static fromModelToEntity(accountM: AccountM): Account {
    return {
      id: accountM.id,
      username: accountM.username,
      password: accountM.password,
      firstname: accountM.firstname,
      lastname: accountM.lastname,
      birthDate: accountM.birthDate,
      birthPlace: accountM.birthPlace,
      lastLogin: accountM.lastLogin,
      hashRefreshToken: accountM.hashRefreshToken,
      active: accountM.active,
      rolePermissions: accountM.rolePermissions,
      groups: accountM.groups,
    };
  }

  static fromEntityToModel(account: Account): AccountM {

    return {
      id: account.id,
      username: account.username,
      password: account.password,
      firstname: account.firstname,
      lastname: account.lastname,
      birthDate: account.birthDate,
      birthPlace: account.birthPlace,
      lastLogin: account.lastLogin,
      hashRefreshToken: account.hashRefreshToken,
      active: account.active,
      role: account.rolePermissions.role,
      rolePermissions: account.rolePermissions,
      groups: account.groups,
    };
  }

  static fromDtoToModel(userAccountDto: UserAccountDto): AccountM {
    return {
      id: userAccountDto.id,
      username: userAccountDto.username,
      firstname: userAccountDto.firstname,
      lastname: userAccountDto.lastname,
      birthDate: userAccountDto.birthDate,
      birthPlace: userAccountDto.birthPlace,
      active: userAccountDto.active,
      role: userAccountDto.role,
    };
  }

  static fromUpdateDtoToModel(
    userAccountDto: UserAccountWithoutPasswordDto,
  ): AccountM {
    return {
      id: userAccountDto.id,
      username: userAccountDto.username,
      firstname: userAccountDto.firstname,
      lastname: userAccountDto.lastname,
      birthDate: userAccountDto.birthDate,
      birthPlace: userAccountDto.birthPlace,
      active: userAccountDto.active,
      role: userAccountDto.role,
    };
  }

  static fromSignupDtoToModel(newAccountDto: AuthSignUpDto): AccountM {
    return {
      username: newAccountDto.username,
      password: newAccountDto.password,
      firstname: newAccountDto.firstname,
      lastname: newAccountDto.lastname,
      birthDate: newAccountDto.birthDate,
      birthPlace: newAccountDto.birthPlace,
      active: true,
      role: newAccountDto.role,
      formationMode: newAccountDto.formationMode,
    };
  }

  static fromGenericDtoToModel(
    userAccountDto: GenericUserAccountDto,
  ): AccountM {
    return {
      id: userAccountDto.id,
      username: userAccountDto.username,
      firstname: userAccountDto.firstname,
      lastname: userAccountDto.lastname,
      birthDate: userAccountDto.birthDate,
      birthPlace: userAccountDto.birthPlace,
      active: userAccountDto.active,
      role: userAccountDto.role,
    };
  }

  static fromEntityToNestedModel(account: Account): NestedAccountM {
    return {
      id: account.id,
      username: account.username,
      firstname: account.firstname,
      lastname: account.lastname,
    };
  }

  static fromModelToNestedModel(accountM: AccountM): NestedAccountM {
    return {
      id: accountM.id,
      username: accountM.username,
      firstname: accountM.firstname,
      lastname: accountM.lastname,
    };
  }
  static fromNestedModelToNestedDto(account: NestedAccountM): NestedAccountDto {
    return {
      id: account.id,
      username: account.username,
      firstname: account.firstname,
      lastname: account.lastname,
    };
  }

  static fromAccountEntityToAccountSummaryDto(
    account: Account,
  ): AccountSummaryDto {
    return {
      id: account.id,
      username: account.username,
      firstname: account.firstname,
      lastname: account.lastname,
      birthDate: account.birthDate,
      birthPlace: account.birthPlace,
      active: account.active,
      role: account.rolePermissions.role,
      groups: account.groups
        ? account.groups.map((group) =>
            GroupMemberMapper.fromEntityToSummary(group),
          )
        : undefined,
    };
  }
}
