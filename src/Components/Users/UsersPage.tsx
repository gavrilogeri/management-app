import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import * as UserControl from "../UserControl";
import UsersTable from "./UsersTable";

export default function UsersPage() {
  const [records, setRecords] = useState(UserControl.getUsers());

  return (
    <>
      <UsersTable users={records} setUsers={setRecords} />
    </>
  );
}
