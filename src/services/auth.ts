import { formatMockResponse } from "~/util/helper";

export const loginService = (form) =>
  new Promise((resolve, reject) => {
    try {
      setTimeout(
        () => resolve(formatMockResponse({ ...form, isAuth: true })),
        300
      );
    } catch (error) {
      setTimeout(() => reject(error), 300);
    }
  });
