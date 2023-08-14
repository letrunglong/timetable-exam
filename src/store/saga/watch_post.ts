import { put } from "redux-saga/effects";
import * as storeActs from "~/store/reducer";
import { IDispatchAction } from "~/util/type";

export function* onPostBaseAction(action: IDispatchAction) {
  const { payload, callback, store } = action;
  const { callStart, callFail, callSuccess, requestDataStore } =
    storeActs[store] || {};

  try {
    const { dataKey = "", service, formData } = payload;

    yield put(callStart());
    const response = yield service(formData);
    callback?.(response);

    if (dataKey) {
      put(
        requestDataStore?.({
          [dataKey]: response?.data?.result,
          isLoading: false,
          error: null,
        })
      );
    } else {
      yield put(callSuccess?.());
    }
  } catch (error) {
    yield put(callFail(error));
    callback?.({ success: false, error });
  }
}
