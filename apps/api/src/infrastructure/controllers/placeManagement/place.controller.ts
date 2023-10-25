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
    ApiResponse,
    ApiTags,
  } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwtAuth.guard';
import { HasPermissions } from '../../decorators/has-permissions.decorator';
import UsersPermissions from '../../../domain/models/enums/usersPermissions.enum';
import { PlaceDto } from './placeDto.class';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { PlaceUseCase } from '../../../usecases/place/place.usecase';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { RoomUseCase } from '../../../usecases/room/room.usecase';
import Role from '../../../domain/models/enums/role.enum';
import { HasRole } from '../../decorators/has-role.decorator';
import { PlaceM } from '../../../domain/models/place';
import { JsonResult } from '../../helpers/JsonResult';
  
  @Controller('place')
  @ApiTags('place')
  @ApiResponse({
    status: 401,
    description: 'No authorization token was found',
  })
  @ApiResponse({ status: 500, description: 'Internal error' })
  export class PlaceController {
    constructor(
      @Inject(UsecasesProxyModule.PLACE_MANAGEMENT_PROXY)
      private readonly placeUseCaseProxy: UseCaseProxy<PlaceUseCase>,
      @Inject(UsecasesProxyModule.LOGIN_USECASES_PROXY)
      private readonly roomUsecaseProxy: UseCaseProxy<RoomUseCase>,
    ) {}
  
    @Post('insert')
    @HasRole(Role.Admin)
    @HasPermissions(UsersPermissions.Add)
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @HttpCode(201)
    @ApiResponse({
        status: 201,
        description: 'Place successfully added',
    })
    @ApiResponse({
        status: 400,
        description: 'No place found',
    })
    @ApiBody({ type: PlaceDto })
    @ApiOperation({ description: 'Insert place' })
    async insertPlace(@Body() place: PlaceDto, @Req() request: any) {
        await this.placeUseCaseProxy.getInstance().insertPlace(place);
        return JsonResult.Convert("Place successfully added");
    }

    @Delete('delete')
    @HasRole(Role.Admin)
    @HasPermissions(UsersPermissions.Delete)
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @HttpCode(204)
    @ApiResponse({
        status: 204,
        description: 'Place successfully deleted',
    })
    @ApiResponse({
        status: 400,
        description: 'No place found',
    })
    @ApiOperation({ description: 'Delete place' })
    async deletePlace(@Query('id') id: string) {
      await this.placeUseCaseProxy.getInstance().deletePlace(id);
      return JsonResult.Convert("Place successfully removed");
    }
    @Get('getOne')
    @HasPermissions(UsersPermissions.Read)
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @HttpCode(200)
    @ApiResponse({
        status: 200,
        description: 'Details of one place',
        type: PlaceDto
    })
    @ApiResponse({
        status: 400,
        description: 'No place found',
    })
    @ApiOperation({ description: 'Get One place' })
    async getPlace(@Query('id') id: string) : Promise<PlaceM>{
      return await this.placeUseCaseProxy.getInstance().getPlace(id);
    }
    @Get('getAll')
    @HasPermissions(UsersPermissions.ReadAll)
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @HttpCode(200)
    @ApiResponse({
        status: 200,
        description: 'Details of places',
        type: PlaceDto
    })
    @ApiResponse({
        status: 400,
        description: 'No place found',
    })
    @ApiOperation({ description: 'Get places' })
    async getAllPlace() : Promise<PlaceM[]> {
      return await this.placeUseCaseProxy.getInstance().getAllPlace();
    }
    @Post('update')
    @HasRole(Role.Admin)
    @HasPermissions(UsersPermissions.Update)
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @ApiBody({ type: PlaceDto })
    @HttpCode(204)
    @ApiResponse({
        status: 204,
        description: 'Update place',
    })
    @ApiResponse({
        status: 400,
        description: 'No place found',
    })
    @ApiOperation({ description: 'update place' })
    async updatePlace(@Body() place: PlaceM, @Req() request: any) {
      await this.placeUseCaseProxy.getInstance().updatePlace(place);
      return JsonResult.Convert("Place successfully updated");
    }
   
  }
  