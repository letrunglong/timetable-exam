import { call } from "redux-saga/effects";
import { onGetBaseActionsRequest } from "./watch_get";
import { onPostBaseAction } from "./watch_post";
import { EnumPrefixBaseActionType } from "~/util/enum";
import { IDispatchAction } from "~/util/type";
import { onDelBaseAction } from "./watch_del";

export default function* watchRootSaga(action: IDispatchAction) {
  /* --------------Type format-------------- */
  /*   [store]/[CALL_ACION] ex: user/GET_BASE_ACTIONS */
  const [store, type] = action.type.split("/") || [];
  switch (type) {
    case EnumPrefixBaseActionType.GET_ACTION:
      yield call(onGetBaseActionsRequest, {
        ...action,
        store,
      });
      break;
    case EnumPrefixBaseActionType.POST_ACTION:
      yield call(onPostBaseAction, { ...action, store });
      break;
    case EnumPrefixBaseActionType.DELETE_ACTION:
      yield call(onDelBaseAction, { ...action, store });
      break;
    default:
      break;
  }
}
