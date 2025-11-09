import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const getDatabaseConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  entities: [join(__dirname, '../entities/**/*.entity{.ts,.js}')], // 实体路径
  synchronize: true, // 开发环境自动同步表结构（生产环境禁用）
  logging: true, // 打印SQL日志
  charset: 'utf8mb4',
});
