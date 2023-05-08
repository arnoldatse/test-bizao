import UserAuthenticated from "../entities/UserAuthenticated";

export default interface AuthUserSessionStorageSingletonRepository{
  saveWithoutSyncCurrentUser(userAuthenticated: UserAuthenticated): void;
  save(userAuthenticated: UserAuthenticated): UserAuthenticated;
  getWithoutSyncCurrentUser(): UserAuthenticated;
  get(): UserAuthenticated;
  remove(): void;
  currentUserAuthenticated: UserAuthenticated
  haveCurrentUser: boolean
}
