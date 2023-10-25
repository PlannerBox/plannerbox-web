import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { UseMaterialRoom } from "../../entities/UseMaterialRoom.entity";

export class MaterialDto {
  @ApiProperty()
  readonly id?: string;

  @IsNotEmpty({ message: 'Name can not be empty' })
  @ApiProperty({ required: true })
  @IsString()
  readonly name: string;

  @ApiProperty({ required: true })
  readonly useMaterialRoom: UseMaterialRoom[];

}