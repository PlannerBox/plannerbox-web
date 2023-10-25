import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './infrastructure/common/interceptors/logger.interceptor';
import { LoggerService } from './infrastructure/logger/logger.service';

async function bootstrap() {
  const env = process.env.NODE_ENV;
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  // base routing
  app.setGlobalPrefix('api');

  // interceptors config
  app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));

  // pipes
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const result = errors.map((error) => ({
          property: error.property,
          message: error.constraints[Object.keys(error.constraints)[0]],
        }));
        return new BadRequestException(result);
      },
    }),
  );

  // CORS Policy
  app.enableCors({
    origin: process.env.WEBSITE_URL,
    credentials: true,
  });

  const config = new DocumentBuilder()
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .setTitle('Plannerbox API')
    .setDescription('Plannerbox API description for developers')
    .setVersion('1.0')
    .build();

  // swagger config
  if (env !== 'production') {
    const document = SwaggerModule.createDocument(app, config, {
      deepScanRoutes: true,
    });
    SwaggerModule.setup('swagger', app, document);
  }
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(3000);
  LoggerService.log(`App is running on: ${await app.getUrl()}`);
}
bootstrap();
