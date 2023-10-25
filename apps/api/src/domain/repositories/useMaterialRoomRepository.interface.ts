import { PaginateQuery, Paginated } from "nestjs-paginate";
import { UseMaterialRoom } from "../../infrastructure/entities/UseMaterialRoom.entity";
import { MaterialM } from "../models/material";
import { RoomM } from "../models/room";
import { UseMaterialRoomM } from "../models/useMaterialRoom";

export interface IUseMaterialRoomRepository{
    delete(roomId: string, materialId: string): Promise<any>;
    get(roomId: string, materialId: string): Promise<UseMaterialRoomM>;
    getAll(query: PaginateQuery) : Promise<Paginated<UseMaterialRoom>>;
    update(useMaterialRoomM: UseMaterialRoom): Promise<any>;
    insert(useMaterialRoom: UseMaterialRoomM, room: RoomM, material: MaterialM): Promise<any>;
}