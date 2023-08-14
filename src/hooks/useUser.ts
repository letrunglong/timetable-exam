import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseActionRequest } from "~/store/action";
import { getAttributesByKey } from "~/store/selectors";
import { EStoreKey, EnumPrefixBaseActionType } from "~/util/enum";
import { user } from "~/store/reducer";
import type { IStoreUser } from "~/util/type";
import { loginService } from "~/services";

export default function () {
  const dispatch = useDispatch();
  const keyStore = EStoreKey.user;
  const isAuth = useSelector(
    getAttributesByKey(keyStore, "isAuth")
  ) as IStoreUser["isAuth"];
  const isLoading = useSelector(
    getAttributesByKey(keyStore, "isLoading")
  ) as IStoreUser["isLoading"];

  const onLogin = useCallback(
    (payload = {}) => {
      return new Promise((resolve) => {
        dispatch(
          baseActionRequest({
            store: keyStore,
            action: EnumPrefixBaseActionType.POST_ACTION,
            payload: {
              service: loginService,
              formData: payload,
            },
            callback: (res) => {
              console.log(res, "res");
              resolve(res);
              dispatch(
                user.requestDataStore({
                  isAuth: true,
                })
              );
            },
          })
        );
      });
    },
    [dispatch, keyStore]
  );
  return {
    isAuth,
    isLoading,
    onLogin,
  };
}
