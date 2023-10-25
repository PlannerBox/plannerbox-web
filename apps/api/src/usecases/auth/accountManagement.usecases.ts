import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PaginateQuery } from 'nestjs-paginate';
import { ILogger } from '../../domain/logger/logger.interface';
import Permission from '../../domain/models/enums/permission.type';
import Role from '../../domain/models/enums/role.enum';
import { IAccountRepository } from '../../domain/repositories/accountRepository.interface';
import { IRolePermissionsRepository } from '../../domain/repositories/rolePermissionsRepository.interface';

export class AccountManagementUseCases {
  constructor(
    private readonly accountRepository: IAccountRepository,
    private readonly rolePermissionsRepository: IRolePermissionsRepository,
    private readonly logger: ILogger,
  ) {}

  /// <summary>
  ///     Check if the account is active
  /// </summary>
  async accountIsValid(username: string): Promise<any> {
    const account = await this.accountRepository.getAccountByUsername(username);
    if (!account) {
      this.logger.error(
        'AccountManagementUseCases accountIsValid',
        'Account not found',
      );
      throw new NotFoundException('Account not found');
    }

    return account.active;
  }

  /// <summary>
  ///     Update account state (active/inactive)
  /// </summary>
  async updateAccountState(username: string): Promise<any> {
    const account = await this.accountRepository.getAccountByUsername(username);
    if (!account) {
      this.logger.error(
        'AccountManagementUseCases updateAccountState',
        'Account not found',
      );
      throw new NotFoundException('Account not found');
    }

    this.logger.log(
      'AccountManagementUseCases updateAccountState',
      `Account new status:${!account.active}`,
    );
    await this.accountRepository.updateAccountState(username, !account.active);
    return !account.active;
  }

  /// <summary>
  ///     Update account role permissions
  /// </summary>
  async updateRolePermissions(
    role: Role,
    permissions: Permission[],
  ): Promise<any> {
    await this.rolePermissionsRepository.updateRolePermissions(
      role,
      permissions,
    );

    this.logger.log(
      'AccountManagementUseCases updateRolePermissions',
      'Role permissions updated',
    );
    return 'Role permissions updated';
  }

    /// <summary>
    ///     Get role permissions
    /// </summary>
    async getRolePermissions(): Promise<any> {
        return await this.rolePermissionsRepository.getRolePermissions();
    }

  /// <summary>
  ///     Get all accounts
  /// </summary>
  async getAllAccounts(): Promise<any> {
    return await this.accountRepository.getAllAccounts();
  }

  /// <summary>
  ///     Delete an account
  /// </summary>
  async deleteAccount(id: string): Promise<any> {
    const account = await this.accountRepository.findAccountById(id);

    if (!account) {
      throw new NotFoundException('account not found');
    }

    if (account.active) {
      throw new BadRequestException('account is active and cannot be deleted');
    }
    const role = account.rolePermissions.role;
    return await this.accountRepository.deleteAccount(id);
  }

  /// <summary>
  ///     Find an account
  /// </summary>
  async findAccountDetails(accountId: string, username: string): Promise<any> {
    const userAccountDetails =
      await this.accountRepository.findUserAccountDetails(accountId, username);
    if (!userAccountDetails) {
      this.logger.error(
        'AccountManagementUseCases findAccountDetails',
        'Account not found',
      );
      throw new NotFoundException('Account not found');
    }
    return userAccountDetails;
  }

  /// <summary>
  ///    Find accounts with pagination
  /// </summary>
  async findAll(query: PaginateQuery): Promise<any> {
    return await this.accountRepository.findAccount(query);
  }
}
