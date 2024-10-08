import {
  SetMetadata,
  ExecutionContext,
  createParamDecorator,
} from '@nestjs/common';
import { Role, ROLES } from 'src/constants/metadata';

export const RequireRoles = (...roles: string[]) => SetMetadata(ROLES, roles);
export const RequiresAdminRole = () => RequireRoles(Role.ADMIN);

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
