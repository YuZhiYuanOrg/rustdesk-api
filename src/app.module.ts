import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from './config/database.config';
import { DeviceModule } from './modules/device/device.module';
import { SoftwareModule } from './modules/software/software.module';
import { ReviewModule } from './modules/review/review.module';
import { UpdateModule } from './modules/update/update.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // 全局加载环境变量
    TypeOrmModule.forRootAsync({
      useFactory: getDatabaseConfig,
      inject: [ConfigService],
    }),
    DeviceModule,
    SoftwareModule,
    ReviewModule,
    UpdateModule,
  ],
})
export class AppModule {}
