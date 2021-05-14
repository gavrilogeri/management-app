import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import React from "react";
import customTheme from "../CustomTheme";
interface Props {
  openForm: boolean;
  title: string | undefined;
  children: React.ReactNode;
}
export default function Popup({ title, children, openForm }: Props) {
  return (
    <Dialog open={openForm} maxWidth="md">
      <DialogTitle>
        <div style={{ display: "flex" }}>
          <Typography
            variant="h6"
            component="div"
            style={{
              flexGrow: 1,
              padding: 15,
              fontWeight: 700,
              color: customTheme.palette.primary.main,
            }}
          >
            {title}
          </Typography>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
}
