import { Injectable } from '@angular/core';
import AuthUserSessionStorageSingletonCoreService from 'src/core/auth/services/AuthUserSessionStorageSingletonCoreService';

@Injectable({
  providedIn: 'root'
})
export class AuthUserSessionStorageService {
  authUserSessionStorageSingletonService = AuthUserSessionStorageSingletonCoreService.getInstance()
  constructor() { }
}
