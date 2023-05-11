import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthUserSessionStorageService } from 'src/app/services/auth-user-session-storage/auth-user-session-storage.service';
import AuthPermissionCoreService from 'src/core/auth/services/AuthPermissionCoreService';

export const authenticatedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const authUserSessionStorageService = inject(AuthUserSessionStorageService)
  const authPermissionCoreService = new AuthPermissionCoreService(authUserSessionStorageService.authUserSessionStorageSingletonService)
  return authPermissionCoreService.checkAuthenticated() ? true : router.navigate(["/auth", "login"]);
};
