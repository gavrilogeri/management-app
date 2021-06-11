import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@material-ui/core";
import React from "react";
import { companiesHeaderCells } from "../../helpers";
import Button from "../formComponents/Button";
import TableHeader from "../tableComponents/TableHeader";
import { Company } from "../UserControl";
import AddIcon from "@material-ui/icons/Add";
import TableRowCompany from "../tableComponents/TableRowCompany";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const useStyles = makeStyles((customTheme) => ({
  container: {
    margin: customTheme.spacing(5),
    padding: customTheme.spacing(3),
  },
  addButton: {
    marginBottom: customTheme.spacing(4),
  },
  noDataCell: {
    fontWeight: "bold!important" as any,
    color: customTheme.palette.primary.main,
  },
  // table: {
  //   "& thead th": {
  //     fontWeight: "700",
  //     letterSpacing: "2px",
  //     color: "#fff",
  //     backgroundColor: customTheme.palette.primary.main,
  //   },
  //   "& tbody td": {
  //     fontWeight: "300",
  //   },
  //   "& tbody tr:hover": {
  //     backgroundColor: "#ebffff",
  //   },
  // },
}));
interface Props {
  openPopup: (item: Company, resetForm: void) => void;
  openFormAndSetTitle: () => void;
  onDelete: (id: string) => void;
}
const CompaniesTable: React.FC<Props> = ({
  openPopup,
  openFormAndSetTitle,
  onDelete,
}) => {
  const classes = useStyles();
  const companiesState = useSelector((state: RootState) => state.companies);

  return (
    <>
      <Paper className={classes.container}>
        <Button
          className={classes.addButton}
          text="Add New Company"
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={openFormAndSetTitle}
        />
        <TableContainer>
          <Table className="tableCompanies">
            <TableHeader headerCells={companiesHeaderCells} />
            <TableBody>
              {companiesState.length !== 0 ? (
                companiesState.map((item: Company) => (
                  <TableRowCompany
                    item={item}
                    openPopup={openPopup}
                    onDelete={onDelete}
                    key={item.ID}
                  />
                ))
              ) : (
                <TableRow selected={false}>
                  <TableCell
                    colSpan={6}
                    align={"center"}
                    className={classes.noDataCell}
                  >
                    NO DATA. Please Add a New Company.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};
export default CompaniesTable;
