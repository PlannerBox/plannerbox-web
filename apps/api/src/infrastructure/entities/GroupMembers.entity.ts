import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Account } from "./Account.entity";
import { Group } from "./Group.entity";

@Index('GroupMembers_pkey', ['groupId', 'accountId'], { unique: true })
@Entity('GroupMembers', { schema: 'public' })
export class GroupMembers {
    @Column('uuid', { primary: true, name: 'groupId' })
    groupId: string;

    @Column('uuid', { primary: true, name: 'accountId' })
    accountId: string;

    @Column('boolean', { name: 'isOwner', default: () => "false" })
    isOwner: boolean;

    @ManyToOne(() => Group, (group) => group, { onDelete: 'CASCADE' })
    @JoinColumn([{ name: 'groupId', referencedColumnName: 'id' }])
    group: Group;

    @ManyToOne(() => Account, (account) => account, { onDelete: 'CASCADE' })
    @JoinColumn([{ name: 'accountId', referencedColumnName: 'id' }])
    account: Account;
}