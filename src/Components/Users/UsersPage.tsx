import { Button as MuiButton, makeStyles, Paper, TableBody, TableCell, TableRow } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import React, { useState } from "react";
import AlertNotification from "../formComponents/AlertNotification";
import Button from '../formComponents/Button';
import useTable, { IheaderCells } from "../formComponents/useTable";
import Popup from "../Popup";
import * as UserControl from "../UserControl";
import { Users } from '../UserControl';
import UsersForm from "./UsersForm";

// interface Props extends RouteComponentProps { }

const useStyles = makeStyles(customTheme => ({
    container: {
        margin: customTheme.spacing(5),
        padding: customTheme.spacing(3)
    },
    addButton: {
        marginBottom: customTheme.spacing(4)
    }
}))



export default function UsersPage() {


    const classes = useStyles();

    //niz key-value objekata za naslovne celije u tabeli
    const headerCells: IheaderCells[] = [
        { id: "firstName", label: "First Name" },
        { id: "lastName", label: "Last Name" },
        { id: "DOB", label: "Date of Birth" },
        { id: "companyName", label: "Company Name" },
        { id: "position", label: "position" },
        { id: "actions", label: "Record Action" }
    ]


    const [openForm, setOpenForm] = useState(false); //Otvara Popup formu u zavisnosti jel true ili false
    const [records, setRecords] = useState(UserControl.getUsers()); //Povlacenje podataka o Userima iz LocalStorage
    const [editableRecord, setEditableRecord] = useState(null); // setuje null ili Usera za editovanje
    const [title, setFormTitle] = useState<string>(); //za razlicit title u zavisnosti da li je Update ili Add User
    const { TableContainer, TableHeader } = useTable(records, headerCells); //Ubacivanje iz useTable
    const [alertPopup, setAlertPopup] = useState({ isTriggered: false, notificationMessage: '', typeOfNotification: '' }); // popup Alert za uspesno dodavanje, updateovanje, brisanje



    function addOrEdit(user: Users, resetForm: any) {
        if (user.ID === "") {
            UserControl.insertUser(user);
            // alert("User Added Successfully");
            setAlertPopup({ isTriggered: true, notificationMessage: "User Added Successfully", typeOfNotification: "success" })
        }
        else {
            UserControl.updateUser(user);
            //alert("User Updated Successfully");
            setAlertPopup({ isTriggered: true, notificationMessage: "User Updated Successfully", typeOfNotification: "info" })
        }
        resetForm();

        setEditableRecord(null);
        setOpenForm(false);

        setRecords(UserControl.getUsers()) //update tabele nakon ubacivanja


    }

    const openPopup = (item: any) => {
        setEditableRecord(item);
        setOpenForm(true);
        setFormTitle("UPDATE EXISTING USER");
    }

    const openFormAndSetTitle = () => {
        setOpenForm(true);
        setFormTitle("ADD NEW USER")
    }

    const onDelete = (id: string) => {
        if (window.confirm("Delete is permanent. Do you wish to proceed?")) {
            UserControl.deleteUser(id);
            setRecords(UserControl.getUsers()) //update tabele nakon izbacivanja
            setAlertPopup({ isTriggered: true, notificationMessage: "User Deleted Successfully", typeOfNotification: "error" })
        }
    }
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
                        {
                            records.map((item: Users) => (
                                <TableRow key={item.ID}>
                                    <TableCell>{item.firstName}</TableCell>
                                    <TableCell>{item.lastName}</TableCell>
                                    <TableCell>{item.DOB}</TableCell>
                                    <TableCell>{item.companyName}</TableCell>
                                    <TableCell>{item.Position}</TableCell>
                                    <TableCell>
                                        <MuiButton
                                            color="primary"
                                            onClick={() => { openPopup(item) }}>
                                            <EditOutlinedIcon fontSize="small" />
                                            Edit
                                        </MuiButton>
                                        <MuiButton
                                            color="secondary"
                                            onClick={() => { onDelete(item.ID) }}>
                                            <HighlightOffIcon fontSize="small" />
                                            Delete
                                        </MuiButton>
                                    </TableCell>


                                </TableRow>
                            ))
                        }
                    </TableBody>
                </TableContainer>

            </Paper >
            <Popup
                openForm={openForm}
                setOpenForm={setOpenForm}
                title={title}>


                <UsersForm
                    editableRecord={editableRecord}
                    addOrEdit={addOrEdit}
                    setOpenForm={setOpenForm}
                    setEditableRecord={setEditableRecord} />
            </Popup>
            <AlertNotification alertPopup={alertPopup} setAlertPopup={setAlertPopup} />
        </>
    );
};