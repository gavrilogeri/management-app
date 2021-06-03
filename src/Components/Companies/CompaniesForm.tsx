// eslint-disable-next-line
import { Grid, makeStyles, TextField } from "@material-ui/core";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { connect } from "react-redux";
import type { RootState } from "../../store/store";
import Button from "../formComponents/Button";
import * as UserControl from "../UserControl";
import { Company } from "../UserControl";
import UsersTable from "../Users/UsersTable";

interface Props {
  addOrEdit: (user: Company, resetForm: () => void) => void;
  editableRecord: Company | null;
  openForm: boolean;
  setOpenForm: Dispatch<SetStateAction<boolean>>;
  setEditableRecord: Dispatch<SetStateAction<Company | null>>;
  users: UserControl.User[];
}

const mapStateToProps = (state: RootState) => {
  return {
    users: state.users,
  };
};

function CompaniesForm({
  addOrEdit,
  editableRecord,
  openForm,
  setOpenForm,
  setEditableRecord,
  users,
}: Props) {
  const useStyles = makeStyles((customTheme) => ({
    root: {
      "& .MuiFormControl-root": {
        width: "80%",
        margin: customTheme.spacing(1),
      },
      "&.MuiSelectControl-root": {
        width: "100px",
        margin: customTheme.spacing(1),
      },
    },
  }));

  const classes = useStyles();

  const defaultCompanyValue: Company = {
    ID: "",
    name: "",
    // users: [],
    city: "",
    country: "",
  };
  // const filteredUsers = UserControl.getUsers().filter(
  //   (item: UserControl.User) => item.companyID !== values.ID
  // );

  const validate = (formValues: any = values) => {
    let temp: any = { ...errors };
    if ("name" in formValues)
      temp.name = formValues.name ? "" : "This box cannot be empty";
    if ("city" in formValues)
      temp.city = formValues.city ? "" : "This box cannot be empty";
    if ("country" in formValues)
      temp.country = formValues.country ? "" : "This box cannot be empty";

    setErrors({
      ...temp,
    });

    if (formValues == values) return Object.values(temp).every((x) => x == "");
  };

  const [values, setValues] = useState<Company>(defaultCompanyValue);
  // const [filtered, setFiltered] = useState<UserControl.User[]>(users);

  const handleInputChange = (e: React.ChangeEvent<any>): void => {
    setValues({
      ...values,
      [e.target.name]: e.target.value as string,
    });
  };
  const [errors, setErrors] = useState<any>({});
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const activeCompany = values;
    if (validate()) {
      addOrEdit(activeCompany, resetForm);
      resetForm();
    }
  };

  const resetForm = () => {
    setValues(defaultCompanyValue);
    setErrors({});
  };

  useEffect(() => {
    if (editableRecord !== null) {
      setValues({ ...editableRecord });
      // const filterUsers = users.filter(
      //   (item: UserControl.User) => item.companyID === editableRecord.ID
      // );
      // setFiltered(filterUsers);
    }
  }, [editableRecord, openForm]);
  const closeForm = () => {
    setOpenForm(false);
    setValues(defaultCompanyValue);
    setEditableRecord(null);
  };

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
          <Button type="submit" text="Submit" onClick={handleSubmit} />
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

      <div>
        {editableRecord && (
          <UsersTable
            users={users}
            // setUsers={setUsers}
            filterCompanyID={values.ID}
          />
        )}
      </div>
    </form>
  );
}
export default connect(mapStateToProps)(CompaniesForm);
