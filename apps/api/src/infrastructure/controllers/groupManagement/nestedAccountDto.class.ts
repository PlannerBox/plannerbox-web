import { ApiProperty } from "@nestjs/swagger";

export class NestedAccountDto {
    @ApiProperty({ type: String, description: 'Account id' })
    id: string;

    @ApiProperty({ type: String, description: 'Account username' })
    username: string;

    @ApiProperty({ type: String, description: 'Account firstname' })
    firstname: string;

    @ApiProperty({ type: String, description: 'Account lastname' })
    lastname: string;
}