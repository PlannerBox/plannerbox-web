import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Inject, Param, Post, Query, Res, UseGuards } from "@nestjs/common";
import { UsecasesProxyModule } from "../../usecases-proxy/usecases-proxy.module";
import { UseCaseProxy } from "../../usecases-proxy/usecases-proxy";
import { GetGroupUseCase } from "../../../usecases/group/getGroup.usecase";
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { GroupDetailDto } from "./groupDetailDto.class";
import { GroupMapper } from "../../mappers/group.mapper";
import { JwtAuthGuard } from "../../common/guards/jwtAuth.guard";
import { AccountMapper } from "../../mappers/account.mapper";
import { NestedAccountDto } from "./nestedAccountDto.class";
import { AddMemberUseCase } from "../../../usecases/group/manageMember.usecase";
import { GroupDto, NewGroupDto, NewGroupMemberDto } from "./groupDto.class";
import { CreateGroupUseCase } from "../../../usecases/group/createGroup.usecase";
import { UpdateGroupUseCase } from "../../../usecases/group/updateGroup.usecase";
import { JsonResult } from "../../helpers/JsonResult";
import { DeleteGroupUseCase } from "../../../usecases/group/deleteGroup.usecase";
import { Paginate, PaginateQuery, Paginated } from "nestjs-paginate";
import { PageOptionsDto } from "../../pagination/pageOptions.dto";
import { UUID } from "crypto";
import { Group } from "../../entities/Group.entity";
import { PageDto } from "../../pagination/page.dto";

@Controller('group-management')
@ApiTags('group-management')
@ApiResponse({
    status: 401,
    description: 'No authorization token was found',
})
export class GroupManagementController {
    constructor(
        @Inject(UsecasesProxyModule.GET_GROUP_USECASES_PROXY)
        private readonly getGroupUsecasesProxy: UseCaseProxy<GetGroupUseCase>,

        @Inject(UsecasesProxyModule.ADD_MEMBER_USECASES_PROXY)
        private readonly addMemberUseCase: UseCaseProxy<AddMemberUseCase>,

        @Inject(UsecasesProxyModule.CREATE_GROUP_USECASES_PROXY)
        private readonly createGroupUseCase: UseCaseProxy<CreateGroupUseCase>,

        @Inject(UsecasesProxyModule.UPDATE_GROUP_USECASES_PROXY)
        private readonly updateGroupUseCase: UseCaseProxy<UpdateGroupUseCase>,

        @Inject(UsecasesProxyModule.DELETE_GROUP_USECASES_PROXY)
        private readonly deleteGroupUseCase: UseCaseProxy<DeleteGroupUseCase>
    ) {}

    @Get('group/list-paginated')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiResponse({
        status: 200,
        description: 'Returns a paginated list of groups',
        type: GroupDetailDto,
    })
    @ApiResponse({
        status: 204,
        description: 'No group found',
    })
    @ApiOperation({ description: 'Returns a paginated list of all groups (nestjs pagination)' })
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'the page number to return' }) 
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'the number of items per page' })
    @ApiQuery({ name: 'filter.name', required: false, type: String, description: 'add a filter on the property group.name (check nestjs paginate doc for more details)' })
    async getGroupPaginatedList(@Paginate() query: PaginateQuery): Promise<Paginated<Group>> {
        return await this.getGroupUsecasesProxy.getInstance().findGroupPaginatedList(query);
    }

    @Get('group/:groupId/details')
    @HttpCode(200)
    @ApiResponse({
        status: 200,
        description: 'Returns details of a specific group',
        type: GroupDetailDto,
    })
    @ApiResponse({
        status: 400,
        description: 'No group found',
    })
    @ApiOperation({ description: 'Returns details of a group' })
    async getGroupDetails(@Param('groupId') groupId: string): Promise<GroupDetailDto> {
        const group = await this.getGroupUsecasesProxy.getInstance().findGroupDetails(groupId);

        return GroupMapper.fromModelToDetailDto(group);
    }

    @Get('group/details')
    @HttpCode(200)
    @ApiResponse({
        status: 200,
        description: 'Returns details of a specific group',
        type: GroupDetailDto
    })
    @ApiResponse({
        status: 400,
        description: 'No group found',
    })
    @ApiOperation({ description: 'Returns details of a specific group' })
    async getPaginatedGroupDetailsByAccount(@Paginate() query: PaginateQuery): Promise<any> {
        return await this.getGroupUsecasesProxy.getInstance().findGroupPaginatedList(query);
    }

    @Get('user/summary')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiResponse({
        status: 200,
        description: 'Returns a summary list of all users (used to add a member to a group)',
        type: NestedAccountDto,
    })
    @ApiResponse({
        status: 204,
        description: 'No user found',
    })
    @ApiOperation({ description: 'Get the summary of all users' })
    async getAllUsersSummary(): Promise<NestedAccountDto[]> {
        const accounts = await this.addMemberUseCase.getInstance().getAllSummaryAccounts();

        if (accounts.length === 0) {
            throw new HttpException('No user found', HttpStatus.NO_CONTENT);
        }
        return accounts.map(account => {
            return AccountMapper.fromNestedModelToNestedDto(account);
        });
    }

    @Post('group/create')
    @UseGuards(JwtAuthGuard)
    @HttpCode(201)
    @ApiResponse({
        status: 201,
        description: 'Group successfully created',
    })
    @ApiOperation({ description: 'Create a new group' })
    async createGroup(@Body() newGroupDto: NewGroupDto): Promise<any> {
        await this.createGroupUseCase.getInstance().createGroup(newGroupDto);
        return JsonResult.Convert('Group successfully created');
    }

    @Post('group/update')
    @UseGuards(JwtAuthGuard)
    @HttpCode(204)
    @ApiResponse({
        status: 204,
        description: 'Group successfully updated',
    })
    @ApiResponse({
        status: 404,
        description: 'Group not found',
    })
    @ApiOperation({ description: 'Update group informations (name & color)' })
    async updateGroup(@Body() groupDto: GroupDto): Promise<any> {
        await this.updateGroupUseCase.getInstance().updateGroup(groupDto);
        return JsonResult.Convert('Group successfully updated');
    }

    @Post('group/:groupId/add')
    @UseGuards(JwtAuthGuard)
    @HttpCode(204)
    @ApiResponse({
        status: 204,
        description: 'Member successfully added',
    })
    @ApiResponse({
        status: 404,
        description: 'Group or member not found',
    })
    @ApiOperation({ description: 'Add a member to a group' })
    async addMember(@Param('groupId') groupId: string, @Body() newGroupMemberDto: NewGroupMemberDto): Promise<any> {
        await this.addMemberUseCase.getInstance().addMember(groupId, newGroupMemberDto);
        return JsonResult.Convert('Member successfully added');
    }

    @Post('group/:groupId/update/:accountId')
    @UseGuards(JwtAuthGuard)
    @HttpCode(204)
    @ApiResponse({
        status: 204,
        description: 'Member status successfully updated',
    })
    @ApiResponse({
        status: 404,
        description: 'Group or member not found',
    })
    @ApiResponse({
        status: 400,
        description: 'A group can only have one owner',
    })
    async updateMember(@Param('groupId') groupId: string, @Param('accountId') accountId: string): Promise<any> {
        await this.addMemberUseCase.getInstance().updateMember(groupId, accountId);
        return JsonResult.Convert('Member status successfully updated');
    }

    @Delete('group/:groupId/remove-member/:accountId')
    @UseGuards(JwtAuthGuard)
    @HttpCode(204)
    @ApiResponse({
        status: 204,
        description: 'Member successfully removed',
    })
    @ApiResponse({
        status: 404,
        description: 'Group or member not found',
    })
    @ApiOperation({ description: 'Remove a member from a group' })
    async removeMember(@Param('groupId') groupId: string, @Param('accountId') accountId: string): Promise<any> {
        await this.addMemberUseCase.getInstance().removeMember(groupId, accountId);
        return JsonResult.Convert('Member successfully removed');
    }

    @Delete('group/:groupId/delete')
    @UseGuards(JwtAuthGuard)
    @HttpCode(204)
    @ApiResponse({
        status: 204,
        description: 'Group successfully deleted',
    })
    @ApiResponse({
        status: 404,
        description: 'Group not found',
    })
    @ApiOperation({ description: 'Delete a group' })
    async deleteGroup(@Param('groupId') groupId: string): Promise<any> {
        await this.deleteGroupUseCase.getInstance().deleteGroup(groupId);
        return JsonResult.Convert('Group successfully deleted');
    }
}