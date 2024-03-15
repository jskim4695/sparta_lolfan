import { Role } from 'src/user/types/userRole.type';

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RolesGuard extends AuthGuard('jwt') implements CanActivate { // jwt인증을 기본적으로 상속한다.(login이 된 상황에서 role을 볼 것이다.)
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) { // true/false로 데이터를 허용하고 말지를 정함으로써 인가한다.
    const authenticated = await super.canActivate(context);
    if (!authenticated) {
      return false;
    }

    // @Roles(Role.Admin) -> 'roles' -> [Role.Admin] (롤스는 배열에 롤.어드민이라는 게 담겨져있는 것.)
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [ // reflector라는 키워드를 통해서 메타데이터를 탐색하고. roles의 키값을 가져와서
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.role === role); // some : 포함되는게 있는지 보는 것.
  }
}