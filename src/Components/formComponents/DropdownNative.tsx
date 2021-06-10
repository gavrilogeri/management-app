import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@material-ui/core";
import React from "react";
import { Company } from "../UserControl";

export default function DropdownNative(props: SelectProps) {
  const {
    name,
    labelId,
    value,
    onChange,
    inputProps,
    defaultValue,
    error = null,
    disabled,
  } = props;

  return (
    <FormControl {...(error && { error: true })}>
      <InputLabel>{labelId}</InputLabel>
      <Select
        labelId={labelId}
        name={name}
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
        disabled={disabled}
      >
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
