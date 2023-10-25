import { PlaceM } from "../models/place";

export interface IPlaceRepository {
    getPlace(id: string): Promise<PlaceM>;
    deletePlace(id: string): Promise<any>;
    insertPlace(place: PlaceM): Promise<any>;
    getAllPlace(): Promise<PlaceM[]>;
    updatePlace(placeM:PlaceM): Promise<any>;
}