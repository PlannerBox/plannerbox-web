import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { AuthController } from './auth/auth.controller';
import { UserManagementController } from './userManagement/userManagement.controller';
import { PlaceController } from './placeManagement/place.controller';
import { RoomController } from './roomManagement/room.controller';
import { MaterialController } from './MaterialManagement/material.controller';
import { UseMaterialRoomController } from './useMaterialRoomManagement/useMaterialRoom.controller';
import { GroupManagementController } from './groupManagement/groupManagement.controller';
import { SkillManagementController } from './skillManagement/skillManagement.controller';
import { EventManagementController } from './eventManagement/eventManagement.controller';
@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [AuthController, UserManagementController, PlaceController, RoomController, MaterialController, UseMaterialRoomController,GroupManagementController, SkillManagementController, EventManagementController],

})
export class ControllersModule {}
