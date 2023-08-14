import { formatMockResponse } from "~/util/helper";
import { mockEvents } from "~/util/mock";

export const getEvents = () =>
  new Promise((resolve, reject) => {
    try {
      setTimeout(() => resolve(formatMockResponse(mockEvents)), 300);
    } catch (error) {
      setTimeout(() => reject(error), 300);
    }
  });

export const addUpdateEvent = (data) =>
  new Promise((resolve, reject) => {
    try {
      setTimeout(() => resolve(formatMockResponse(data)), 300);
    } catch (error) {
      setTimeout(() => reject(error), 300);
    }
  });
export const deleteEvent = (data) =>
  new Promise((resolve, reject) => {
    try {
      setTimeout(() => resolve(formatMockResponse(data)), 300);
    } catch (error) {
      setTimeout(() => reject(error), 300);
    }
  });
