import UserAuthenticated from "../entities/UserAuthenticated";

export default interface AuthUserStorageRepository{
  save(userAuthenticated: UserAuthenticated): void;
  saveAndDefineCurrentUser(userAuthenticated: UserAuthenticated): UserAuthenticated;
  get(): UserAuthenticated;
  getAndDefineCurrentUser(): UserAuthenticated;
  remove(): void;
  currentUserAuthenticated: UserAuthenticated
  haveCurrentUser: boolean
}
