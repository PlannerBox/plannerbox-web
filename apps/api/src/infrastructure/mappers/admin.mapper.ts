import { AdminM } from "../../domain/models/admin";
import { Admin } from "../entities/Admin.entity";
import { AccountMapper } from "./account.mapper";

export class AdminMapper {
    static fromEntityToModel(admin: Admin): AdminM {
        return {
            adminId: admin.id,
            ...AccountMapper.fromEntityToModel(admin.account)
        }
    }
}