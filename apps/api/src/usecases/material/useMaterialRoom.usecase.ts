import { ILogger } from "../../domain/logger/logger.interface";
import { IUseMaterialRoomRepository } from "../../domain/repositories/useMaterialRoomRepository.interface";
import { UseMaterialRoomM } from "../../domain/models/useMaterialRoom";
import { UseMaterialRoom } from "../../infrastructure/entities/UseMaterialRoom.entity";
import { IRoomRepository } from "../../domain/repositories/roomRepository.interface";
import { IMaterialRepository } from "../../domain/repositories/materialRepository.interface";
import { NotFoundException } from "@nestjs/common";
import { PaginateQuery, Paginated } from "nestjs-paginate";


export class UseMaterialRoomUseCase {
    constructor(
        private readonly materialRoomRepository: IUseMaterialRoomRepository,
        private readonly materialRepository: IMaterialRepository,
        private readonly roomRepository: IRoomRepository,
        ) { }
        
    async insert(useMaterialRoomM: UseMaterialRoomM, idRoom: string, idMaterial: string) : Promise<any>{
        let room=await this.roomRepository.getRoom(idRoom);
        if (!room) {
            throw new NotFoundException("No room found");
        }
        let material=await this.materialRepository.getMaterial(idMaterial);
        if (!material) {
            throw new NotFoundException("No material found");
        }
        return await this.materialRoomRepository.insert(useMaterialRoomM, room, material);
    }
        
    async delete(roomId: string, materialId : string) : Promise<any>{
        return await this.materialRoomRepository.delete(roomId, materialId);
    }

    async get(roomId: string, materialId : string): Promise<UseMaterialRoomM>{
        return await this.materialRoomRepository.get(roomId, materialId);
    }

    async getAll(query: PaginateQuery) : Promise<Paginated<UseMaterialRoom>> {
        return await this.materialRoomRepository.getAll(query);     
    }

    async update(useMaterialRoomM:UseMaterialRoomM): Promise<any> {
        const useMaterialRoom = this.toUseMaterialRoomM(useMaterialRoomM);
        return await this.materialRoomRepository.update(useMaterialRoom);
    }

    toUseMaterialRoomM(useMaterialRoomM : UseMaterialRoomM) : UseMaterialRoom{
    return{
        roomId: useMaterialRoomM.material.id,
        materialId: useMaterialRoomM.room.id,
        number: useMaterialRoomM.number,
        room: useMaterialRoomM.room,
        material: useMaterialRoomM.material,

    }
   }
}