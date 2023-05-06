import { Injectable } from '@angular/core';
import AuthUserSessionStorageCoreService from 'src/core/auth/services/AuthUserSessionStorageService';

@Injectable({
  providedIn: 'root'
})
export class AuthUserSessionStorageService extends AuthUserSessionStorageCoreService {
  constructor() {
    super()
  }
}
