import UserAuthenticated from "../entities/UserAuthenticated";

export default interface AuthUserSessionStorageSingletonRepository{
  saveWithoutSyncCurrnetUser(userAuthenticated: UserAuthenticated): void;
  save(userAuthenticated: UserAuthenticated): UserAuthenticated;
  getWithoutSyncCurrentUser(): UserAuthenticated;
  get(): UserAuthenticated;
  remove(): void;
  currentUserAuthenticated: UserAuthenticated
  haveCurrentUser: boolean
}
