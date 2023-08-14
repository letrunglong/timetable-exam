import { put, select } from "redux-saga/effects";
import * as storeActs from "~/store/reducer";
import { IDispatchAction } from "~/util/type";

export function* onGetBaseActionsRequest(action: IDispatchAction) {
  const { payload, callback, store } = action;
  const { requestDataStore } = storeActs[store] || {};
  try {
    const { dataKey = "", service } = payload;
    /* get state by store-key */
    const defState = (yield select())[store];

    yield put(
      requestDataStore({
        [dataKey]: {
          ...defState[dataKey],
          isLoading: true,
          data: null,
        },
      })
    );

    // const response = yield axiosClient.get(`${action.payload.endPoint}`, {
    //   params: action.payload.formData,
    //   ...action.payload.axiosConfig,
    // });
    const response = yield service(action.payload.formData);
    if (!dataKey) {
      callback?.(response);
      return;
    }
    const dataFormat = {
      [dataKey]: {
        isLoading: false,
        data: response.data,
        // pagination: {
        //   total: rs.total,
        //   skip: rs.skip,
        //   limit: rs.limit,
        // },
      },
    };
    yield put(requestDataStore?.(dataFormat));
    callback?.(response);
  } catch (e) {
    yield requestDataStore &&
      put(
        requestDataStore?.({
          [action?.payload?.dataKey || ""]: {
            isLoading: false,
            data: [],
            pagination: {
              total: 0,
            },
          },
        })
      );
    return callback?.(e);
  }
}
