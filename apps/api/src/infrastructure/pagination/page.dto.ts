import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";
import { PageMetaDto } from "./pageMeta.dto";

export class PageDto<T> {
    @IsArray({message: 'data doit être un tableau'})
    @ApiProperty({ isArray: true })
    readonly data: T[];

    @ApiProperty({ type: () => PageMetaDto })
    readonly meta: PageMetaDto;

    constructor(data: T[], meta: PageMetaDto) {
        this.data = data;
        this.meta = meta;
    }
}