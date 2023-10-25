import { Column, Entity, Index, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import Role from "../../domain/models/enums/role.enum";
import Permission from "../../domain/models/enums/permission.type";
import { Account } from "./Account.entity";

@Index('RolePermissions_pkey', ['id'], { unique: true })
@Entity('RolePermissions', { schema: 'public' })
export class RolePermissions {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Column({ type: 'enum', name: 'role', enum: Role, default: Role.Student })
    role: Role;

    @Column({ type: 'enum', enum: Permission, array: true, default: [] })
    permissions: Permission[];

    @OneToMany(() => Account, (account) => account.rolePermissions)
    accounts: Account[];
}