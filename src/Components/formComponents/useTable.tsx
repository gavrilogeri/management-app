import {
  Button,
  createStyles,
  makeStyles,
  Table,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
// import { IheaderCells } from '../Users/UsersPage'
import React from "react";
import { Company, User } from "../UserControl";
import customTheme from "../../CustomTheme";
import { IheaderCells } from "../../helpers";

const useStyles = makeStyles((customTheme) => ({
  table: {
    "& thead th": {
      fontWeight: "700",
      letterSpacing: "2px",
      color: "#fff",
      backgroundColor: customTheme.palette.primary.main,
    },
    "& tbody td": {
      fontWeight: "300",
    },
    "& tbody tr:hover": {
      backgroundColor: "#ebffff",
    },
  },
}));

export default function useTable(
  records: User[] | Company[],
  headerCells: IheaderCells[]
) {
  const classes = useStyles();

  const TableContainer = (props: any) => (
    <Table className={classes.table}>{props.children}</Table>
  );

  const TableHeader = () => {
    return (
      <TableHead>
        {headerCells.map((headerCells) => (
          <TableCell key={headerCells.id}>{headerCells.label}</TableCell>
        ))}
      </TableHead>
    );
  };

  return {
    TableContainer,
    TableHeader,
  };
}
