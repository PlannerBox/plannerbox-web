import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUseCases } from '../../../usecases/auth/login.usecases';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { LoggerService } from '../../logger/logger.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(UsecasesProxyModule.LOGIN_USECASES_PROXY)
    private readonly loginUsecaseProxy: UseCaseProxy<LoginUseCases>,
    private readonly logger: LoggerService,
  ) {
    super();
  }

  async validate(username: string, password: string) {
    if (!username || !password) {
      this.logger.warn(
        'LocalStrategy',
        `Username or password is missing, BadRequestException`,
      );
      throw new UnauthorizedException();
    }
    const user = await this.loginUsecaseProxy
      .getInstance()
      .validateUserForLocalStrategy(username, password);
    if (!user) {
      this.logger.warn('LocalStrategy', `Unauthorized`);
      throw new UnauthorizedException('Unauthorized access');
    }
    return user;
  }
}
