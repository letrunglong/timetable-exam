import { IActionBase } from "~/util/type";

export const baseActionRequest = ({
  payload,
  store,
  action,
  callback,
}: IActionBase) => ({
  payload,
  type: `${store}/${action}`,
  callback,
});
