import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Inject,
    Param,
    Post,
    Query,
    Req,
    UseGuards,
  } from '@nestjs/common';
  import {
    ApiBearerAuth,
    ApiBody,
    ApiExtraModels,
    ApiOperation,
    ApiQuery,
    ApiResponse,
    ApiTags,
  } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwtAuth.guard';
import { HasPermissions } from '../../decorators/has-permissions.decorator';
import UsersPermissions from '../../../domain/models/enums/usersPermissions.enum';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { RoomDto } from './roomDto.class';
import { HasRole } from '../../decorators/has-role.decorator';
import Role from '../../../domain/models/enums/role.enum';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { PlaceUseCase } from '../../../usecases/place/place.usecase';
import { RoomM } from '../../../domain/models/room';
import { RoomUseCase } from '../../../usecases/room/room.usecase';
import { json } from 'stream/consumers';
import { JsonResult } from '../../helpers/JsonResult';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { Room } from '../../entities/Room.entity';
  
  @Controller('room')
  @ApiTags('room')
  @ApiResponse({
    status: 401,
    description: 'No authorization token was found',
  })
  @ApiResponse({ status: 500, description: 'Internal error' })
  export class RoomController {
    constructor(
      @Inject(UsecasesProxyModule.PLACE_MANAGEMENT_PROXY)
      private readonly placeUseCaseProxy: UseCaseProxy<PlaceUseCase>,
      @Inject(UsecasesProxyModule.ROOM_MANAGEMENT_PROXY)
      private readonly roomUseCaseProxy: UseCaseProxy<RoomUseCase>,
    ) {}
  
    @Post('insert/:idPlace')
    @HasPermissions(UsersPermissions.Add)
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @HttpCode(201)
    @ApiResponse({
        status: 201,
        description: 'Room successfully added',
    })
    @ApiResponse({
        status: 404,
        description: 'Room not found',
    })
    @ApiBody({ type: RoomDto })
    @ApiOperation({ description: 'insert' })
    async insertRoom(@Body() room: RoomM, @Param('idPlace') idPlace: string) { 
      await this.roomUseCaseProxy.getInstance().insertRoom(room, idPlace); 
      return JsonResult.Convert("Room successfully added"); 
    }

    @Delete('delete')
    @HasRole(Role.Admin)
    @HasPermissions(UsersPermissions.Delete)
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @HttpCode(204)
    @ApiResponse({
        status: 204,
        description: 'Room successfully deleted',
    })
    @ApiResponse({
        status: 404,
        description: 'Room not found',
    })
    @ApiOperation({ description: 'delete room' })
    async deleteRoom(@Query('id') id: string) {
      await this.roomUseCaseProxy.getInstance().deleteRoom(id);
      return JsonResult.Convert("Room successfully removed");
    }
    @Get('getOne')
    @HasPermissions(UsersPermissions.Read)
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @HttpCode(200)
    @ApiResponse({
        status: 200,
        description: 'Returns details of a room',
        type: RoomDto,
    })
    @ApiResponse({
        status: 400,
        description: 'No room found',
    })
    @ApiOperation({ description: 'Get one room' })
    async getRoom(@Query('id') id: string) : Promise<RoomM>{
      return await this.roomUseCaseProxy.getInstance().getRoom(id);
    }
    @Get('getfilter')
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'the page number to return' }) 
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'the number of items per page' })
    @ApiQuery({ name: 'filter.name', required: false, type: String, description: 'add a filter (check nestjs paginate doc for more details). You can filter by id, name, place.city,place.street, place.streetNumber' })
    @HasPermissions(UsersPermissions.ReadAll)
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @HttpCode(200)
    @ApiResponse({
        status: 200,
        description: 'Returns details of rooms',
        type: RoomDto,
    })
    @ApiResponse({
        status: 400,
        description: 'No room found',
    })
    @ApiOperation({ description: 'Get rooms paginate with filtering' })
    async getAllRoom(@Paginate() query: PaginateQuery) : Promise<Paginated<any>> {
      return await this.roomUseCaseProxy.getInstance().getAllRoom(query);
    }
    @Post('update')
    @HasRole(Role.Admin)
    @HasPermissions(UsersPermissions.Update)
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @HttpCode(204)
    @ApiResponse({
        status: 204,
        description: 'Room successfully updated',
    })
    @ApiResponse({
        status: 404,
        description: 'Room not found',
    })
    @ApiBody({ type: RoomDto })
    @ApiOperation({ description: 'Update room' })
    async updateRoom(@Body() room: RoomM, @Req() request: any) {
      await this.roomUseCaseProxy.getInstance().updateRoom(room);
      return JsonResult.Convert("Room successfully updated");
    }
   
  }
  