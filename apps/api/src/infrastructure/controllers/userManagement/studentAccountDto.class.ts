import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import FormationMode from "../../../domain/models/enums/formationMode.enum";
import { UserAccountWithoutPasswordDto } from "./userAccountDto.class";

export class StudentAccountDetailedDto extends UserAccountWithoutPasswordDto {
    
    @ApiProperty({ required: true, type: String })
    @IsNotEmpty({ message: 'L\'id de l\'étudiant ne peut pas être vide' })
    readonly studentId: string

    @ApiProperty({ required: true, enum: FormationMode, enumName: 'FormationMode' })
    @IsNotEmpty({ message: 'Le mode de formation ne peut pas être vide' })
    readonly formationMode: FormationMode;
}

