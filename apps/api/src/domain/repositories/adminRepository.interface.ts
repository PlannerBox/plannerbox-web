import { AdminM } from "../models/admin";

export interface IAdminRepository {
    findOne(username: string): Promise<AdminM>;
}