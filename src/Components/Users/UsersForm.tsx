// eslint-disable-next-line
import { Grid, makeStyles, TextField } from "@material-ui/core";
import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import Button from "../formComponents/Button";
import Dropdown from "../formComponents/Dropdown";
import DropdownNative from "../formComponents/DropdownNative";
import * as UserControl from "../UserControl";
import { User } from "../UserControl";
// import "/src/styles/appStyles.scss";

interface Props {
  addOrEdit: (user: User, resetForm: () => void) => void;
  editableRecord: User | null;
  setOpenForm: Dispatch<SetStateAction<boolean>>;
  setEditableRecord: Dispatch<SetStateAction<User | null>>;
  filterCompanyID?: string;
  className?: string;
}
export default function UsersForm({
  addOrEdit,
  editableRecord,
  setOpenForm,
  setEditableRecord,
  filterCompanyID,
  className,
}: Props) {
  const defaultUserValue: User = {
    firstName: "",
    lastName: "",
    companyID: "",
    companyName: "",
    DOB: new Date("1970-01-01").toISOString().replace(/T.*/, ""),
    Position: "",
    phoneNumber: "",
    ID: "",
  };

  // const useStyles = makeStyles((customTheme) => ({
  //   root: {
  //     "& .MuiFormControl-root": {
  //       width: "20%",
  //       margin: customTheme.spacing(1),
  //     },
  //     "&.MuiSelectControl-root": {
  //       width: "100px",
  //       margin: customTheme.spacing(1),
  //     },
  //   },
  // }));

  const [values, setValues] = useState<User>(defaultUserValue);
  const [errors, setErrors] = useState<any>({});

  const handleInputChange = (e: React.ChangeEvent<any>): void => {
    setValues({
      ...values,
      [e.target.name]: e.target.value as string,
    });
    validate({ [e.target.name]: e.target.value });
  };

  const validate = (formValues: any = values) => {
    let temp: any = { ...errors };
    if ("firstName" in formValues) {
      temp.firstName = formValues.firstName ? "" : "This box cannot be empty";
      if (typeof formValues.firstName != "string")
        temp.firstName = "Neispravan unos";
    }
    if ("lastName" in formValues)
      temp.lastName = formValues.lastName ? "" : "This box cannot be empty";

    if ("phoneNumber" in formValues)
      temp.phoneNumber =
        formValues.phoneNumber.length > 8 && formValues.phoneNumber.length < 11
          ? ""
          : "Phone no. must have 9 or 10 digits.";
    if ("Position" in formValues) {
      temp.Position = formValues.Position
        ? ""
        : "Please select a position from the dropdown menu";
    }
    if ("companyID" in formValues) {
      temp.companyID = formValues.companyID
        ? ""
        : "Please select a position from the dropdown menu";
    }

    if ("DOB" in formValues) {
      let pickedDate = new Date(formValues.DOB).getTime();
      let todayDate = new Date().getTime();
      let minDate = new Date("1930-01-01").getTime();
      temp.DOB =
        pickedDate < todayDate && pickedDate > minDate
          ? ""
          : "Date of birth cannot be a future date, nor a date older than 01/01/1930!";
    }
    // debugger;
    setErrors({
      ...temp,
    });

    if (formValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const resetForm = () => {
    setValues(defaultUserValue);
    setErrors({});
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const activeUser = values;
    if (validate()) {
      addOrEdit(activeUser, resetForm);
      resetForm();
    }
  };

  const closeForm = () => {
    setOpenForm(false);
    setValues(defaultUserValue);
    setEditableRecord(null);
  };

  useEffect(() => {
    if (editableRecord !== null) {
      setValues({ ...editableRecord });
    }
  }, [editableRecord, errors]);
  return (
    <div>
      <form autoComplete="off">
        <Grid container spacing={2} className="userForm">
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="First Name"
              name="firstName"
              value={values.firstName}
              onChange={handleInputChange}
              error={errors.firstName ? true : false}
              helperText={errors.firstName}
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="Last Name"
              name="lastName"
              value={values.lastName}
              onChange={handleInputChange}
              error={errors.lastName ? true : false}
              helperText={errors.lastName}
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            {filterCompanyID ? (
              <DropdownNative
                labelId="Company Name"
                name="companyID"
                className="formSelect"
                value={values.companyID}
                onChange={handleInputChange}
                error={errors.companyID}
                defaultValue={filterCompanyID}
                inputProps={UserControl.loadCompanyState()}
              />
            ) : (
              <DropdownNative
                labelId="Company Name"
                name="companyID"
                className="formSelect"
                value={values.companyID}
                onChange={handleInputChange}
                error={errors.companyID}
                inputProps={UserControl.loadCompanyState()}
                disabled={UserControl.loadCompanyState().length ? false : true}
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="DOB"
              name="DOB"
              label="Date of Birth"
              type="date"
              // value={values.DOB}
              defaultValue={"1970-01-01"}
              InputProps={{
                inputProps: {
                  min: "1930-01-01",
                  max: new Date().toISOString().replace(/T.*/, ""),
                },
              }}
              error={errors.DOB ? true : false}
              helperText={errors.DOB}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Dropdown
              labelId="Position"
              name="Position"
              className="formSelect"
              value={values.Position}
              onChange={handleInputChange}
              error={errors.Position}
              inputProps={UserControl.getPositions()}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="Phone Number"
              type="number"
              name="phoneNumber"
              value={values.phoneNumber}
              onChange={handleInputChange}
              error={errors.phoneNumber ? true : false}
              helperText={errors.phoneNumber}
              size="small"
            />
          </Grid>
          <hr className="separator" />
          <Grid container className="formButtons">
            <Grid item xs={6}>
              {/* <button className="closeButton">CLOSE</button> */}
              <Button
                text="CLOSE"
                color="secondary"
                variant="outlined"
                onClick={closeForm}
              />
            </Grid>
            <Grid item xs={6}>
              {/* <button
                  type="submit"
                  onClick={handleSubmit}
                  className="submitButton"
                >
                  SUBMIT
                </button> */}
              <Button
                type="submit"
                text="Submit"
                onClick={handleSubmit}
                disabled={
                  values.firstName === defaultUserValue.firstName ||
                  values.lastName === defaultUserValue.lastName ||
                  !Object.values(errors).every((x) => x === "")
                }
              />
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
