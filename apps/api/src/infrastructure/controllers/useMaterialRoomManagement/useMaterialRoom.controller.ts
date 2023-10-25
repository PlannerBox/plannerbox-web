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
import { HasRole } from '../../decorators/has-role.decorator';
import Role from '../../../domain/models/enums/role.enum';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { RoomM } from '../../../domain/models/room';
import { MaterialUseCase } from '../../../usecases/material/material.usecase';
import { MaterialM } from '../../../domain/models/material';
import { UseMaterialRoomDto } from './useMaterialRoomDto.class';
import { UseMaterialRoomUseCase } from '../../../usecases/material/useMaterialRoom.usecase';
import { UseMaterialRoomM } from '../../../domain/models/useMaterialRoom';
import { JsonResult } from '../../helpers/JsonResult';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
  
  @Controller('useMaterialRoom')
  @ApiTags('useMaterialRoom')
  @ApiResponse({
    status: 401,
    description: 'No authorization token was found',
  })
  @ApiResponse({ status: 500, description: 'Internal error' })
  export class UseMaterialRoomController {
    constructor(
      @Inject(UsecasesProxyModule.USE_MATERIAL_ROOM_MANAGEMENT_PROXY)
      private readonly useMaterialRoomUseCaseProxy: UseCaseProxy<UseMaterialRoomUseCase>,
    ) {}
  
    @Post('insert/:idRoom/:idMaterial')
    @HasPermissions(UsersPermissions.Add)
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @ApiBody({ type: UseMaterialRoomDto })
    @ApiOperation({ description: 'insert' })
    async insertRoom(@Body() useMaterialRoom: UseMaterialRoomM, @Param('idRoom') idRoom: string, @Param('idMaterial') idMaterial: string) : Promise<any>{ 
      await this.useMaterialRoomUseCaseProxy.getInstance().insert(useMaterialRoom, idRoom, idMaterial);  
      return JsonResult.Convert("Material successfully added on room");
    }

    @Delete('delete')
    @HasRole(Role.Admin)
    @HasPermissions(UsersPermissions.Delete)
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @HttpCode(204)
    @ApiResponse({
        status: 204,
        description: 'Delete material on room',
    })
    @ApiResponse({
        status: 400,
        description: 'No material on room found',
    })
    @ApiOperation({ description: 'delete material on room' })
    async deleteRoom(@Query('roomId') roomId: string, @Query('materialId') materialId: string) : Promise<any>{
      await this.useMaterialRoomUseCaseProxy.getInstance().delete(roomId,materialId);
      return JsonResult.Convert("Material successfully removed on room");
    }
    @Get('getOne')
    @HasPermissions(UsersPermissions.Read)
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @HttpCode(200)
    @ApiResponse({
        status: 200,
        description: 'Get one material on room',
        type: UseMaterialRoomDto
    })
    @ApiResponse({
        status: 400,
        description: 'No material on room found',
    })
    @ApiOperation({ description: 'Get one material on room' })
    async getPlace(@Query('roomId') roomId: string, @Query('materialId') materialId: string) : Promise<UseMaterialRoomM>{
      return await this.useMaterialRoomUseCaseProxy.getInstance().get(roomId,materialId);
    }
    @Get('getAll')
    @HasPermissions(UsersPermissions.ReadAll)
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @HttpCode(200)
    @ApiResponse({
        status: 200,
        description: 'Get all material',
        type: UseMaterialRoomDto
    })
    @ApiResponse({
        status: 400,
        description: 'No material on room found',
    })
    @ApiOperation({ description: 'Get all material' })
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'the page number to return' }) 
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'the number of items per page' })
    @ApiQuery({ name: 'filter.name', required: false, type: String, description: 'add a filter (check nestjs paginate doc for more details). You can filter by roomId, materialId,number, room.name, material.name, room.place.city, room.place.street, room.place.streetNumber' })   
    async getAllPlace(@Paginate() query: PaginateQuery) : Promise<Paginated<any>> {
      return await this.useMaterialRoomUseCaseProxy.getInstance().getAll(query);
    }
    @Post('update')
    @HasRole(Role.Admin)
    @HasPermissions(UsersPermissions.Update)
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @HttpCode(204)
    @ApiResponse({
        status: 204,
        description: 'Update material on room',
    })
    @ApiResponse({
        status: 400,
        description: 'No material on room found',
    })
    @ApiBody({ type: UseMaterialRoomDto })
    @ApiOperation({ description: 'Update material on room' })
    async updatePlace(@Body() useMaterialRoom: UseMaterialRoomM, @Req() request: any) : Promise<any>{
      await this.useMaterialRoomUseCaseProxy.getInstance().update(useMaterialRoom);
      return JsonResult.Convert("Material successfully updated on room");
    }
   
  }
  