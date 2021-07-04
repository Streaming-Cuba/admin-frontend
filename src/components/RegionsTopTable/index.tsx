import {
  Table,
  TableHead,
  TableBody,
  Typography,
  TableRow,
  TableCell,
} from "@material-ui/core";
import { secondsToString } from "../../utils/FormatUtils";

type RegionsTopTableProps = {
  regions: { [key: string]: number };
};

function RegionsTopTable({ regions }: RegionsTopTableProps) {
  return (
    <Table>
      <TableHead>
        <Typography>5 Regiones con más tiempo de reproducción</Typography>
      </TableHead>
      <TableBody>
        {Object.keys(regions)
          .sort((a, b) => regions[b] - regions[a])
          .splice(0, 5)
          .map((value, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{value}</TableCell>
                <TableCell align="right">
                  {secondsToString(regions[value] / 1000)}
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
}

export default RegionsTopTable;
