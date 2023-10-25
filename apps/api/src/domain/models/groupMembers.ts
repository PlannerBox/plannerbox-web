import { NestedAccountM } from "./account";

export class GroupMembersM {
    accountId: string;
    groupId: string;
    isOwner: boolean;
    account?: NestedAccountM;
}
