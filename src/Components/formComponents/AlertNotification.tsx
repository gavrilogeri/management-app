import { Snackbar } from "@material-ui/core";
import React from "react";
import { Alert } from "@material-ui/lab";
export default function AlertNotification(props: any) {
  const { alertPopup, setAlertPopup } = props;
  const setClose = () => {
    setAlertPopup({
      ...alertPopup,
      isTriggered: false,
    });
  };
  return (
    <div>
      <Snackbar
        open={alertPopup.isTriggered}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={setClose}
      >
        <Alert severity={alertPopup.typeOfNotification}>
          {alertPopup.notificationMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
