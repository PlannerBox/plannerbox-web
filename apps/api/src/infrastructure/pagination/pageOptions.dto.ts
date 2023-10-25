import { ApiPropertyOptional } from "@nestjs/swagger";
import { Order } from "../../domain/models/enums/order.enum";
import { IsEnum, IsNumber, IsOptional } from "class-validator";
import { Transform, Type } from "class-transformer";

export class PageOptionsDto {
    
    @ApiPropertyOptional({ enum: Order, default: Order.ASC })
    @IsEnum(Order)
    @IsOptional()
    readonly order? : Order = Order.ASC;

    @ApiPropertyOptional({ default: 1, minimum: 1 })
    @IsOptional()
    @Type(() => Number)
    readonly page? : number = 1;

    @ApiPropertyOptional({ default: 10, minimum: 1, maximum: 100 })
    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsNumber()
    readonly take? : number = 10;

    get skip(): number {
        return (this.page - 1) * this.take;
    }
}