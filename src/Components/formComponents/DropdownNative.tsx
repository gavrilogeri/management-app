import {
  BaseTextFieldProps,
  FormControl,
  InputLabel,
  Select,
  SelectProps,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";
import React from "react";
import { getAllCompanies, Company } from "../UserControl";
import Position from "../Position";

export default function DropdownNative(props: SelectProps) {
  const {
    name,
    labelId,
    value,
    onChange,
    inputProps,
    error = null,
    ...other
  } = props;

  return (
    <FormControl {...(error && { error: true })}>
      <InputLabel>{labelId}</InputLabel>
      <Select labelId={labelId} name={name} value={value} onChange={onChange}>
        {inputProps?.map((item: Company) => (
          <MenuItem key={item.ID} value={item.ID}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
