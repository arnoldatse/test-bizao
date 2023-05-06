import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import AuthUserSessionStorageSingletonCoreService from 'src/core/auth/services/AuthUserSessionStorageSingletonCoreService';
import AuthPermissionCoreService from 'src/core/services/AuthPermissionCoreService';

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const authUserSessionStorageSingletonCoreService = AuthUserSessionStorageSingletonCoreService.getInstance()
  const authPermissionCoreService = new AuthPermissionCoreService(authUserSessionStorageSingletonCoreService)
  return !authPermissionCoreService.checkAuthenticated() ? true : router.navigate(["/space"]);
};
