import { IntegerType } from "typeorm";
import { Room } from "../../infrastructure/entities/Room.entity";
import { Material } from "../../infrastructure/entities/Material.entity";



export class UseMaterialRoomM{
    number : IntegerType;
    room : Room;
    material: Material;
}