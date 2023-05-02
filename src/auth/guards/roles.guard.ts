import {
  Injectable,
  CanActivate,
  ExecutionContext,
  forwardRef,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ADMIN_KEY, PUBLIC_KEY, ROLES_KEY } from 'src/constants/key-decorators';
import { ROLES_ENUM } from 'src/constants/roles.enum';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
    const admin = this.reflector.get<string>(ADMIN_KEY, context.getHandler());
    const isPublic = this.reflector.get<string>(
      PUBLIC_KEY,
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest();
    const {user} = request;

    if (isPublic) return true;
    if (!isPublic && !user)
      throw new UnauthorizedException('debes estar logueado');
    if (!roles) {
      if (!admin) {
        return true;
      } else if (admin && user.role === admin) {
        return true;
      } else {
        throw new UnauthorizedException('No tienes permisos');
      }
    }
    if (user.role === ROLES_ENUM.ADMIN) return true;
    const hasPermission: boolean = roles.some((role) =>
      role.includes(user.role),
    );
    if (!hasPermission) throw new UnauthorizedException('No tienes permisos');
    return true;
  }
}
