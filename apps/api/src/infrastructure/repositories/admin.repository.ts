import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminM } from "../../domain/models/admin";
import { IAdminRepository } from "../../domain/repositories/adminRepository.interface";
import { Repository } from "typeorm";
import { Admin } from "../entities/Admin.entity";
import { AdminMapper } from "../mappers/admin.mapper";

@Injectable()
export class AdminRepository implements IAdminRepository {
    constructor(
        @InjectRepository(Admin)
        private readonly adminRepository: Repository<Admin>
    ) {}
    
    async findOne(username: string): Promise<AdminM> {
        const adminAccountEntity =  await this.adminRepository.findOne({
            where: {
                account: {
                    username: username
                }
            }
        });

        if (!adminAccountEntity) {
            return null;
        }

        return AdminMapper.fromEntityToModel(adminAccountEntity);
    }
}