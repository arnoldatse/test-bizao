import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthPermissionService } from 'src/app/services/auth-permission/auth-permission.service';

export const authenticatedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  return inject(AuthPermissionService).checkAuthenticated() ? true : router.navigate(["/auth/login"]);
};
