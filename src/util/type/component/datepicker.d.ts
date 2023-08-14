import type { DateTimePickerProps } from "@mui/x-date-pickers";
import type { Moment } from "moment";

export interface IDatePickerProps extends DateTimePickerProps<string> {
  name?: string;
  onChange?: (Event) => void;
  value?: string | null | Moment;
}
