import { Role } from 'src/user/types/userRole.type';

import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles); // user.role을 여러개 받을 수 있는데, 그 메타데이터는 roles라는 키에 저장된다.