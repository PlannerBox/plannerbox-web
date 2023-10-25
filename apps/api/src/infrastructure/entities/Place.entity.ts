import { Column, Entity, Index, IntegerType, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "./Room.entity";


@Index('Place_pkey', ['id'], { unique: true })
@Entity('Place', { schema: 'public' })
export class Place {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Column('character varying', {name: 'city', length: 255 })
    city: string;

    @Column('character varying', { name: 'street', length: 255 })
    street: string;

    @Column('character varying', { name: 'streetNumber', length: 255 })
    streetNumber: string;

    @OneToMany(() => Room, (room) => room)
    @JoinColumn([{ name: 'roomId', referencedColumnName: 'id' }])
    room?: Room[];
}