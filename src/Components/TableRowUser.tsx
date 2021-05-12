import { Button, TableCell, TableRow } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import React from "react";
import { User } from "./UserControl";

interface Props {
  item: User;
  openPopup: (item: User, resetForm: void) => void;
  onDelete: (id: string) => void;
}

const TableRowUser: React.FC<Props> = ({ item, openPopup, onDelete }) => {
  return (
    <TableRow key={item.ID}>
      <TableCell>{item.firstName}</TableCell>
      <TableCell>{item.lastName}</TableCell>
      <TableCell>{item.DOB}</TableCell>
      <TableCell>{item.companyName}</TableCell>
      <TableCell>{item.Position}</TableCell>
      <TableCell>
        <Button
          color="primary"
          onClick={() => {
            openPopup(item);
          }}
        >
          <EditOutlinedIcon fontSize="small" />
          Edit
        </Button>
        <Button
          color="secondary"
          onClick={() => {
            onDelete(item.ID!);
          }}
        >
          <HighlightOffIcon fontSize="small" />
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default TableRowUser;