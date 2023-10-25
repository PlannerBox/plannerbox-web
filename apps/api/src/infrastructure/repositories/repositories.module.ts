import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { AccountRepository } from './account.repository';
import { Account } from '../entities/Account.entity';
import { AdminRepository } from './admin.repository';
import { Admin } from '../entities/Admin.entity';
import { RolePermissionsRepository } from './rolePermissions.repository';
import { RolePermissions } from '../entities/RolePermissions.entity';
import { Student } from '../entities/Student.entity';
import { Teacher } from '../entities/Teacher.entity';
import { Room } from '../entities/Room.entity';
import { Place } from '../entities/Place.entity';
import { PlaceRepository } from './place.repository';
import { RoomRepository } from './room.repository';
import { Material } from '../entities/Material.entity';
import { UseMaterialRoom } from '../entities/UseMaterialRoom.entity';
import { MaterialRepository } from './material.repository';
import { UseMaterialRoomRepository } from './useMaterialRoom.repository';
import { StudentRepository } from './student.repository';
import { TeacherRepository } from './teacher.repository';
import { Group } from '../entities/Group.entity';
import { GroupRepository } from './group.repository';
import { GroupMembers } from '../entities/GroupMembers.entity';
import { GroupMemberRepository } from './groupMemberRepository';
import { Skill } from '../entities/Skill.entity';
import { SkillRepository } from './skill.repository';
import { Course } from '../entities/Course.entity';
import { CourseRepository } from './course.repository';
import { TeacherSkills } from '../entities/TeacherSkills.entity';
import { TeacherSkillsRepository } from './teacherSkills.repository';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([Account, Admin,  Student, Teacher, Group, GroupMembers, RolePermissions, Place, Material, Room, UseMaterialRoom, Skill, Course, TeacherSkills])],
  providers: [AccountRepository, AdminRepository, StudentRepository, TeacherRepository, GroupRepository, GroupMemberRepository, RolePermissionsRepository, PlaceRepository, RoomRepository, MaterialRepository, UseMaterialRoomRepository, SkillRepository, CourseRepository, TeacherSkillsRepository],
  exports: [AccountRepository, AdminRepository, StudentRepository, TeacherRepository, GroupRepository, GroupMemberRepository, RolePermissionsRepository, PlaceRepository, RoomRepository, MaterialRepository, UseMaterialRoomRepository, SkillRepository, CourseRepository, TeacherSkillsRepository],
})
export class RepositoriesModule {}
