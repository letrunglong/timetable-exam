import { createSlice } from "@reduxjs/toolkit";
import { IStoreEvent } from "~/util/type/store";

const initialState: IStoreEvent = {
  records: {
    data: [],
    isLoading: false,
    error: null,
  },
  isLoading: false,
  error: null,
};

const storeSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    callStart: (state: IStoreEvent) => {
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    },
    callSuccess: (state: IStoreEvent) => ({
      ...state,
      error: null,
      isLoading: false,
    }),
    callFail: (state: IStoreEvent, { payload = "" }) => ({
      ...state,
      error: payload,
      isLoading: false,
    }),
    requestDataStore: (
      state: IStoreEvent,
      { payload }: { payload: Partial<IStoreEvent> }
    ) => {
      return {
        ...state,
        ...payload,
      };
    },
  },
});

export const { callStart, callFail, callSuccess, requestDataStore } =
  storeSlice.actions;

export default storeSlice.reducer;
