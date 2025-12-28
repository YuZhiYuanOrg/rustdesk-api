import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../../common/guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your-secret-key', // 实际项目中建议从环境变量获取
      signOptions: { expiresIn: '1h' }, // token有效期
    }),
  ],
  providers: [
    // 注册全局守卫（所有路由默认需要鉴权）
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [JwtModule],
})
export class AuthModule {}
