import { Injectable } from '@angular/core';
import AuthUserSessionStorageSingletonRepository from 'src/core/auth/repositories/AuthUserSessionStorageSingletonRepository';
import AuthUserSessionStorageSingletonCoreService from 'src/core/auth/services/AuthUserSessionStorageSingletonCoreService';

@Injectable({
  providedIn: 'root'
})
export class AuthUserSessionStorageService {
  authUserSessionStorageSingletonService = AuthUserSessionStorageSingletonCoreService.getInstance()
  constructor() { }
}
