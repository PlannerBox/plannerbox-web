import {
  BadRequestException,
  Body,
  Controller,
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
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IsAuthenticatedUseCases } from '../../../usecases/auth/isAuthenticated.usecases';
import { LoginUseCases } from '../../../usecases/auth/login.usecases';
import { LogoutUseCases } from '../../../usecases/auth/logout.usecases';
import { ResetPasswordUseCases } from '../../../usecases/auth/resetPassword.usecases';
import { SignUpUseCases } from '../../../usecases/auth/signUp.usecases';
import { JwtAuthGuard } from '../../common/guards/jwtAuth.guard';
import JwtRefreshGuard from '../../common/guards/jwtRefresh.guard';
import { LoginGuard } from '../../common/guards/login.guard';
import { ApiResponseType } from '../../common/swagger/response.decorator';
import { JsonResult } from '../../helpers/JsonResult';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { IsAuthPresenter } from './auth.presenter';
import { AuthLoginDto } from './authDto.class';
import { AuthPasswordDto, AuthSignUpDto } from './authSignUpDto.class';

@Controller('auth')
@ApiTags('auth')
@ApiResponse({
  status: 401,
  description: 'No authorization token was found',
})
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(IsAuthPresenter)
export class AuthController {
  constructor(
    @Inject(UsecasesProxyModule.LOGIN_USECASES_PROXY)
    private readonly loginUsecaseProxy: UseCaseProxy<LoginUseCases>,
    @Inject(UsecasesProxyModule.LOGOUT_USECASES_PROXY)
    private readonly logoutUsecaseProxy: UseCaseProxy<LogoutUseCases>,
    @Inject(UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY)
    private readonly isAuthUsecaseProxy: UseCaseProxy<IsAuthenticatedUseCases>,
    @Inject(UsecasesProxyModule.SIGNUP_USECASES_PROXY)
    private readonly signUpUsecaseProxy: UseCaseProxy<SignUpUseCases>,
    @Inject(UsecasesProxyModule.RESET_PASSWORD_USECASES_PROXY)
    private readonly resetPasswordUsecaseProxy: UseCaseProxy<ResetPasswordUseCases>,
  ) {}

  @Post('login')
  @UseGuards(LoginGuard)
  @ApiBody({ type: AuthLoginDto })
  @ApiOperation({ description: 'login' })
  async login(@Body() auth: AuthLoginDto, @Req() request: any) {
    const accessTokenCookie = await this.loginUsecaseProxy
      .getInstance()
      .getCookieWithJwtToken(auth.username);
    const refreshTokenCookie = await this.loginUsecaseProxy
      .getInstance()
      .getCookieWithJwtRefreshToken(auth.username);
    request.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie,
    ]);
    return {
      access_token: accessTokenCookie.replace('session=', ''),
      refresh_token: refreshTokenCookie.replace('Refresh=', ''),
    };
  }

  @Post('signup')
  @ApiBody({ type: AuthSignUpDto })
  @ApiOperation({ description: 'Create a new user account' })
  @ApiResponse({ status: 200, description: 'Signup successful' })
  @ApiResponse({ status: 400, description: 'Bad request (user already created or invalid data)' })
  async signup(@Body() newAccount: AuthSignUpDto, @Req() request: any) {
    const checkUserName = await this.isAuthUsecaseProxy
      .getInstance()
      .execute(newAccount.username);

    if (checkUserName) {
      const result = [
        {
          property: 'username',
          message: "Le nom d'utilisateur est déjà utilisé",
        },
      ];
      throw new BadRequestException(result);
    }

    const account = await this.signUpUsecaseProxy
      .getInstance()
      .signUp(newAccount);

    return JsonResult.Convert('Compte créé');
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'logout' })
  async logout(@Req() request: any) {
    const cookie = await this.logoutUsecaseProxy.getInstance().execute();
    request.res.setHeader('Set-Cookie', cookie);
    return JsonResult.Convert('Déconnexion réussie');
  }

  @Get('is-authenticated')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description:
      'check if user is authenticated while checking if the mail which is in the token exists in the database',
  })
  @ApiResponseType(IsAuthPresenter, false)
  async isAuthenticated(@Req() request: any) {
    const user = await this.isAuthUsecaseProxy
      .getInstance()
      .execute(request.user.username);
    const response = new IsAuthPresenter();
    response.username = user.username;
    return response;
  }

  @Get('refresh')
  @UseGuards(JwtRefreshGuard)
  @ApiOperation({ description: 'refresh user JWT' })
  async refresh(@Req() request: any) {
    const accessTokenCookie = await this.loginUsecaseProxy
      .getInstance()
      .getCookieWithJwtToken(request.user.username);
    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return {
      access_token: accessTokenCookie.replace('session=', ''),
    };
  }

  @Post('reset-password')
  @HttpCode(200)
  @ApiOperation({ description: 'request a password update' })
  async changePassword(@Query('mail') mail: string) {
    const user = await this.isAuthUsecaseProxy.getInstance().execute(mail);

    if (user) {
      await this.resetPasswordUsecaseProxy.getInstance().askResetPassword(mail);
    }

    // We don't specify if the mail exists or not to the user to avoid giving information to a potential attacker
    return JsonResult.Convert(
      `Si l'adresse mail ${mail} existe, un mail de réinitialisation de mot de passe a été envoyé`,
    );
  }

  @Post('change-password/:token')
  @HttpCode(200)
  @ApiOperation({ description: 'change the password of an account' })
  async changePasswordWithToken(
    @Param('token') token: string,
    @Body() accountPassword: AuthPasswordDto,
  ) {
    const response = await this.resetPasswordUsecaseProxy
      .getInstance()
      .resetPassword(token, accountPassword.password);

    return JsonResult.Convert('Le mot de passe a été modifié');
  }

  @Get('is-valid/:token')
  @HttpCode(200)
  @ApiOperation({ description: 'check if the reset password token is valid' })
  @ApiResponse({ status: 200, description: 'Token is valid' })
  @ApiResponse({ status: 400, description: 'Token is not valid' })
  async isValidToken(@Param('token') token: string) {
    const response = await this.resetPasswordUsecaseProxy
      .getInstance()
      .tokenIsValid(token);

    return response.statusCode ? response : JsonResult.Convert('Le token est valide');
  }
}
