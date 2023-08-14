import { memo } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { ICalendarCus } from "~/util/type";

const localizer = momentLocalizer(moment);

function CalendarCus({ ...props }: Partial<ICalendarCus>) {
  return (
    <Calendar
      {...props}
      localizer={localizer}
      startAccessor="start"
      endAccessor="end"
      culture="VI"
      selectable
    />
  );
}

export default memo(CalendarCus);
