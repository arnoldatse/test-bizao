import UserAuthenticated from "../entities/UserAuthenticated";

export default interface AuthUserSessionStorageSingletonRepository{
  currentUserAuthenticated: UserAuthenticated
  haveCurrentUser: boolean
  saveWithoutSyncCurrentUser(userAuthenticated: UserAuthenticated): void;
  save(userAuthenticated: UserAuthenticated): UserAuthenticated;
  getWithoutSyncCurrentUser(): UserAuthenticated;
  get(): UserAuthenticated;
  remove(): void;
}
