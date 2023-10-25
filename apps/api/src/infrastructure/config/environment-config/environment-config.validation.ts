import { plainToClass } from 'class-transformer';
import { IsBoolean, IsNumber, IsString, validateSync } from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Local = 'local',
  Test = 'test',
}

class EnvironmentVariables {
  @IsString()
  POSTGRES_HOST: string;
  @IsNumber()
  POSTGRES_PORT: number;
  @IsString()
  POSTGRES_USER: string;
  @IsString()
  POSTGRES_PASSWORD: string;
  @IsString()
  POSTGRES_DB: string;
  @IsString()
  POSTGRES_SCHEMA: string;
  @IsBoolean()
  POSTGRES_SYNCHRONIZE: boolean;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    console.log(config);
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
