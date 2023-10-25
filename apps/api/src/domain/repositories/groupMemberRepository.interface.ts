export interface IGroupMemberRepository {
    upsertGroupMember(groupId: string, accountId: string, isOwner: boolean): Promise<any>;
    removeGroupMember(groupId: string, accountId: string): Promise<any>;
    findGroupMember(groupId: string, accountId: string): Promise<any>;
    findGroupMemberOwner(groupId: string): Promise<any>;
}