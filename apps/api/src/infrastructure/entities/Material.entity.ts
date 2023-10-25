import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Place } from "./Place.entity";
import { UseMaterialRoom } from "./UseMaterialRoom.entity";


@Index('Material_pkey', ['id'], { unique: true })
@Entity('Material', { schema: 'public' })
export class Material {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id?: string;

    @Column('character varying', { name: 'name', length: 255 })
    name: string;

    @OneToMany(() => UseMaterialRoom, (useMaterialRoom) => useMaterialRoom.material, { cascade: true })
    useMaterialRoom: UseMaterialRoom[];
}