import { ChangeEvent, FC, memo, useCallback, useMemo, useState } from "react";
import {
  FormControlLabel,
  Grid,
  Switch,
  TextField,
  Alert,
} from "@mui/material";
import { useForm, useWatch } from "react-hook-form";
import { ModalCus, DateTimePicker } from "~/components";
import { EButtonActions } from "~/util/enum";
import { useEvent } from "~/hooks";
import moment from "moment";
import { ErrorMessage } from "@hookform/error-message";
import type { Event, SlotInfo } from "react-big-calendar";

const EventAddUpdate: FC<IEventAU> = ({ open, onClose, record }) => {
  const { onAddUpdateRecord, onDelRecord, isLoading } = useEvent();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<IFormEvent>({
    defaultValues: {
      ...record,
      start: record?.start ? moment(record?.start).toISOString() : "",
      end: record?.end ? moment(record?.end).toISOString() : "",
    },
  });

  const [isDelete, setIsDelete] = useState(false);
  const popupAction = useMemo(
    () =>
      [
        EButtonActions.SAVE,
        record?.id && EButtonActions.DELETE,
        EButtonActions.CANCEL,
      ]?.filter((i) => i) as EButtonActions[],
    [record]
  );
  const [start, end, allDay] = useWatch({
    name: ["start", "end", "allDay"],
    control,
  });
  const handleCheckbox = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setValue("start", moment(record?.start).toISOString());
      setValue("end", moment(record?.start).toISOString());
    }
  }, []);

  const handleActionClick = useCallback(
    (act: EButtonActions) => {
      if (act === EButtonActions.CANCEL) {
        onClose?.();
        return;
      }
      if (act === EButtonActions.DELETE) {
        setIsDelete(true);
        return;
      }
      handleSubmit(
        (payload) => {
          onAddUpdateRecord(payload as Event).then(() => {
            onClose?.();
          });
        },
        (err) => {
          console.log(err, "err");
        }
      )();
    },
    [handleSubmit]
  );
  const handleClose = () => {
    setIsDelete(false);
  };
  const handleNestClick = (act: EButtonActions) => {
    if (act === EButtonActions.CANCEL) {
      handleClose();
      return;
    }
    onDelRecord({ id: record?.id }).then(() => {
      onClose();
    });
  };
  return (
    <ModalCus
      open={open}
      onClose={onClose}
      fullWidth
      title={record?.id ? "Update Event" : "Add Event"}
      actions={popupAction}
      onActionClick={handleActionClick}
      buttonProps={{
        save: { disabled: isLoading, variant: "contained" },
        delete: { disabled: isLoading, variant: "contained", color: "warning" },
      }}
    >
      <Grid component="form">
        <TextField
          label="Title"
          fullWidth
          variant="standard"
          {...register("title", {
            required: "This is required field",
          })}
        />
        <ErrorMessage
          errors={errors}
          name="title"
          render={({ message }) => <Alert severity="error">{message}</Alert>}
        />
        <Grid width={1} sx={{ my: 3 }}>
          <FormControlLabel
            label="All day"
            control={<Switch />}
            {...register("allDay", {
              onChange: handleCheckbox,
            })}
            checked={allDay}
          />
        </Grid>
        <Grid container>
          <Grid width={1 / 2}>
            <DateTimePicker
              label="Start"
              {...register("start", {
                required: "This is required field",
                validate: (value, formValues) =>
                  !moment(value).isAfter(formValues.end),
                valueAsDate: true,
              })}
              value={moment(start)}
              disabled={allDay}
            />
          </Grid>
          <Grid width={1 / 2}>
            <DateTimePicker
              label="End"
              {...register("end", {
                required: "This is required field",
                validate: (value, formValues) =>
                  !moment(value).isBefore(formValues.end),
                valueAsDate: true,
              })}
              value={moment(end)}
              disabled={allDay}
            />
          </Grid>
        </Grid>
      </Grid>
      <ModalCus
        open={isDelete}
        title={"Confirm"}
        actions={[EButtonActions.SAVE, EButtonActions.CANCEL]}
        onClose={handleClose}
        onActionClick={handleNestClick}
      >
        <Alert severity="error">{`Are you sure delete ${
          record?.title as string
        } event ?`}</Alert>
      </ModalCus>
    </ModalCus>
  );
};

export default memo(EventAddUpdate);

interface IEventAU {
  open: boolean;
  onClose: () => void;
  record?: (Event | SlotInfo) & { id?: string };
}

interface IFormEvent extends Omit<Event, "start" | "end"> {
  start: Date | string;
  end: Date | string;
}
