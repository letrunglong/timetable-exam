import { takeEvery } from "redux-saga/effects";
import { watchRootSaga } from "~/store/saga";

export default function* rootSaga() {
  yield takeEvery("*", watchRootSaga);
}
