import { DynamicModule, Module } from '@nestjs/common';

import { LoggerModule } from '../logger/logger.module';

import { RepositoriesModule } from '../repositories/repositories.module';

import { IsAuthenticatedUseCases } from '../../usecases/auth/isAuthenticated.usecases';
import { LoginUseCases } from '../../usecases/auth/login.usecases';
import { LogoutUseCases } from '../../usecases/auth/logout.usecases';
import { SignUpUseCases } from '../../usecases/auth/signUp.usecases';
import { UpdateAccountUseCase } from '../../usecases/account/updateAccount.usecase';

import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { EnvironmentConfigService } from '../config/environment-config/environment-config.service';
import { LoggerService } from '../logger/logger.service';
import { AccountRepository } from '../repositories/account.repository';
import { BcryptModule } from '../services/bcrypt/bcrypt.module';
import { BcryptService } from '../services/bcrypt/bcrypt.service';
import { JwtModule } from '../services/jwt/jwt.module';
import { JwtTokenService } from '../services/jwt/jwt.service';
import { UseCaseProxy } from './usecases-proxy';
import { ResetPasswordUseCases } from '../../usecases/auth/resetPassword.usecases';
import { AccountManagementUseCases } from '../../usecases/auth/accountManagement.usecases';
import { AdminRepository } from '../repositories/admin.repository';
import { RolePermissionsRepository } from '../repositories/rolePermissions.repository';
import { PlaceRepository } from '../repositories/place.repository';
import { RoomRepository } from '../repositories/room.repository';
import { PlaceUseCase } from '../../usecases/place/place.usecase';
import { RoomUseCase } from '../../usecases/room/room.usecase';
import { MaterialRepository } from '../repositories/material.repository';
import { MaterialUseCase } from '../../usecases/material/material.usecase';
import { UseMaterialRoomRepository } from '../repositories/useMaterialRoom.repository';
import { UseMaterialRoomUseCase } from '../../usecases/material/useMaterialRoom.usecase';
import { StudentRepository } from '../repositories/student.repository';
import { TeacherRepository } from '../repositories/teacher.repository';
import { GroupRepository } from '../repositories/group.repository';
import { GetGroupUseCase } from '../../usecases/group/getGroup.usecase';
import { AddMemberUseCase } from '../../usecases/group/manageMember.usecase';
import { CreateGroupUseCase } from '../../usecases/group/createGroup.usecase';
import { UpdateGroupUseCase } from '../../usecases/group/updateGroup.usecase';
import { GroupMemberRepository } from '../repositories/groupMemberRepository';
import { DeleteGroupUseCase } from '../../usecases/group/deleteGroup.usecase';
import { UpsertSkillUseCase } from '../../usecases/skill/upsertSkill.usecase';
import { SkillRepository } from '../repositories/skill.repository';
import { FindSkillUseCase } from '../../usecases/skill/findSkill.usecase';
import { DeleteSkillUseCase } from '../../usecases/skill/deleteSkill.usecase';
import { PlanTrainingUseCase } from '../../usecases/event/planTraining.usecase';
import { CourseRepository } from '../repositories/course.repository';
import { LinkSkillToTeacherUseCase } from '../../usecases/skill/linkSkillToTeacher.usecase';
import { TeacherSkillsRepository } from '../repositories/teacherSkills.repository';
import { PlanCourseUseCase } from '../../usecases/event/planCourse.usecase';
import { DeleteEventUseCase } from '../../usecases/event/deleteEvent.usecase';
import { UpdateEventUseCase } from '../../usecases/event/updateEvent.usecase';
import { FindEventsUseCase } from '../../usecases/event/findEvents.usecase';

@Module({
  imports: [
    LoggerModule,
    JwtModule,
    BcryptModule,
    EnvironmentConfigModule,
    RepositoriesModule,
  ],
})
export class UsecasesProxyModule {
  // Auth
  static LOGIN_USECASES_PROXY = 'LoginUseCasesProxy';
  static IS_AUTHENTICATED_USECASES_PROXY = 'IsAuthenticatedUseCasesProxy';
  static LOGOUT_USECASES_PROXY = 'LogoutUseCasesProxy';
  static SIGNUP_USECASES_PROXY = 'SignUpUseCasesProxy';
  static RESET_PASSWORD_USECASES_PROXY = 'ResetPasswordUseCasesProxy';

  // AccountManagement
  static ACCOUNT_MANAGEMENT_USECASES_PROXY = 'AccountManagementUseCasesProxy';
  static UPDATE_USER_ACCOUNT_PROXY = 'UpdateAccountUseCasesProxy';
  //Place
  static PLACE_MANAGEMENT_PROXY = 'PlaceManagementProxy';
  static ROOM_MANAGEMENT_PROXY ='RoomManagementProxy';
  //Material
  static MATERIAL_MANAGEMENT_PROXY ='MaterialManagementProxy';
  static USE_MATERIAL_ROOM_MANAGEMENT_PROXY='UseMaterialRoomManagementProxy';

  // GroupManagement
  static GET_GROUP_USECASES_PROXY = 'GetGroupUseCasesProxy';
  static ADD_MEMBER_USECASES_PROXY = 'AddMemberUseCasesProxy';
  static CREATE_GROUP_USECASES_PROXY = 'CreateGroupUseCasesProxy';
  static UPDATE_GROUP_USECASES_PROXY = 'UpdateGroupUseCasesProxy';
  static DELETE_GROUP_USECASES_PROXY = 'DeleteGroupUseCasesProxy';  

  // SkillManagement
  static UPSERT_SKILL_USECASES_PROXY = 'UpsertSkillUseCasesProxy';
  static FIND_SKILL_USECASES_PROXY = 'FindSkillUseCasesProxy';
  static DELETE_SKILL_USECASES_PROXY = 'DeleteSkillUseCasesProxy';
  static LINK_SKILL_TO_TEACHER_USECASES_PROXY = 'LinkSkillToTeacherUseCasesProxy';

  // ScheduleManagement
  static PLAN_TRAINING_USECASES_PROXY = 'PlanTrainingUseCasesProxy';
  static PLAN_COURSE_USECASES_PROXY = 'PlanCourseUseCasesProxy';
  static DELETE_EVENT_USECASES_PROXY = 'DeleteEventUseCasesProxy';
  static UPDATE_EVENT_USECASES_PROXY = 'UpdateEventUseCasesProxy';
  static FIND_EVENTS_USECASES_PROXY = 'FindEventsUseCasesProxy';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [
            LoggerService,
            JwtTokenService,
            EnvironmentConfigService,
            AccountRepository,
            AdminRepository,
            BcryptService,
          ],
          provide: UsecasesProxyModule.LOGIN_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            jwtTokenService: JwtTokenService,
            config: EnvironmentConfigService,
            accountRepository: AccountRepository,
            adminRepository: AdminRepository,
            bcryptService: BcryptService,
          ) =>
            new UseCaseProxy(
              new LoginUseCases(
                logger,
                jwtTokenService,
                config,
                accountRepository,
                adminRepository,
                bcryptService,
              ),
            ),
        },
        {
          inject: [AccountRepository],
          provide: UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
          useFactory: (accountRepository: AccountRepository) =>
            new UseCaseProxy(new IsAuthenticatedUseCases(accountRepository)),
        },
        {
          inject: [],
          provide: UsecasesProxyModule.LOGOUT_USECASES_PROXY,
          useFactory: () => new UseCaseProxy(new LogoutUseCases()),
        },
        {
          inject: [AccountRepository, BcryptService],
          provide: UsecasesProxyModule.SIGNUP_USECASES_PROXY,
          useFactory: (
            accountRepository: AccountRepository,
            bcryptService: BcryptService,
          ) =>
            new UseCaseProxy(
              new SignUpUseCases(accountRepository, bcryptService),
            ),
        },
        {
          inject: [
            LoggerService,
            JwtTokenService,
            EnvironmentConfigService,
            AccountRepository,
            BcryptService,
          ],
          provide: UsecasesProxyModule.RESET_PASSWORD_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            jwtTokenService: JwtTokenService,
            config: EnvironmentConfigService,
            accountRepository: AccountRepository,
            bcryptService: BcryptService,
          ) =>
            new UseCaseProxy(
              new ResetPasswordUseCases(
                logger,
                jwtTokenService,
                config,
                accountRepository,
                bcryptService,
              ),
            ),
        },
        {
          inject: [
            AccountRepository,
            RolePermissionsRepository,
            LoggerService
          ],
          provide: UsecasesProxyModule.ACCOUNT_MANAGEMENT_USECASES_PROXY,
          useFactory: (
            accountRepository: AccountRepository,
            rolePermissionsRepository: RolePermissionsRepository,
            logger: LoggerService
          ) => 
            new UseCaseProxy(
              new AccountManagementUseCases(
                accountRepository,
                rolePermissionsRepository,
                logger
              )
            ),
        },
        {
          inject: [AccountRepository, StudentRepository, AdminRepository, TeacherRepository, BcryptService, LoggerService],
          provide: UsecasesProxyModule.UPDATE_USER_ACCOUNT_PROXY,
          useFactory: (
            accountRepository: AccountRepository,
            studentRepository: StudentRepository,
            adminRepository: AdminRepository,
            teacherRepository: TeacherRepository,
            bcryptService: BcryptService,
            logger: LoggerService
          ) =>
            new UseCaseProxy(
              new UpdateAccountUseCase(accountRepository, studentRepository, adminRepository, teacherRepository, bcryptService, logger)
            ),
        },
        {
          inject: [PlaceRepository, RoomRepository],
          provide: UsecasesProxyModule.PLACE_MANAGEMENT_PROXY,
          useFactory: (
            placeRepository: PlaceRepository,
            roomRepository: RoomRepository
          ) =>
            new UseCaseProxy(
              new PlaceUseCase(placeRepository, roomRepository),
            ),
        },
        {
          inject: [PlaceRepository, RoomRepository],
          provide: UsecasesProxyModule.ROOM_MANAGEMENT_PROXY,
          useFactory: (
            placeRepository: PlaceRepository,
            roomRepository: RoomRepository
          ) =>
            new UseCaseProxy(
              new RoomUseCase(placeRepository, roomRepository),
            ),
        },
        {
          inject: [MaterialRepository],
          provide: UsecasesProxyModule.MATERIAL_MANAGEMENT_PROXY,
          useFactory: (
            materialRepository: MaterialRepository,
          ) =>
            new UseCaseProxy(
              new MaterialUseCase(materialRepository),
            ),
        },
        {
          inject: [UseMaterialRoomRepository,RoomRepository,MaterialRepository],
          provide: UsecasesProxyModule.USE_MATERIAL_ROOM_MANAGEMENT_PROXY,
          useFactory: (
            useMaterialRepository: UseMaterialRoomRepository,
            roomRepository: RoomRepository,
            materialRepository: MaterialRepository
          ) =>
            new UseCaseProxy(
              new UseMaterialRoomUseCase(useMaterialRepository, materialRepository, roomRepository),
            ),
        },
        {
          inject: [GroupRepository, LoggerService],
          provide: UsecasesProxyModule.GET_GROUP_USECASES_PROXY,
          useFactory: (
            groupRepository: GroupRepository,
            logger: LoggerService
          ) =>
            new UseCaseProxy(
              new GetGroupUseCase(groupRepository, logger),
            ),
        },
        {
          inject: [GroupRepository, GroupMemberRepository, AccountRepository, LoggerService],
          provide: UsecasesProxyModule.ADD_MEMBER_USECASES_PROXY,
          useFactory: (
            groupRepository: GroupRepository,
            groupMemberRepository: GroupMemberRepository,
            accountRepository: AccountRepository,
            logger: LoggerService
          ) =>
            new UseCaseProxy(
              new AddMemberUseCase(groupRepository, groupMemberRepository, accountRepository, logger),
            ),
        },
        {
          inject: [GroupRepository, LoggerService],
          provide: UsecasesProxyModule.CREATE_GROUP_USECASES_PROXY,
          useFactory: (
            groupRepository: GroupRepository,
            logger: LoggerService
          ) =>
            new UseCaseProxy(
              new CreateGroupUseCase(groupRepository, logger),
            ),
        },
        {
          inject: [GroupRepository, LoggerService],
          provide: UsecasesProxyModule.UPDATE_GROUP_USECASES_PROXY,
          useFactory: (
            groupRepository: GroupRepository,
            logger: LoggerService
          ) =>
            new UseCaseProxy(
              new UpdateGroupUseCase(groupRepository, logger),
            ),
        },
        {
          inject: [GroupRepository],
          provide: UsecasesProxyModule.DELETE_GROUP_USECASES_PROXY,
          useFactory: (
            groupRepository: GroupRepository
          ) =>
            new UseCaseProxy(
              new DeleteGroupUseCase(groupRepository),
            ),
        },
        {
          inject: [SkillRepository, LoggerService],
          provide: UsecasesProxyModule.UPSERT_SKILL_USECASES_PROXY,
          useFactory: (
            skillRepository: SkillRepository,
            logger: LoggerService
          ) =>
            new UseCaseProxy(
              new UpsertSkillUseCase(skillRepository, logger),
            ),
        },
        {
          inject: [SkillRepository, LoggerService],
          provide: UsecasesProxyModule.FIND_SKILL_USECASES_PROXY,
          useFactory: (
            skillRepository: SkillRepository,
            logger: LoggerService
          ) =>
            new UseCaseProxy(
              new FindSkillUseCase(skillRepository, logger),
            ),
        },
        {
          inject: [SkillRepository, LoggerService],
          provide: UsecasesProxyModule.DELETE_SKILL_USECASES_PROXY,
          useFactory: (
            skillRepository: SkillRepository,
            logger: LoggerService
          ) =>
            new UseCaseProxy(
              new DeleteSkillUseCase(skillRepository, logger),
            ),
        },
        {
          inject: [SkillRepository, AccountRepository, GroupRepository, CourseRepository, RoomRepository],
          provide: UsecasesProxyModule.PLAN_TRAINING_USECASES_PROXY,
          useFactory: (
            skillRepository: SkillRepository,
            accountRepository: AccountRepository,
            groupRepository: GroupRepository,
            courseRepository: CourseRepository,
            roomRepository: RoomRepository,
          ) =>
            new UseCaseProxy(
              new PlanTrainingUseCase(skillRepository, accountRepository, groupRepository, courseRepository, roomRepository),
            ),
        },
        {
          inject: [TeacherRepository, TeacherSkillsRepository],
          provide: UsecasesProxyModule.LINK_SKILL_TO_TEACHER_USECASES_PROXY,
          useFactory: (
            teacherRepository: TeacherRepository,
            teacherSkillsRepository: TeacherSkillsRepository
          ) =>
            new UseCaseProxy(
              new LinkSkillToTeacherUseCase(teacherRepository, teacherSkillsRepository),
            ),
        },
        {
          inject: [SkillRepository, AccountRepository, GroupRepository, CourseRepository, TeacherRepository, RoomRepository],
          provide: UsecasesProxyModule.PLAN_COURSE_USECASES_PROXY,
          useFactory: (
            skillRepository: SkillRepository,
            accountRepository: AccountRepository,
            groupRepository: GroupRepository,
            courseRepository: CourseRepository,
            teacherRepository: TeacherRepository,
            roomRepository: RoomRepository
          ) =>
            new UseCaseProxy(
              new PlanCourseUseCase(skillRepository, accountRepository, groupRepository, courseRepository, teacherRepository, roomRepository),
            ),
        },
        {
          inject: [CourseRepository],
          provide: UsecasesProxyModule.DELETE_EVENT_USECASES_PROXY,
          useFactory: (
            courseRepository: CourseRepository
          ) =>
            new UseCaseProxy(
              new DeleteEventUseCase(courseRepository),
            ),
        },
        {
          inject: [SkillRepository, AccountRepository, GroupRepository, CourseRepository, TeacherRepository, RoomRepository],
          provide: UsecasesProxyModule.UPDATE_EVENT_USECASES_PROXY,
          useFactory: (
            skillRepository: SkillRepository,
            accountRepository: AccountRepository,
            groupRepository: GroupRepository,
            courseRepository: CourseRepository,
            teacherRepository: TeacherRepository,
            roomRepository: RoomRepository
          ) =>
            new UseCaseProxy(
              new UpdateEventUseCase(skillRepository, accountRepository, groupRepository, courseRepository, teacherRepository, roomRepository),
            ),
        },
        {
          inject: [CourseRepository],
          provide: UsecasesProxyModule.DELETE_EVENT_USECASES_PROXY,
          useFactory: (
            courseRepository: CourseRepository
          ) =>
            new UseCaseProxy(
              new DeleteEventUseCase(courseRepository),
            ),
        },
        {
          inject: [CourseRepository],
          provide: UsecasesProxyModule.FIND_EVENTS_USECASES_PROXY,
          useFactory: (
            courseRepository: CourseRepository
          ) =>
            new UseCaseProxy(
              new FindEventsUseCase(courseRepository),
            ),
        },
      ],
      exports: [
        UsecasesProxyModule.ROOM_MANAGEMENT_PROXY,
        UsecasesProxyModule.LOGIN_USECASES_PROXY,
        UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
        UsecasesProxyModule.LOGOUT_USECASES_PROXY,
        UsecasesProxyModule.SIGNUP_USECASES_PROXY,
        UsecasesProxyModule.RESET_PASSWORD_USECASES_PROXY,
        UsecasesProxyModule.ACCOUNT_MANAGEMENT_USECASES_PROXY,
        UsecasesProxyModule.UPDATE_USER_ACCOUNT_PROXY,
        UsecasesProxyModule.PLACE_MANAGEMENT_PROXY,
        UsecasesProxyModule.ROOM_MANAGEMENT_PROXY,
        UsecasesProxyModule.MATERIAL_MANAGEMENT_PROXY,
        UsecasesProxyModule.USE_MATERIAL_ROOM_MANAGEMENT_PROXY,
        UsecasesProxyModule.GET_GROUP_USECASES_PROXY,
        UsecasesProxyModule.ADD_MEMBER_USECASES_PROXY,
        UsecasesProxyModule.CREATE_GROUP_USECASES_PROXY,
        UsecasesProxyModule.UPDATE_GROUP_USECASES_PROXY,
        UsecasesProxyModule.DELETE_GROUP_USECASES_PROXY,
        UsecasesProxyModule.UPSERT_SKILL_USECASES_PROXY,
        UsecasesProxyModule.FIND_SKILL_USECASES_PROXY,
        UsecasesProxyModule.DELETE_SKILL_USECASES_PROXY,
        UsecasesProxyModule.PLAN_TRAINING_USECASES_PROXY,
        UsecasesProxyModule.LINK_SKILL_TO_TEACHER_USECASES_PROXY,
        UsecasesProxyModule.PLAN_COURSE_USECASES_PROXY,
        UsecasesProxyModule.DELETE_EVENT_USECASES_PROXY,
        UsecasesProxyModule.UPDATE_EVENT_USECASES_PROXY,
        UsecasesProxyModule.FIND_EVENTS_USECASES_PROXY,
      ],
    };
  }
}
