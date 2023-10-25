import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from '../../../domain/config/database.interface';
import { JWTConfig } from '../../../domain/config/jwt.interface';

@Injectable()
export class EnvironmentConfigService implements DatabaseConfig, JWTConfig {
  constructor(private configService: ConfigService) {}

  getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }

  getJwtExpirationTime(): string {
    return this.configService.get<string>('JWT_EXPIRATION_TIME');
  }

  getJwtRefreshSecret(): string {
    return this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET');
  }

  getJwtRefreshExpirationTime(): string {
    return this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION_TIME');
  }

  getDatabaseHost(): string {
    return this.configService.get('POSTGRES_HOST');
  }
  getDatabasePort(): number {
    return this.configService.get('POSTGRES_PORT');
  }
  getDatabaseUser(): string {
    return this.configService.get('POSTGRES_USER');
  }
  getDatabasePassword(): string {
    return this.configService.get('POSTGRES_PASSWORD');
  }
  getDatabaseName(): string {
    return this.configService.get('POSTGRES_DB');
  }
  getDatabaseSchema(): string {
    return this.configService.get('POSTGRES_SCHEMA');
  }
  getDatabaseSync(): boolean {
    return this.configService.get('POSTGRES_SYNCHRONIZE');
  }
}
