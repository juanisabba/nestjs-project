import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException, forwardRef } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { IUser } from "src/users/models/user.interface";
import { UsersService } from "src/users/users.service";

    @Injectable()
  export class UserIsUserGuard implements CanActivate {
    constructor(
      private reflector: Reflector,
      @Inject(forwardRef(() => UsersService))
      private usersService: UsersService,
    ) {}
  
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
    //   const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
    //   const admin = this.reflector.get<string>(ADMIN_KEY, context.getHandler());
    //   const isPublic = this.reflector.get<string>(
    //     PUBLIC_KEY,
    //     context.getHandler(),
    //   );
      const request = context.switchToHttp().getRequest();
      const params = request.params
      const user:IUser = request.user;
      console.log(request)
  
    //   if (isPublic) return true;
    //   if (!isPublic && !user)
    //     throw new UnauthorizedException('debes estar logueado');
      const hasPermission: boolean = user.id === parseInt(params.id)
      if (!hasPermission) throw new UnauthorizedException('No eres este usuario');
      return true;
    }
  }  