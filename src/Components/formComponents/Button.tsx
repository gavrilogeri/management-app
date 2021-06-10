import {
  Button as MuiButton,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React from "react";

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
        color={color || "default" || "error"}
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
