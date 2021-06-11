import { TableCell, TableRow } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import React from "react";
import { getCompNameByCompID, User } from "../UserControl";
// import "/src/styles/appStyles.scss";

interface Props {
  item: User;
  openPopup: (item: User, resetForm: void) => void;
  onDelete: (id: string) => void;
}

const TableRowUser: React.FC<Props> = ({ item, openPopup, onDelete }) => {
  return (
    <>
      {item.ID && (
        <TableRow key={item.ID}>
          <TableCell>{item.firstName}</TableCell>
          <TableCell>{item.lastName}</TableCell>
          <TableCell>{item.DOB}</TableCell>
          <TableCell>{getCompNameByCompID(item.companyID)}</TableCell>
          <TableCell>{item.Position}</TableCell>
          <TableCell>
            <ul className="actionList">
              <li>
                <button
                  className="actionButton edit"
                  onClick={() => {
                    openPopup(item);
                  }}
                >
                  <EditOutlinedIcon fontSize="small" />
                  <span>EDIT</span>
                </button>
              </li>
              <li>
                <button
                  className="actionButton delete"
                  onClick={() => {
                    onDelete(item.ID!);
                  }}
                >
                  <HighlightOffIcon fontSize="small" />
                  <span>DELETE</span>
                </button>
              </li>
            </ul>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default TableRowUser;
