import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUpdateEvent, deleteEvent, getEvents } from "~/services/event";
import { baseActionRequest } from "~/store/action";
import { getAttributesByKey } from "~/store/selectors";
import { EStoreKey, EnumPrefixBaseActionType } from "~/util/enum";
import { event } from "~/store/reducer";
import type { IStoreEvent } from "~/util/type";
import type { Event } from "react-big-calendar";

export default function () {
  const dispatch = useDispatch();
  const keyStore = EStoreKey.event;
  const records = useSelector(
    getAttributesByKey(keyStore, "records")
  ) as IStoreEvent["records"];
  const isLoading = useSelector(
    getAttributesByKey(keyStore, "isLoading")
  ) as IStoreEvent["isLoading"];

  const onGetRecords = useCallback(() => {
    dispatch(
      baseActionRequest({
        store: keyStore,
        action: EnumPrefixBaseActionType.GET_ACTION,
        payload: {
          service: getEvents,
          dataKey: "records",
        },
      })
    );
  }, [keyStore, dispatch]);
  const onAddUpdateRecord = useCallback(
    (payload: Event) => {
      return new Promise((resolve) => {
        dispatch(
          baseActionRequest({
            store: keyStore,
            action: EnumPrefixBaseActionType.POST_ACTION,
            payload: {
              service: addUpdateEvent,
              formData: payload,
            },
            callback: (res) => {
              resolve(res);
              dispatch(
                event.requestDataStore({
                  records: {
                    ...records,
                    data: [
                      ...(records?.data || []),
                      { id: records?.data?.length, ...res.data },
                    ],
                  },
                })
              );
            },
          })
        );
      });
    },
    [dispatch, records?.data]
  );
  const onDelRecord = useCallback(
    (payload: Event & { id?: string }) => {
      return new Promise((resolve, reject) => {
        if (!payload.id) return reject("not found");
        dispatch(
          baseActionRequest({
            store: keyStore,
            action: EnumPrefixBaseActionType.POST_ACTION,
            payload: {
              service: deleteEvent,
              formData: payload,
            },
            callback: (res) => {
              resolve(res);
              dispatch(
                event.requestDataStore({
                  records: {
                    ...records,
                    data: (records?.data || []).filter(
                      (i) => i.id !== payload.id
                    ),
                  },
                })
              );
            },
          })
        );
      });
    },
    [dispatch, records?.data]
  );
  return {
    records,
    isLoading,
    onGetRecords,
    onAddUpdateRecord,
    onDelRecord,
  };
}
