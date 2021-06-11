import { IheaderCells } from "../../helpers";
import { TableCell, TableHead, TableRow } from "@material-ui/core";

interface Props {
  headerCells: IheaderCells[];
}
const TableHeader: React.FC<Props> = ({ headerCells }) => {
  return (
    <TableHead>
      <TableRow>
        {headerCells.map((headerCells) => (
          <TableCell key={headerCells.id}>{headerCells.label}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
