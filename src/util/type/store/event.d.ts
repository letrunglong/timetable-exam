import { type Event } from "react-big-calendar";
import { IDataStore } from ".";

export interface IStoreEvent {
  records: Partial<IDataStore<(Event & { id?: string })[]>>;
  isLoading: boolean;
  error: null | string;
}
