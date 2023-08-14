import { ButtonTypeMap, DialogProps } from "@mui/material";
import { DefaultComponentProps } from "@mui/material/OverridableComponent";
import { EButtonActions } from "~/util/enum";

export interface IModal extends DialogProps {
  actions?: EButtonActions[];
  onActionClick?: (act: EButtonActions) => void;
  buttonProps?: Partial<
    Record<EButtonActions, DefaultComponentProps<ButtonTypeMap>>
  >;
  isLoading?: boolean;
}
