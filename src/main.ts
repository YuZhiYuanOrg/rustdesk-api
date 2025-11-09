import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 全局字段校验管道（DTO校验）
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 过滤未定义的字段
      transform: true, // 自动转换参数类型
      forbidNonWhitelisted: true, // 禁止传递未定义字段
    }),
  );

  // 跨域配置
  const configService = app.get(ConfigService);
  app.enableCors({
    origin: configService.get<string>('FRONTEND_URL'),
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  });

  // 接口前缀（统一 api/v1）
  app.setGlobalPrefix('api/v1');

  await app.listen(3000);
  console.log(`服务运行在: ${await app.getUrl()}`);
}
bootstrap();
