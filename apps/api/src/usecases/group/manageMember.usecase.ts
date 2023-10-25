import { BadRequestException, NotFoundException } from "@nestjs/common";
import { ILogger } from "../../domain/logger/logger.interface";
import { NestedAccountM } from "../../domain/models/account";
import { IAccountRepository } from "../../domain/repositories/accountRepository.interface";
import { IGroupRepository } from "../../domain/repositories/groupRepository.interface";
import { AccountMapper } from "../../infrastructure/mappers/account.mapper";
import { NewGroupMemberDto } from "../../infrastructure/controllers/groupManagement/groupDto.class";
import { IGroupMemberRepository } from "../../domain/repositories/groupMemberRepository.interface";

export class AddMemberUseCase {
    constructor(
        private readonly groupRepository: IGroupRepository,
        private readonly groupMemberRepository: IGroupMemberRepository,
        private readonly accountRepository: IAccountRepository,
        private readonly logger: ILogger
    ) {}

    /// <summary>
    ///     Get all accounts summary
    /// </summary>
    async getAllSummaryAccounts(): Promise<NestedAccountM[]> {
        const accounts = await this.accountRepository.getAllAccounts();

        this.logger.log('AccountManagementUseCases getAllAccounts', `Found ${accounts.length} accounts`);

        if (!accounts) {
            throw new BadRequestException('No account found');
        }

        let summaryAccounts = [];

        accounts.forEach(account => {
            summaryAccounts.push(AccountMapper.fromModelToNestedModel(account));
        });

        return summaryAccounts;
    }

    async addMember(groupId: string, newGroupMemberDto: NewGroupMemberDto): Promise<any> {
        const group = await this.groupRepository.findGroup(groupId);

        if (!group) {
            throw new NotFoundException('No group found');
        }

        const account = await this.accountRepository.findAccountById(newGroupMemberDto.accountId);

        if (!account) {
            throw new NotFoundException('No account found');
        }

        return this.groupMemberRepository.upsertGroupMember(group.id, account.id, newGroupMemberDto.isOwner);
    }

    async updateMember(groupId: string, accountId: string): Promise<any> {
        const groupMember = await this.groupMemberRepository.findGroupMember(groupId, accountId);
        
        if (!groupMember) {
            throw new NotFoundException('No group member found');
        }

        // Si le membre n'est pas le propriétaire, c'est qu'on veut le passer propriétaire donc on vériie qu'il n'y a pas déjà un propriétaire
        if (!groupMember.isOwner) {
            const groupOwner = await this.groupMemberRepository.findGroupMemberOwner(groupId);
            if (groupOwner) {
                throw new BadRequestException('A group can only have one owner');
            }
        }

        return this.groupMemberRepository.upsertGroupMember(groupId, accountId, !groupMember.isOwner);
    }

    async removeMember(groupId: string, accountId: string): Promise<any> {
        const group = await this.groupRepository.findGroup(groupId);

        if (!group) {
            throw new NotFoundException('No group found');
        }

        const account = await this.accountRepository.findAccountById(accountId);

        if (!account) {
            throw new NotFoundException('No account found');
        }

        return this.groupMemberRepository.removeGroupMember(group.id, account.id);
    }
}