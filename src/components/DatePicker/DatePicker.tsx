import { forwardRef, memo, useCallback } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { IDatePickerProps } from "~/util/type";
import moment from "moment";

const DatePicker = forwardRef<HTMLDivElement, IDatePickerProps>(
  (
    {
      onAccept,
      onChange,
      timezone = "UTC",
      format = "DD-MM-YYYY hh:mm:ss",
      name,
      value,
      ...props
    },
    ref
  ) => {
    const handleAccept = useCallback(
      (value: string | null) => {
        onAccept?.(value);
        onChange?.(
          { target: { value: moment(value).toISOString(), name } } as any,
          null
        );
      },
      [onAccept, onChange]
    );
    // const handleChange = useCallback(
    //   (value: string | null, ctx) => {
    //     onChange?.({ target: { value, name } } as any, ctx);
    //   },
    //   [onChange]
    // );
    return (
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DateTimePicker
          {...props}
          ref={ref}
          value={value as string}
          format={format}
          timezone={timezone}
          onAccept={handleAccept}
        />
      </LocalizationProvider>
    );
  }
);

export default memo(DatePicker);
