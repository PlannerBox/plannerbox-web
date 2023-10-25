import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { UserAccountWithoutPasswordDto } from "./userAccountDto.class";

export class TeacherAccountDetailedDto extends UserAccountWithoutPasswordDto {
    @ApiProperty({ required: true, type: String })
    @IsNotEmpty({ message: 'L\'id de l\'enseignant ne peut pas être vide' })
    readonly teacherId: string;

    @ApiProperty({ required: true, type: Boolean })
    @IsNotEmpty({ message: 'Le statut de l\'enseignant ne peut pas être vide' })
    readonly intern: boolean;
}