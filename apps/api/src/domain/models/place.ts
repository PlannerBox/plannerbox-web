import { Room } from "../../infrastructure/entities/Room.entity";


export class PlaceM {
    id?: string;
    city: string;
    street: string;
    streetNumber: string;
    room?: Room[];
}
