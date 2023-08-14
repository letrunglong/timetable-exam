import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootReducer from "~/store/reducer/rootReducer";
import rootSaga from "~/store/saga/rootSaga";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
const store = configureStore({
  reducer: rootReducer,
  middleware: [...middleware],
});
sagaMiddleware.run(rootSaga);

export { store };
