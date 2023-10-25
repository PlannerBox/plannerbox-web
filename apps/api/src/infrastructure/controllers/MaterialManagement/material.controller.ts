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
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { HasRole } from '../../decorators/has-role.decorator';
import Role from '../../../domain/models/enums/role.enum';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { RoomM } from '../../../domain/models/room';
import { MaterialUseCase } from '../../../usecases/material/material.usecase';
import { MaterialM } from '../../../domain/models/material';
import { MaterialDto } from './materialDto.class';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
  
  @Controller('material')
  @ApiTags('material')
  @ApiResponse({
    status: 401,
    description: 'No authorization token was found',
  })
  @ApiResponse({ status: 500, description: 'Internal error' })
  export class MaterialController {
    constructor(
      @Inject(UsecasesProxyModule.MATERIAL_MANAGEMENT_PROXY)
      private readonly materialUseCaseProxy: UseCaseProxy<MaterialUseCase>,
    ) {}
  
    @Post('insert')
    @HasPermissions(UsersPermissions.Add)
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @ApiBody({ type: MaterialDto })
    @HttpCode(201)
    @ApiResponse({
        status: 201,
        description: 'Insert material',
    })
    @ApiResponse({
        status: 400,
        description: 'No material found',
    })
    @ApiOperation({ description: 'insert' })
    async insertMaterial(@Body() material: MaterialDto) { 
      await this.materialUseCaseProxy.getInstance().insertMaterial(material);  
    }

    @Delete('delete')
    @HasRole(Role.Admin)
    @HasPermissions(UsersPermissions.Delete)
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @HttpCode(204)
    @ApiResponse({
        status: 204,
        description: 'Delete material',
    })
    @ApiResponse({
        status: 400,
        description: 'No material found',
    })
    @ApiOperation({ description: 'Delete material' })
    async deleteRoom(@Query('id') id: string) {
      await this.materialUseCaseProxy.getInstance().deleteMaterial(id);
    }
    @Get('getOne')
    @HasPermissions(UsersPermissions.Read)
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @HttpCode(200)
    @ApiResponse({
        status: 200,
        description: 'Details of one material',
        type: MaterialDto
    })
    @ApiResponse({
        status: 400,
        description: 'No material found',
    })
    @ApiOperation({ description: 'Get one material' })
    async getPlace(@Query('id') id: string) : Promise<MaterialM>{
      return await this.materialUseCaseProxy.getInstance().getMaterial(id);
    }
    // @Get('getAll')
    // @HasPermissions(UsersPermissions.ReadAll)
    // @HttpCode(200)
    // @ApiResponse({
    //     status: 200,
    //     description: 'Details of materials',
    //     type: MaterialDto
    // })
    // @ApiResponse({
    //     status: 400,
    //     description: 'No material found',
    // })
    // @UseGuards(JwtAuthGuard, PermissionsGuard)
    // @ApiOperation({ description: 'Get materials' })
    // async getAllPlace() : Promise<MaterialM[]> {
    //   return await this.materialUseCaseProxy.getInstance().getAllMaterial();
    // }
    @Get('getAll')
    @HasPermissions(UsersPermissions.ReadAll)
    @HttpCode(200)
    @ApiResponse({
        status: 200,
        description: 'Details of materials',
        type: MaterialDto
    })
    @ApiResponse({
        status: 400,
        description: 'No material found',
    })
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @ApiOperation({ description: 'Get list paginated materials' })
    async getAllPlace(@Paginate() query: PaginateQuery) : Promise<any> {
      return await this.materialUseCaseProxy.getInstance().getAllMaterial(query);
    }
    @Post('update')
    @HasRole(Role.Admin)
    @HasPermissions(UsersPermissions.Update)
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @HttpCode(204)
    @ApiResponse({
        status: 204,
        description: 'Update material',
    })
    @ApiResponse({
        status: 400,
        description: 'No material found',
    })
    @ApiBody({ type: MaterialDto })
    @ApiOperation({ description: 'update material' })
    async updatePlace(@Body() materialM: MaterialM, @Req() request: any) {
      await this.materialUseCaseProxy.getInstance().updateMaterial(materialM);
    }
   
  }
  