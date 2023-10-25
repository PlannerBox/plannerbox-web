import { PaginateQuery, Paginated } from "nestjs-paginate";
import { MaterialM } from "../models/material";


export interface IMaterialRepository {
    getMaterial(id: string): Promise<MaterialM>;
    deleteMaterial(id: string);
    insertMaterial(place: MaterialM);
    getAllMaterial(query: PaginateQuery) : Promise<Paginated<MaterialM>>;
    updateMaterial(placeM:MaterialM);
}