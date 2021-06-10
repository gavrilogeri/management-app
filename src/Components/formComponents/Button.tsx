import React from "react";
import {
  Button as MuiButton,
  ButtonBaseProps,
  ButtonProps,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";

const useStyles = makeStyles((customTheme: Theme) =>
  createStyles({
    button: {
      margin: customTheme.spacing(1),
    },
  })
);

export default function Button(props: any) {
  const { color, text, size, onClick, variant, disabled, ...other } = props;
  const classes = useStyles();

  return (
    <div>
      <MuiButton
        className={classes.button}
        color={color || "#936ef9" || "error"}
        size={size || "medium"}
        variant={variant || "contained"}
        onClick={onClick}
        disabled={disabled}
        {...other}
      >
        {text}
      </MuiButton>
    </div>
  );
}
