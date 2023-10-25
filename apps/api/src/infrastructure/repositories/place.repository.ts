import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Place } from "../entities/Place.entity";
import { IPlaceRepository } from "../../domain/repositories/placeRepository.interface";
import { PlaceM } from "../../domain/models/place";
import { Room } from "../entities/Room.entity";
import { PlaceDto } from "../controllers/placeManagement/placeDto.class";

@Injectable()
export class PlaceRepository implements IPlaceRepository {
    constructor(
        @InjectRepository(Place)
        private readonly placeRepository: Repository<Place>,
        @InjectRepository(Room)
        private readonly roomRepository: Repository<Room>
    ) {}

    async getPlace(id: string): Promise<PlaceM> {
        return await this.placeRepository.findOneBy({id:id});
    }
    async getAllPlace(): Promise<PlaceM[]> {
        return await this.placeRepository.find();
    }

    async updatePlace(placeM:PlaceM) : Promise<any>{
        const place=this.toPlaceEntity(placeM);
        return await this.placeRepository.update(place.id, place)
    }
   
   async insertPlace(placeM:PlaceM) : Promise<any> {
        const place=this.toPlaceEntity(placeM);
        return await this.placeRepository.insert(place);
    
   }
   async deletePlace(id: string) : Promise<any>{
        return await this.placeRepository.delete({id : id})
   }

   toPlaceEntity(placeM:PlaceM) : Place {
        return{
            id: placeM.id,
            city: placeM.city,
            street: placeM.street,
            streetNumber: placeM.streetNumber,
            room: placeM.room,
        }
   }
}