import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Users } from 'src/models/users.model';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Role, ROLES } from 'src/constants/metadata';

@Injectable()
export class AuthGuard extends JwtAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    if (!(await super.canActivate(context))) throw new UnauthorizedException();

    const user = context.switchToHttp().getRequest()?.user;
    if (!user) throw new UnauthorizedException();

    const requiredRoles =
      this.reflector.getAllAndOverride<string[]>(ROLES, [
        context.getHandler(),
        context.getClass,
      ]) || [];

    if (!requiredRoles.every((role: Role) => this.verifyRole(role, user))) {
      throw new ForbiddenException();
    }

    return true;
  }

  private verifyRole(role: Role, user: Users) {
    if (user.role === Role.ADMIN) return true;
    return user.role === role;
  }
}
