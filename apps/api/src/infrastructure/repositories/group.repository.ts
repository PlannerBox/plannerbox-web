import { InjectRepository } from "@nestjs/typeorm";
import { IGroupRepository } from "../../domain/repositories/groupRepository.interface";
import { Group } from "../entities/Group.entity";
import { In, Repository } from "typeorm";
import { GroupMembers } from "../entities/GroupMembers.entity";
import { GroupM } from "../../domain/models/group";
import { NotFoundException } from "@nestjs/common";
import { PaginateQuery, Paginated, paginate } from "nestjs-paginate";
import { PageDto } from "../pagination/page.dto";
import { PageOptionsDto } from "../pagination/pageOptions.dto";
import { PageMetaDto } from "../pagination/pageMeta.dto";
import GroupType from "../../domain/models/enums/groupType.enum";

export class GroupRepository implements IGroupRepository {
    constructor(
        @InjectRepository(Group)
        private readonly groupRepository: Repository<Group>,

        @InjectRepository(GroupMembers)
        private readonly groupMembersRepository: Repository<GroupMembers>
    ) {}

    async createGroup(group: GroupM): Promise<Group> {
        return await this.groupRepository.save(group);
    }

    async findGroup(groupID: string): Promise<Group> {
        return await this.groupRepository.findOne({ where: { id: groupID }, relations: {groupMembers: { account: true}}, order: { groupMembers: { isOwner: "DESC", account: { firstname: "ASC"}} } });
    }

    async findGroupBy(id: string, name: string, pageOptionsDto: PageOptionsDto): Promise<PageDto<Group>> {
        const queryBuilder = this.groupRepository.createQueryBuilder('group');

        queryBuilder.leftJoinAndSelect('group.groupMembers', 'groupMembers');
        queryBuilder.leftJoinAndSelect('groupMembers.account', 'account');

        if (id) 
            queryBuilder.where('group.id = :id', { id: id });
        if (name)
            queryBuilder.where('group.name like :name', { name: `%${name}%` });

        queryBuilder.orderBy('groupMembers.isOwner', 'DESC');
        queryBuilder.addOrderBy('account.firstname', 'ASC');
        queryBuilder.skip(pageOptionsDto.skip);
        queryBuilder.take(pageOptionsDto.take);

        const itemCount = await queryBuilder.getCount();
        const { entities } = await queryBuilder.getRawAndEntities();

        const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

        return new PageDto(entities, pageMetaDto);
    }

    async findReferee(refereeID: string): Promise<any> {
        return await this.groupMembersRepository.findOne({ where: { accountId: refereeID }, relations: { account: true } });
    }
    
    async findAll(): Promise<Group[]> {
        return await this.groupRepository.find({ relations: {groupMembers: { account: true}} });
    }

    async updateGroup(groupM: GroupM): Promise<any> {
        const group = await this.groupRepository.findOne({ where: { id: groupM.id }});

        if (!group) {
            throw new NotFoundException('Group not found');
        }

        group.name = groupM.name;
        group.color = groupM.color;

        return this.groupRepository.update(group.id, group);
    }

    async deleteGroup(groupId: string): Promise<any> {
        const group = await this.groupRepository.findOne({ where: { id: groupId }});

        if (!group) {
            throw new NotFoundException('Group not found');
        }

        return this.groupRepository.delete(group.id);
    }

    async findPaginated(query: PaginateQuery): Promise<Paginated<Group>> {
        const queryBuilder = this.groupRepository.createQueryBuilder('group');

        queryBuilder.leftJoinAndSelect('group.groupMembers', 'groupMembers');
        queryBuilder.leftJoinAndSelect('groupMembers.account', 'account');

        return await paginate<Group>(query, queryBuilder, {
            loadEagerRelations: true,
            sortableColumns: ['id', 'name', 'color', 'groupMembers'],
            nullSort: 'last',
            defaultSortBy: [['groupMembers.isOwner', 'DESC']],
            searchableColumns: ['id', 'name', 'color', 'groupMembers'],
            filterableColumns: { id: true ,name: true, color: true, groupMembers: true },
            relations: {groupMembers: { account: true }},
        });
    }

    async findPaginatedManually(pageOptionsDto: PageOptionsDto): Promise<PageDto<Group>> {
        const queryBuilder = this.groupRepository.createQueryBuilder();

        queryBuilder.select('group');
        queryBuilder.from(Group, 'group');

        queryBuilder.orderBy('groupMembers.isOwner', 'DESC');
        queryBuilder.skip(pageOptionsDto.skip);
        queryBuilder.take(pageOptionsDto.take);
        
        const itemCount = await queryBuilder.getCount();
        const { entities } = await queryBuilder.getRawAndEntities();

        const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

        return new PageDto(entities, pageMetaDto);
    }

    async countGroupByType(type: GroupType): Promise<number> {
        return await this.groupRepository.count({ where: { type: type } });
    }

    async groupExists(groupIds: string[]): Promise<boolean> {
        const groups = await this.groupRepository.find({ where: { id: In(groupIds) } });

        return groupIds.length == groups.length;
    }
}