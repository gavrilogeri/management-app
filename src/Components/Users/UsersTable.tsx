import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React, { useState } from "react";
import { usersHeaderCells } from "../../helpers";
import AlertNotification from "../formComponents/AlertNotification";
import Button from "../formComponents/Button";
import Popup from "../Popup";
import TableHeader from "../tableComponents/TableHeader";
import TableRowUser from "../tableComponents/TableRowUser";
import {
  deleteUser,
  getUsers,
  insertUser,
  updateUser,
  User,
} from "../UserControl";
import UsersForm from "./UsersForm";

interface Props {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  filterCompanyID?: string;
}
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
  table: {
    "& thead th": {
      fontWeight: "700",
      letterSpacing: "2px",
      color: "#fff",
      backgroundColor: customTheme.palette.primary.main,
    },
    "& tbody td": {
      fontWeight: "300",
    },
    "& tbody tr:hover": {
      backgroundColor: "#ebffff",
    },
  },
}));

const UsersTable: React.FC<Props> = ({ users, setUsers, filterCompanyID }) => {
  const [openForm, setOpenForm] = useState(false);
  const [editableRecord, setEditableRecord] = useState<User | null>(null);
  const [title, setFormTitle] = useState<string>();
  const [alertPopup, setAlertPopup] = useState({
    isTriggered: false,
    notificationMessage: "",
    typeOfNotification: "",
  });
  function addOrEdit(user: User, resetForm: () => void) {
    if (user.ID) {
      updateUser(user);
      //alert("User Updated Successfully");
      setAlertPopup({
        isTriggered: true,
        notificationMessage: "User Updated Successfully",
        typeOfNotification: "info",
      });
    } else {
      insertUser(user);
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

    setUsers(getUsers()); //update tabele nakon ubacivanja
  }

  const openPopup = (item: User) => {
    setEditableRecord(item);
    setOpenForm(true);
    setFormTitle("UPDATE EXISTING USER");
  };
  /////////////////////////////
  const onDelete = (id: string) => {
    if (window.confirm("Delete is permanent. Do you wish to proceed?")) {
      deleteUser(id);
      setUsers(getUsers()); //update tabele nakon izbacivanja
      setAlertPopup({
        isTriggered: true,
        notificationMessage: "User Deleted Successfully",
        typeOfNotification: "error",
      });
      // setUsers(getUsers());
    }
  };

  const openFormAndSetTitle = () => {
    setOpenForm(true);
    setFormTitle("ADD NEW USER");
  };

  const classes = useStyles();
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
          <Table className={classes.table}>
            <TableHeader headerCells={usersHeaderCells} />
            <TableBody>
              {users.length !== 0 ? (
                filterCompanyID ? (
                  users
                    .filter((item: User) => item.companyID === filterCompanyID)
                    .map((item: User) => (
                      <TableRowUser
                        item={item}
                        openPopup={openPopup}
                        onDelete={onDelete}
                      />
                    ))
                ) : (
                  users.map((item: User) => (
                    <TableRowUser
                      item={item}
                      openPopup={openPopup}
                      onDelete={onDelete}
                    />
                  ))
                )
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
          </Table>
        </TableContainer>
      </Paper>
      <Popup openForm={openForm} title={title}>
        {filterCompanyID ? (
          <UsersForm
            editableRecord={editableRecord}
            addOrEdit={addOrEdit}
            setOpenForm={setOpenForm}
            setEditableRecord={setEditableRecord}
            filterCompanyID={filterCompanyID}
          />
        ) : (
          <UsersForm
            editableRecord={editableRecord}
            addOrEdit={addOrEdit}
            setOpenForm={setOpenForm}
            setEditableRecord={setEditableRecord}
          />
        )}
      </Popup>
      <AlertNotification
        alertPopup={alertPopup}
        setAlertPopup={setAlertPopup}
      />
    </>
  );
};

export default UsersTable;
