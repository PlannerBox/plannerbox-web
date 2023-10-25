export interface IJwtServicePayload {
  username: string;
  role?: string;
}

export interface IJwtServiceResetPasswordPayload extends IJwtServicePayload {
  password: string;
}

export interface IJwtService {
  checkToken(token: string): Promise<any>;
  createToken(
    payload: IJwtServicePayload,
    secret: string,
    expiresIn: string,
  ): string;
}
