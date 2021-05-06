import {
  createStyles,
  makeStyles,
  Table,
  TableCell,
  TableHead,
} from "@material-ui/core";
// import { IheaderCells } from '../Users/UsersPage'
import React from "react";
import { Companies, Users } from "../UserControl";
import customTheme from "../../CustomTheme";

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

export interface IheaderCells {
  id: string;
  label: string;
}

export default function useTable(
  records: Users[] | Companies[],
  headerCells: IheaderCells[]
) {
  const classes = useStyles();

  const TableContainer = (props: any) => (
    <Table className={classes.table}>{props.children}</Table>
  );

  const TableHeader = (props: any) => {
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
