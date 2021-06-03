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
import { connect } from "react-redux";
import { usersHeaderCells } from "../../helpers";
import { AppDispatch } from "../../store/store";
import AlertNotification from "../formComponents/AlertNotification";
import Button from "../formComponents/Button";
import Popup from "../Popup";
import TableHeader from "../tableComponents/TableHeader";
import TableRowUser from "../tableComponents/TableRowUser";
import { User } from "../UserControl";
import UsersForm from "./UsersForm";
import { addUser, editUser, removeUser } from "./usersSlice";

interface DispatchProps {
  onAddUser: (user: User) => void; //what type should this function be?Is this correct? Is this the correct way of doing dispatch logic with mapDispatchToProps?
  onEditUser: (user: User) => void;
  onDeleteUser: (id: string) => void;
}
interface Props {
  users: User[];
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
const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    onAddUser: (user: User) => dispatch(addUser(user)),
    onEditUser: (user: User) => dispatch(editUser(user)),
    onDeleteUser: (id: string) => dispatch(removeUser({ id })),
  };
};

const UsersTable: React.FC<Props & DispatchProps> = ({
  users,
  filterCompanyID,
  onAddUser,
  onEditUser,
  onDeleteUser,
}) => {
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
      onEditUser(user);
      setAlertPopup({
        isTriggered: true,
        notificationMessage: "User Updated Successfully",
        typeOfNotification: "info",
      });
    } else {
      onAddUser(user);
      setAlertPopup({
        isTriggered: true,
        notificationMessage: "User Added Successfully",
        typeOfNotification: "success",
      });
    }
    resetForm();
    setEditableRecord(null);
    setOpenForm(false);
  }

  const openPopup = (item: User) => {
    setEditableRecord(item);
    setOpenForm(true);
    setFormTitle("UPDATE EXISTING USER");
  };
  const onDelete = (id: string) => {
    if (window.confirm("Delete is permanent. Do you wish to proceed?")) {
      onDeleteUser(id);
      setAlertPopup({
        isTriggered: true,
        notificationMessage: "User Deleted Successfully",
        typeOfNotification: "error",
      });
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

export default connect(null, mapDispatchToProps)(UsersTable);
