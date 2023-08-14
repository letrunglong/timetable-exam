import { Close } from "@mui/icons-material";
import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Toolbar,
} from "@mui/material";
import { memo, useCallback } from "react";
import { EButtonActions } from "~/util/enum";
import { IModal } from "~/util/type";

function Modalcus({
  open,
  title,
  children,
  onClose,
  actions = [],
  onActionClick,
  buttonProps,
  ...props
}: IModal) {
  const handleClickAction = useCallback(
    (act: EButtonActions) => () => {
      onActionClick?.(act);
    },
    [onActionClick]
  );
  return (
    <Dialog {...props} open={open} onClose={onClose}>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <DialogTitle id="alert-dialog-title" sx={{ p: 0 }}>
            {title}
          </DialogTitle>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose as () => void}
            aria-label="close"
          >
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent>{children}</DialogContent>
      <DialogActions sx={{ py: 2 }}>
        {actions.map((act) => (
          <Button
            key={act}
            {...buttonProps?.[act]}
            onClick={handleClickAction(act)}
          >
            {act}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
}

export default memo(Modalcus);
