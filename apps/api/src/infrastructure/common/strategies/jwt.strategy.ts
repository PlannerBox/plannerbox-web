import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { LoginUseCases } from '../../../usecases/auth/login.usecases';
import { removeAfterSemicolon } from '../../helpers/removeAfterSemicolon';
import { LoggerService } from '../../logger/logger.service';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(UsecasesProxyModule.LOGIN_USECASES_PROXY)
    private readonly loginUsecaseProxy: UseCaseProxy<LoginUseCases>,
    private readonly logger: LoggerService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return removeAfterSemicolon(request?.cookies?.session || '');
        },
      ]),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const user = await this.loginUsecaseProxy
      .getInstance()
      .validateUserForJWTStrategy(payload.username);
    if (!user) {
      this.logger.warn('JwtStrategy', `User not found`);
    }
    return user;
  }
}
