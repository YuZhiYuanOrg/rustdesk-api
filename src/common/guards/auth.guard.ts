import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector, // 用于读取路由元数据（判断是否为公共路由）
  ) {}

  canActivate(context: ExecutionContext): boolean {
    // 检查路由是否标记为公共（无需鉴权）
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true; // 公共路由直接通过
    }

    // 非公共路由需要鉴权
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new Error('未提供鉴权令牌'); // 实际项目中可替换为UnauthorizedException
    }

    try {
      // 验证token（secret需与JWT模块配置一致）
      const payload = this.jwtService.verify(token);
      // 将用户信息挂载到request对象，供后续控制器使用
      request.user = payload;
    } catch {
      throw new Error('鉴权失败'); // 实际项目中可替换为UnauthorizedException
    }
    return true;
  }

  // 从请求头中提取token（格式：Bearer <token>）
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
