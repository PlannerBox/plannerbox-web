import { Column, Entity, Index, IntegerType, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Place } from "./Place.entity";
import { Material } from "./Material.entity";
import { Room } from "./Room.entity";


@Index('UseMaterialRoom_pkey', ['roomId','materialId'], { unique: true })
@Entity('UseMaterialRoom', { schema: 'public' })
export class UseMaterialRoom {

    @Column('uuid', { primary: true, name: 'roomId' })
    roomId: string;

    @Column('uuid', { primary: true, name: 'materialId' })
    materialId: string;

    @Column('integer')
    number: IntegerType;

    @ManyToOne(() => Room, (room) => room, { eager: true },)
    @JoinColumn([{ name: 'roomId', referencedColumnName: 'id' }])
    room: Room;

    @ManyToOne(() => Material, (place) => place, { eager: true },)
    @JoinColumn([{ name: 'materialId', referencedColumnName: 'id' }])
    material: Material;
}