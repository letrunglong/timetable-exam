import { memo, useCallback, useEffect, useState } from "react";
import type { SlotInfo, Event } from "react-big-calendar";
import { CalendarCus } from "~/components";
import { useEvent } from "~/hooks";
import { EventAddUpdate } from "./components";
import { ICalendarCus } from "~/util/type";
const Mainage = () => {
  const { records, onGetRecords } = useEvent();
  const [isOpen, setIsOpen] = useState(false);
  const [record, setRecord] = useState<SlotInfo | Event>();
  const handleSelectSlot = useCallback((sl: SlotInfo) => {
    if (sl.action !== "doubleClick") return;
    setRecord(sl);
    handleToggle();
  }, []);

  const handleSelectEvent: ICalendarCus["onSelectEvent"] = useCallback(
    (event: Event) => {
      setRecord(event);
      handleToggle();
    },
    []
  );

  const handleToggle = useCallback((isOpen?: boolean) => {
    setIsOpen((s) => isOpen ?? !s);
  }, []);

  const handleClose = useCallback(() => {
    handleToggle();
    setTimeout(() => {
      setRecord(undefined);
    }, 200);
  }, []);

  useEffect(() => {
    onGetRecords();
  }, []);

  return (
    <>
      <CalendarCus
        events={records?.data || []}
        onSelectSlot={handleSelectSlot}
        onDoubleClickEvent={handleSelectEvent}
      />
      {isOpen && (
        <EventAddUpdate open={isOpen} onClose={handleClose} record={record} />
      )}
    </>
  );
};

export default memo(Mainage);
