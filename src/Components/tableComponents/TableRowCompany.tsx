import { Button, TableCell, TableRow } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import React from "react";
import { Company, getUsers, User } from "../UserControl";

interface Props {
  item: Company;
  openPopup: (item: Company, resetForm: void) => void;
  onDelete: (id: string) => void;
}

const TableRowUser: React.FC<Props> = ({ item, openPopup, onDelete }) => {
  return (
    <>
      {item.ID && (
        <TableRow key={item.ID}>
          <TableCell>{item.name}</TableCell>
          <TableCell>{item.city}</TableCell>
          <TableCell>{item.country}</TableCell>
          <TableCell>
            {
              getUsers().filter((user: User) => user.companyID === item.ID)
                .length
            }
          </TableCell>
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
      )}
    </>
  );
};

export default TableRowUser;
