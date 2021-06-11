import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TablePagination,
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
  const pages = [5, 10, 20];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);

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
  const closePopup = () => {
    setEditableRecord(null);
    setOpenForm(false);
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
  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const populateTableAfterPaging = () => {
    return users.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };
  return (
    <>
      <Paper className="container">
        <div className="titleAndButton">
          <h2 className="tableTitle">USERS</h2>
          <Button
            // className={classes.addButton}
            className="newUserButton"
            size="small"
            text="Add New User"
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={openFormAndSetTitle}
          />
        </div>
        <TableContainer>
          <Table className="tableUsers">
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
                        key={item.ID}
                      />
                    ))
                ) : (
                  populateTableAfterPaging().map((item: User) => (
                    <TableRowUser
                      item={item}
                      openPopup={openPopup}
                      onDelete={onDelete}
                      key={item.ID}
                    />
                  ))
                )
              ) : (
                <TableRow selected={false}>
                  <TableCell
                    colSpan={6}
                    align={"center"}
                    className="noDataCell"
                  >
                    NO DATA. Please Add a New User.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          page={page}
          rowsPerPageOptions={pages}
          rowsPerPage={rowsPerPage}
          count={users.length}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <Popup openForm={openForm} title={title} onClick={() => closePopup()}>
        {filterCompanyID ? (
          <UsersForm
            className="usersForm"
            editableRecord={editableRecord}
            addOrEdit={addOrEdit}
            setOpenForm={setOpenForm}
            setEditableRecord={setEditableRecord}
            filterCompanyID={filterCompanyID}
          />
        ) : (
          <UsersForm
            className="usersForm"
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
