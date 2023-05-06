import { Injectable } from '@angular/core';
import AuthPermissionCoreService from 'src/core/services/AuthPermissionCoreService';
import { AuthUserSessionStorageService } from '../auth-user-session-storage/auth-user-session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthPermissionService extends AuthPermissionCoreService {

  constructor(private authUserSessionStorageService: AuthUserSessionStorageService) {
    super(authUserSessionStorageService)
  }
}
