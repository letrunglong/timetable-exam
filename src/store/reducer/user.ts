import { createSlice } from "@reduxjs/toolkit";
import { IStoreUser } from "~/util/type/store";

const initialState: IStoreUser = {
  isAuth: false,
  isLoading: false,
  error: null,
};

const storeSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    callStart: (state: IStoreUser) => {
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    },
    callSuccess: (state: IStoreUser) => ({
      ...state,
      error: null,
      isLoading: false,
    }),
    callFail: (state: IStoreUser, { payload = "" }) => ({
      ...state,
      error: payload,
      isLoading: false,
    }),
    requestDataStore: (
      state: IStoreUser,
      { payload }: { payload: Partial<IStoreUser> }
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
