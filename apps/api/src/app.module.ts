import { Module } from '@nestjs/common';
import { ControllersModule } from './infrastructure/controllers/controllers.module';
import { UsecasesProxyModule } from './infrastructure/usecases-proxy/usecases-proxy.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { BcryptModule } from './infrastructure/services/bcrypt/bcrypt.module';
import { JwtModule as JwtServiceModule } from './infrastructure/services/jwt/jwt.module';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { LocalStrategy } from './infrastructure/common/strategies/local.strategy';
import { JwtStrategy } from './infrastructure/common/strategies/jwt.strategy';
import { JwtRefreshTokenStrategy } from './infrastructure/common/strategies/jwtRefresh.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    LoggerModule,
    UsecasesProxyModule.register(),
    ControllersModule,
    BcryptModule,
    JwtServiceModule,
    EnvironmentConfigModule,
  ],
  providers: [LocalStrategy, JwtStrategy, JwtRefreshTokenStrategy],
})
export class AppModule {}
