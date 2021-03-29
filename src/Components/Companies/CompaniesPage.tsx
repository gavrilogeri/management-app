import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles, Paper, TableBody, TableContainer, TableCell, TableRow } from "@material-ui/core"
import Button from "../formComponents/Button";
import useTable, { IheaderCells } from "../formComponents/useTable";
import * as UserControl from "../UserControl";
import { Companies } from "../UserControl";
import CompaniesForm from "./CompaniesForm";
import { Button as MuiButton } from '@material-ui/core';
import Popup from "../Popup";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import UsersPage from "../Users/UsersPage";
import AlertNotification from "../formComponents/AlertNotification";
import { Alert } from "@material-ui/lab";

// interface Props { }

const useStyles = makeStyles(customTheme => ({
    container: {
        margin: customTheme.spacing(5),
        padding: customTheme.spacing(3)
    },
    addButton: {
        marginBottom: customTheme.spacing(4)
    }
}))



export default function CompaniesPage(props: any) {


    const headerCells: IheaderCells[] = [
        { id: "Name", label: "Name" },
        { id: "City", label: "City" },
        { id: "Country", label: "Country" },
        { id: "usersNumber", label: "No. of Users" },
        { id: "actions", label: "Record Action" }
    ]

    const classes = useStyles();
    const [records, setRecords] = useState(UserControl.getAllCompanies()); //Povlacenje podataka o Userima iz LocalStorage
    const { TableContainer, TableHeader } = useTable(records, headerCells);
    const [openForm, setOpenForm] = useState(false);
    const [editableRecord, setEditableRecord] = useState(null);
    const [title, setFormTitle] = useState<string>();
    const [alertPopup, setAlertPopup] = useState({ isTriggered: false, notificationMessage: '', typeOfNotification: '' });

    function addOrEdit(company: Companies, resetForm: any) {
        if (company.ID === "") {
            UserControl.insertCompany(company);
            setAlertPopup({ isTriggered: true, notificationMessage: "Company Added Successfully", typeOfNotification: "success" })
        }
        else {
            UserControl.updateCompany(company);
            setAlertPopup({ isTriggered: true, notificationMessage: "Company Updated Successfully", typeOfNotification: "info" })
        }
        resetForm();

        setEditableRecord(null);
        setOpenForm(false);

        setRecords(UserControl.getAllCompanies()) //update tabele nakon ubacivanja


    }
    const openFormAndSetTitle = () => {
        setOpenForm(true);
        setFormTitle("ADD NEW COMPANY")
    }

    const openPopup = (item: any) => {
        setEditableRecord(item);
        setOpenForm(true);
        setFormTitle("UPDATE EXISTING COMPANY");

    }
    //records, headerCells
    const onDelete = (id: string) => {
        if (window.confirm("Delete is permanent. Do you wish to proceed?")) {
            UserControl.deleteCompany(id);
            setRecords(UserControl.getAllCompanies()) //update tabele nakon izbacivanja
            setAlertPopup({ isTriggered: true, notificationMessage: "User Deleted Successfully", typeOfNotification: "error" })
        }
    }
    return (
        <>
            <Paper className={classes.container}>
                {/* <CompaniesForm /> */}
                <Button
                    className={classes.addButton}
                    text="Add New Company"
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={openFormAndSetTitle}
                />
                <TableContainer>
                    <TableHeader />
                    <TableBody>
                        {
                            records.map((item: Companies) => (
                                <TableRow key={item.ID}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.city}</TableCell>
                                    <TableCell>{item.country}</TableCell>
                                    <TableCell>{item.users.length}</TableCell>

                                    <TableCell>
                                        <MuiButton
                                            color="primary"
                                            onClick={() => { openPopup(item) }}
                                        >
                                            <EditOutlinedIcon fontSize="small" />
                                            Edit
                                        </MuiButton>
                                        <MuiButton
                                            color="secondary"
                                            onClick={() => { onDelete(item.ID) }}
                                        >
                                            <HighlightOffIcon fontSize="small" />
                                            Delete
                                        </MuiButton>
                                    </TableCell>


                                </TableRow>
                            ))
                        }
                    </TableBody>
                </TableContainer>
            </Paper>
            <Popup
                openForm={openForm}
                setOpenForm={setOpenForm}
                title={title}>


                <CompaniesForm
                    editableRecord={editableRecord}
                    addOrEdit={addOrEdit}
                    setOpenForm={setOpenForm}
                    setEditableRecord={setEditableRecord} />
            </Popup>
            <AlertNotification alertPopup={alertPopup} setAlertPopup={setAlertPopup} />
        </>
    );
};
