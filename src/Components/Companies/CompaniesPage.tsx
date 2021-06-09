import React, { useState } from "react";
import { useDispatch } from "react-redux";
import AlertNotification from "../formComponents/AlertNotification";
import Popup from "../Popup";
import { Company } from "../UserControl";
import CompaniesForm from "./CompaniesForm";
import { addCompany, editCompany, removeCompany } from "./companiesSlice";
import CompaniesTable from "./CompaniesTable";

export default function CompaniesPage() {
  const [openForm, setOpenForm] = useState(false);
  const [editableRecord, setEditableRecord] = useState<Company | null>(null);
  const [title, setFormTitle] = useState<string>();
  const [alertPopup, setAlertPopup] = useState({
    isTriggered: false,
    notificationMessage: "",
    typeOfNotification: "",
  });
  const dispatch = useDispatch();
  function addOrEdit(company: Company, resetForm: any) {
    if (company.ID === "") {
      dispatch(addCompany(company));
      setAlertPopup({
        isTriggered: true,
        notificationMessage: "Company Added Successfully",
        typeOfNotification: "success",
      });
    } else {
      dispatch(editCompany(company));
      setAlertPopup({
        isTriggered: true,
        notificationMessage: "Company Updated Successfully",
        typeOfNotification: "info",
      });
    }
    resetForm();

    setEditableRecord(null);
    setOpenForm(false);
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
  const closePopup = () => {
    setEditableRecord(null);
    setOpenForm(false);
  };
  //records, headerCells
  const onDelete = (id: string) => {
    if (window.confirm("Delete is permanent. Do you wish to proceed?")) {
      dispatch(removeCompany({ id }));
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
        onDelete={onDelete}
        openFormAndSetTitle={openFormAndSetTitle}
        openPopup={openPopup}
      />
      <Popup openForm={openForm} title={title} onClick={() => closePopup()}>
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
