import { BaseTextFieldProps, FormControl, InputLabel, Select, SelectProps, MenuItem, FormHelperText } from '@material-ui/core'
import React from 'react'
import { getPositions } from '../UserControl'
import Position from "../Position"



export default function Dropdown(props: SelectProps) {
    const { name, labelId, value, onChange, inputProps, error = null, ...other } = props;

    return (
        <FormControl {...(error && { error: true })}>
            <InputLabel>{labelId}</InputLabel>
            <Select
                labelId={labelId}
                name={name}
                value={value}
                onChange={onChange}>

                {

                    inputProps?.map(
                        (item: any) => (<MenuItem key={item.id} value={item.position}>{item.position}</MenuItem>))}
            </Select>
            { error && <FormHelperText>{error}</FormHelperText>}
        </FormControl >
    )
}
