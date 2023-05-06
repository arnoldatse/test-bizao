import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthPermissionService } from 'src/app/services/auth-permission/auth-permission.service';

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const authPermissionService = inject(AuthPermissionService)
  return !authPermissionService.checkAuthenticated() ? true : router.navigate(["/space"]);
};
