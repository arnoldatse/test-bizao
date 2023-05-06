import { Injectable } from '@angular/core';
import AuthUserSessionStorageSingletonCoreService from 'src/core/auth/services/AuthUserSessionStorageSingletonCoreService';

@Injectable({
  providedIn: 'root'
})
export class AuthUserSessionStorageService {
  authUserSessionStorageSingletonCoreService = AuthUserSessionStorageSingletonCoreService.getInstance()
  constructor() { }
}
