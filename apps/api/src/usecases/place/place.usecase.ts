import { ILogger } from "../../domain/logger/logger.interface";
import { PlaceM } from "../../domain/models/place";
import { Place } from "../../infrastructure/entities/Place.entity";
import { IRoomRepository } from "../../domain/repositories/roomRepository.interface";
import { IPlaceRepository } from "../../domain/repositories/placeRepository.interface";
import { PlaceDto } from "../../infrastructure/controllers/placeManagement/placeDto.class";


export class PlaceUseCase {
    constructor(
        private readonly placeRepository: IPlaceRepository,
        private readonly roomRepository: IRoomRepository,
        ) { }
        
    async insertPlace(place: PlaceDto) : Promise<any>{
        return await this.placeRepository.insertPlace(place);
    }
        
    async deletePlace(id: string): Promise<any> {
        return await this.placeRepository.deletePlace(id);
    }

    async getPlace(id: string): Promise<PlaceM>{
        return await this.placeRepository.getPlace(id);
    }

    async getAllPlace() : Promise<PlaceM[]> {
        return await this.placeRepository.getAllPlace();     
    }

    async updatePlace(placeM:PlaceM) : Promise<any>{
        const place = this.toPlace(placeM);
        return await this.placeRepository.updatePlace(place);
    }

    toPlace(placeM : PlaceM) : Place{
    return{
        id:placeM.id,
        city: placeM.city,
        street: placeM.street,
        streetNumber: placeM.streetNumber,
        room: placeM.room,
    }
   }
}