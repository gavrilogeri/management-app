// eslint-disable-next-line
import React, { useState, useEffect, useRef } from 'react'
import { getPositions } from '../UserControl'
import Position from '../Position';
import { Grid, makeStyles, Select, MenuItem, InputLabel, FormControl } from "@material-ui/core";
import { TextField } from '@material-ui/core';
import customTheme from '../../CustomTheme';
import { StayPrimaryPortraitTwoTone } from '@material-ui/icons';
import Dropdown from '../formComponents/Dropdown'
import Button from '../formComponents/Button'
import * as UserControl from '../UserControl'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
// import FormDatePicker from '../formComponents/DatePicker'
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { Companies } from '../UserControl'
import * as CompaniesPage from './CompaniesPage'
import UsersForm from '../Users/UsersForm';
import UsersPage from '../Users/UsersPage';


export default function CompaniesForm(props: any) {

    const { addOrEdit, editableRecord, setOpenForm, setEditableRecord } = props
    const useStyles = makeStyles(customTheme => ({
        root: {
            '& .MuiFormControl-root': {
                width: "80%",
                margin: customTheme.spacing(1),

            },
            '&.MuiSelectControl-root': {
                width: "100px",
                margin: customTheme.spacing(1),
            }
        }
    }))

    const classes = useStyles();



    const defaultCompanyValue: Companies = {

        ID: "",
        name: "",
        users: [],
        city: "",
        country: ""
    }

    const validate = (formValues: any = values) => {
        let temp: any = { ...errors }
        if ('name' in formValues)
            temp.name = formValues.name ? "" : "This box cannot be empty";
        if ('city' in formValues)
            temp.city = formValues.city ? "" : "This box cannot be empty";
        if ('country' in formValues)
            temp.country = formValues.country ? "" : "This box cannot be empty";

        setErrors({
            ...temp
        })

        if (formValues == values)
            return Object.values(temp).every(x => x == "");
    }


    //useState hook za setovanje vrednosti Usera
    const [values, setValues] = useState<Companies>(defaultCompanyValue);
    //useState hook za setovanje greški i validaciju
    const handleInputChange = (e: React.ChangeEvent<any>): void => {
        setValues({
            ...values,
            [e.target.name]: e.target.value as string
        })
        // live validacija validate(values)
    }
    const [errors, setErrors] = useState<any>({});

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const activeCompany = values;
        if (validate()) {
            addOrEdit(activeCompany, resetForm);
            resetForm();
        }

    }

    const resetForm = () => {
        setValues(defaultCompanyValue);
        setErrors({})
    }

    useEffect(() => {
        if (editableRecord !== null) {
            setValues({ ...editableRecord })
        }
    }, [editableRecord])
    const closeForm = () => {
        setOpenForm(false);
        setValues(defaultCompanyValue);
        setEditableRecord(null);
    }
    return (
        <form className={classes.root} autoComplete="off">
            <Grid container>
                <Grid item xs={12}>
                    <TextField

                        variant="outlined"
                        label="Company Name"
                        name="name"
                        value={values.name}
                        onChange={handleInputChange}
                        error={errors.name ? true : false}
                        helperText={errors.name}

                    />
                    <TextField
                        variant="outlined"
                        label="City"
                        name="city"
                        value={values.city}
                        onChange={handleInputChange}
                        error={errors.city ? true : false}
                        helperText={errors.city}

                    />
                    <TextField
                        variant="outlined"
                        label="Country"
                        name="country"
                        value={values.country}
                        onChange={handleInputChange}
                        error={errors.country ? true : false}
                        helperText={errors.country}

                    />
                </Grid>
                <Grid item xs={2}>
                    <Button
                        type="submit"
                        text="Submit"
                        onClick={handleSubmit}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Button
                        text="CLOSE"
                        color="secondary"
                        variant="outlined"
                        onClick={closeForm}

                    />

                </Grid>
            </Grid>

            <div>{(() => {
                return <UsersPage />
            })()}</div>
        </form>
    )
}
