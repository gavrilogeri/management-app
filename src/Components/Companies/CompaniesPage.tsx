import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import AlertNotification from "../formComponents/AlertNotification";
import Popup from "../Popup";
import * as UserControl from "../UserControl";
import { Company } from "../UserControl";
import CompaniesForm from "./CompaniesForm";
import CompaniesTable from "./CompaniesTable";

const useStyles = makeStyles((customTheme) => ({
  container: {
    margin: customTheme.spacing(5),
    padding: customTheme.spacing(3),
  },
  addButton: {
    marginBottom: customTheme.spacing(4),
  },
}));

export default function CompaniesPage() {
  const [records, setRecords] = useState(UserControl.getAllCompanies());
  const [openForm, setOpenForm] = useState(false);
  const [editableRecord, setEditableRecord] = useState<Company | null>(null);
  const [title, setFormTitle] = useState<string>();
  const [alertPopup, setAlertPopup] = useState({
    isTriggered: false,
    notificationMessage: "",
    typeOfNotification: "",
  });

  function addOrEdit(company: Company, resetForm: any) {
    if (company.ID === "") {
      UserControl.insertCompany(company);
      setAlertPopup({
        isTriggered: true,
        notificationMessage: "Company Added Successfully",
        typeOfNotification: "success",
      });
    } else {
      UserControl.updateCompany(company);
      setAlertPopup({
        isTriggered: true,
        notificationMessage: "Company Updated Successfully",
        typeOfNotification: "info",
      });
    }
    resetForm();

    setEditableRecord(null);
    setOpenForm(false);

    setRecords(UserControl.getAllCompanies());
  }
  const openFormAndSetTitle = () => {
    setOpenForm(true);
    setFormTitle("ADD NEW COMPANY");
  };

  const openPopup = (item: any) => {
    setEditableRecord(item);
    setOpenForm(true);
    setFormTitle("UPDATE EXISTING COMPANY");
  };
  //records, headerCells
  const onDelete = (id: string) => {
    if (window.confirm("Delete is permanent. Do you wish to proceed?")) {
      UserControl.deleteCompany(id);
      setRecords(UserControl.getAllCompanies());
      setAlertPopup({
        isTriggered: true,
        notificationMessage: "User Deleted Successfully",
        typeOfNotification: "error",
      });
    }
  };
  return (
    <>
      <CompaniesTable
        companies={records}
        onDelete={onDelete}
        openFormAndSetTitle={openFormAndSetTitle}
        openPopup={openPopup}
        setCompanies={setRecords}
      />
      <Popup openForm={openForm} title={title}>
        <CompaniesForm
          editableRecord={editableRecord}
          addOrEdit={addOrEdit}
          setOpenForm={setOpenForm}
          openForm={openForm}
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
