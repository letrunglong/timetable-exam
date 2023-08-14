import { createSelector } from "@reduxjs/toolkit";
import { EStoreKey } from "~/util/type";

export const getAttributesByKey = (store: EStoreKey, key: string) => {
  const selector = (state) => state[store];
  return createSelector(selector, (app) => app?.[key]);
};
