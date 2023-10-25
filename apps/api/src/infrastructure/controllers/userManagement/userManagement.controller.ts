import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { Role } from '../../../domain/models/enums/role.enum';
import UsersPermissions from '../../../domain/models/enums/usersPermissions.enum';
import { UpdateAccountUseCase } from '../../../usecases/account/updateAccount.usecase';
import { AccountManagementUseCases } from '../../../usecases/auth/accountManagement.usecases';
import { JwtAuthGuard } from '../../common/guards/jwtAuth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { HasPermissions } from '../../decorators/has-permissions.decorator';
import { HasRole } from '../../decorators/has-role.decorator';
import { Account } from '../../entities/Account.entity';
import { JsonResult } from '../../helpers/JsonResult';
import { AccountMapper } from '../../mappers/account.mapper';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import {
  AccountSummaryDto,
  GenericUserAccountDto,
} from './userAccountDto.class';
import { UserAccountDetailsM } from '../../../domain/models/account';
import { RolesPermissionsDto } from './RolesPermissionsDto.class';

@Controller('user-management')
@ApiTags('user-management')
@ApiResponse({
  status: 401,
  description: 'No authorization token was found',
})
export class UserManagementController {
  constructor(
    @Inject(UsecasesProxyModule.ACCOUNT_MANAGEMENT_USECASES_PROXY)
    private readonly accountManagementUsecaseProxy: UseCaseProxy<AccountManagementUseCases>,
    @Inject(UsecasesProxyModule.UPDATE_USER_ACCOUNT_PROXY)
    private readonly updateAccountUseCase: UseCaseProxy<UpdateAccountUseCase>,
  ) {}

  @Get('user/list-paginated')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @ApiOperation({
    description: 'get paginated users list (with nestjs pagination)',
  })
  @ApiResponse({
    status: 200,
    description: 'Users list',
    type: AccountSummaryDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'the page number to return',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'the number of items per page',
  })
  @ApiQuery({
    name: 'filter.name',
    required: false,
    type: String,
    description:
      'add a filter on the property student.name (check nestjs paginate doc for more details)',
  })
  async getAllUsers(@Paginate() query: PaginateQuery): Promise<any> {
    const accountList = await this.accountManagementUsecaseProxy
      .getInstance()
      .findAll(query);

    const summaryAccount = [];

    accountList.data.forEach((account: Account) => {
      summaryAccount.push(
        AccountMapper.fromAccountEntityToAccountSummaryDto(account),
      );
    });

    accountList.data = summaryAccount;
    return accountList;
  }

  @Get('users/details')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @ApiOperation({ description: 'get specific user account details' })
  @ApiResponse({
    status: 200,
    description: 'User details',
    type: UserAccountDetailsM,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Account not found' })
  async getUserDetails(@Query('accountId') accountId: string, @Req() request: any) {
    if (!accountId)
      return await this.accountManagementUsecaseProxy.getInstance().findAccountDetails(null, request.user.username);

    return await this.accountManagementUsecaseProxy
      .getInstance()
      .findAccountDetails(accountId, null);
  }

  @Get('is-active')
  @HttpCode(200)
  @ApiOperation({ description: 'check if the given account is active' })
  @ApiResponse({ status: 200, description: 'State of the account' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Account not found' })
  async isValidAccount(@Query('username') username: string) {
    return await this.accountManagementUsecaseProxy
      .getInstance()
      .accountIsValid(username);
  }

  @Get('role-permissions')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @ApiOperation({ description: 'get permissions of every role' })
  @ApiResponse({ status: 200, description: 'Role permissions' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getRolePermissions(@Req() request: any) {
    return await this.accountManagementUsecaseProxy
      .getInstance()
      .getRolePermissions();
  }

  @Post('update')
  @HasPermissions(UsersPermissions.UpdateAll, UsersPermissions.Update)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @ApiBody({ type: GenericUserAccountDto })
  @ApiOperation({ description: 'update user account' })
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'Account updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Account not found' })
  async updateAccount(
    @Body() userAccount: GenericUserAccountDto,
    @Req() request: any,
  ) {
    let AccountWithoutPassword;
    if (
      request.user.permissions.some((permission) => {
        return UsersPermissions.UpdateAll == permission;
      })
    ) {
      AccountWithoutPassword = await this.updateAccountUseCase
        .getInstance()
        .updateAccount(userAccount);
    } else if (request.user.id == userAccount.id) {
      AccountWithoutPassword = await this.updateAccountUseCase
        .getInstance()
        .updateAccount(userAccount);
    } else {
      return new UnauthorizedException(
        'Impossible de modifier cet utilisateur.',
      );
    }

    return AccountWithoutPassword;
  }

  @Post('account-state')
  @HasRole(Role.Admin)
  @HasPermissions(UsersPermissions.Update)
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @HttpCode(200)
  @ApiOperation({ description: 'invert account state' })
  @ApiResponse({ status: 200, description: 'Account state updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Account not found' })
  async updateAccountState(@Query('username') username: string) {
    const response = await this.accountManagementUsecaseProxy
      .getInstance()
      .updateAccountState(username);
    return JsonResult.Convert(
      `Le compte a été ${!response ? 'des' : ''}activaté`,
    );
  }

  @Post('role-permissions')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @ApiOperation({ description: 'update permissions for given roles' })
  @ApiResponse({ status: 200, description: 'Permissions updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateRolePermissions(
    @Body() rolesPermissions: RolesPermissionsDto[],
    @Req() request: any,
  ) {
    rolesPermissions.forEach(async (rolePermission) => {
      await this.accountManagementUsecaseProxy
        .getInstance()
        .updateRolePermissions(rolePermission.role, rolePermission.permissions);
    });
    return JsonResult.Convert(`Permissions mises à jour`);
  }

  @Delete('delete')
  @HasRole(Role.Admin)
  @HasPermissions(UsersPermissions.Delete)
  @HttpCode(200)
  @ApiOperation({ description: 'delete an inactive account' })
  @ApiResponse({ status: 200, description: 'Account delete' })
  @ApiResponse({
    status: 400,
    description: 'Account is active and cannot be deleted',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Account not found' })
  async deleteAccount(@Query('id') id: string) {
    await this.accountManagementUsecaseProxy.getInstance().deleteAccount(id);
    return JsonResult.Convert('Account delete');
  }
}
