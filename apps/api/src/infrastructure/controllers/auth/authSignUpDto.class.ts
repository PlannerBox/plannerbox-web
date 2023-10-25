import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { FormationMode } from '../../../domain/models/enums/formationMode.enum';
import Role from '../../../domain/models/enums/role.enum';

export class AuthPasswordDto {
  @ApiProperty({ required: true, minLength: 10 })
  @IsNotEmpty({ message: 'Le mot de passe ne peut pas être vide' })
  @IsString({ message: 'Le mot de passe doit être une chaîne de caractères' })
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{10,})(?!.*(.)\1{2,})/, { message: 'Mot de passe trop faible' })
  readonly password: string;
}

export class AuthSignUpDto extends AuthPasswordDto {
  @IsNotEmpty({ message: "L'email ne peut pas être vide" })
  @IsEmail({}, { message: "Le format de l'email est incorrect" })
  @ApiProperty({ required: true, format: 'email', maxLength: 255 })
  readonly username: string;

  @ApiProperty({ required: true, maxLength: 50, format: 'string' })
  @IsNotEmpty({ message: 'Le prénom ne peut pas être vide' })
  @MaxLength(50, { message: 'Le prénom est trop long, 50 caractères maximum' })
  @IsString({ message: 'Le prénom doit être une chaîne de caractères' })
  readonly firstname: string;

  @ApiProperty({ required: true, maxLength: 50, format: 'string' })
  @IsNotEmpty({ message: 'Le nom ne peut pas être vide' })
  @MaxLength(50, { message: 'Le nom est trop long, 50 caractères maximum' })
  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  readonly lastname: string;

  @ApiProperty({ required: true, format: 'date' })
  @IsNotEmpty({ message: 'La date de naissance ne peut pas être vide' })
  @IsDateString({}, { message: 'La date de naissance doit être une date' })
  readonly birthDate: Date;

  @ApiProperty({ required: true, maxLength: 50, format: 'string' })
  @IsString({
    message: 'Le lieu de naissance doit être une chaîne de caractères',
  })
  @MaxLength(50, {
    message: 'Le lieu de naissance est trop long, 50 caractères maximum',
  })
  @IsNotEmpty({ message: 'Le lieu de naissance ne peut pas être vide' })
  readonly birthPlace: string;

  @ApiProperty({ required: true, enum: Role, enumName: 'Role' })
  @IsNotEmpty({ message: 'Le rôle ne peut pas être vide' })
  readonly role: Role;

  @ApiProperty({ required: false, enum: FormationMode, enumName: 'FormationMode' })
  readonly formationMode?: FormationMode;

  // Ajouter la liste des groupes (ids) dans lequel ajouter le nouveau compte (key: groups)
  // - si formateur interne/externe, mettre isOwner à true
  // - si admin ignorer
  // - si student, mettre isOwner à false
}
