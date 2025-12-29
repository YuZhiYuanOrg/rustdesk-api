import { SetMetadata } from '@nestjs/common';

// 标记路由为公共（无需鉴权）
export const Public = () => SetMetadata('isPublic', true);
