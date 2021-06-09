import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  Typography,
} from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";
import React from "react";
import CloseIcon from "@material-ui/icons/Close";

interface Props {
  openForm: boolean;
  title: string | undefined;
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
}
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Popup({
  title,
  onClick,
  children,
  openForm,
  className,
}: Props) {
  return (
    <Dialog
      open={openForm}
      maxWidth="md"
      TransitionComponent={Transition}
      className={className}
    >
      <DialogTitle>
        <div className="modalHeader">
          <Typography variant="h6" className="userFormTitle" component="div">
            {title}
          </Typography>
          <IconButton aria-label="close" onClick={onClick}>
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
}
