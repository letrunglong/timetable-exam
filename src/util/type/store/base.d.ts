import { EnumPrefixBaseActionType } from "~/util/enum";

export interface IDataStore<T> {
  isLoading: boolean;
  data: T;
  error: string | null;
}

export interface IActionPayload {
  formData?: IFormdata;
  dataKey?: string;
  service: (params) => any;
}

export interface IActionBase {
  payload: IActionPayload;
  callback?: (results) => void;
  store: EStoreKey;
  action: EnumPrefixBaseActionType;
}

export interface IDispatchAction {
  type: string;
  payload: IActionBase["payload"];
  callback: IActionBase["callback"];
  store: IActionBase["store"];
}
