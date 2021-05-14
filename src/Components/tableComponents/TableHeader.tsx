import { IheaderCells } from "../../helpers";
import { TableCell, TableHead } from "@material-ui/core";

interface Props {
  headerCells: IheaderCells[];
}
const TableHeader: React.FC<Props> = ({ headerCells }) => {
  return (
    <TableHead>
      {headerCells.map((headerCells) => (
        <TableCell key={headerCells.id}>{headerCells.label}</TableCell>
      ))}
    </TableHead>
  );
};

export default TableHeader;
