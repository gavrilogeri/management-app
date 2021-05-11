import {
  Button as MuiButton,
  makeStyles,
  Paper,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React, { useState } from "react";
import AlertNotification from "../formComponents/AlertNotification";
import Button from "../formComponents/Button";
import useTable from "../formComponents/useTable";
import Popup from "../Popup";
import * as UserControl from "../UserControl";
import { User } from "../UserControl";
import UsersForm from "./UsersForm";
import { usersHeaderCells } from "../../helpers";
import TableRowUser from "../TableRowUser";

const useStyles = makeStyles((customTheme) => ({
  container: {
    margin: customTheme.spacing(5),
    padding: customTheme.spacing(3),
  },
  addButton: {
    marginBottom: customTheme.spacing(4),
  },
  noDataCell: {
    fontWeight: "bold!important" as any,
    color: customTheme.palette.primary.main,
  },
}));

export default function UsersPage() {
  const classes = useStyles();

  const [openForm, setOpenForm] = useState(false);
  const [records, setRecords] = useState(UserControl.getUsers());
  const [editableRecord, setEditableRecord] = useState<User | null>(null);
  const [title, setFormTitle] = useState<string>();
  const { TableContainer, TableHeader } = useTable(records, usersHeaderCells);
  const [alertPopup, setAlertPopup] = useState({
    isTriggered: false,
    notificationMessage: "",
    typeOfNotification: "",
  });

  function addOrEdit(user: User, resetForm: () => void) {
    if (user.ID) {
      UserControl.updateUser(user);
      //alert("User Updated Successfully");
      setAlertPopup({
        isTriggered: true,
        notificationMessage: "User Updated Successfully",
        typeOfNotification: "info",
      });
    } else {
      UserControl.insertUser(user);
      // alert("User Added Successfully");
      setAlertPopup({
        isTriggered: true,
        notificationMessage: "User Added Successfully",
        typeOfNotification: "success",
      });
    }
    resetForm();

    setEditableRecord(null);
    setOpenForm(false);

    setRecords(UserControl.getUsers()); //update tabele nakon ubacivanja
  }

  const openPopup = (item: User, resetForm: void) => {
    setEditableRecord(item);
    setOpenForm(true);
    setFormTitle("UPDATE EXISTING USER");
  };

  const openFormAndSetTitle = () => {
    setOpenForm(true);
    setFormTitle("ADD NEW USER");
  };

  const onDelete = (id: string) => {
    if (window.confirm("Delete is permanent. Do you wish to proceed?")) {
      UserControl.deleteUser(id);
      setRecords(UserControl.getUsers()); //update tabele nakon izbacivanja
      setAlertPopup({
        isTriggered: true,
        notificationMessage: "User Deleted Successfully",
        typeOfNotification: "error",
      });
    }
  };
  return (
    <>
      <Paper className={classes.container}>
        <Button
          className={classes.addButton}
          text="Add New User"
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={openFormAndSetTitle}
        />
        <TableContainer>
          <TableHeader />
          <TableBody>
            {records.length !== 0 ? (
              records.map((item: User) => (
                <TableRowUser
                  item={item}
                  onDelete={onDelete}
                  openPopup={openPopup}
                />
              ))
            ) : (
              <TableRow selected={false}>
                <TableCell
                  colSpan={6}
                  align={"center"}
                  className={classes.noDataCell}
                >
                  NO DATA. Please Add a New User.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </TableContainer>
      </Paper>
      <Popup openForm={openForm} setOpenForm={setOpenForm} title={title}>
        <UsersForm
          editableRecord={editableRecord}
          addOrEdit={addOrEdit}
          setOpenForm={setOpenForm}
          setEditableRecord={setEditableRecord}
        />
      </Popup>
      <AlertNotification
        alertPopup={alertPopup}
        setAlertPopup={setAlertPopup}
      />
    </>
  );
}
