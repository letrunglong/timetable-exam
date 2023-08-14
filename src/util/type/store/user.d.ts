import { IDataStore } from ".";

interface IUser {
  name: string;
  email: string;
}
export interface IStoreUser {
  record?: Partial<IDataStore<IUser>>;
  isAuth: boolean;
  isLoading: boolean;
  error: null | string;
}
