import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Typography,
} from "@material-ui/core";
import Demographic from "../../types/Demographic";
import { secondsToString } from "../../utils/FormatUtils";

type DemographicTableProps = {
  demographic: Demographic;
};

function DemographyTable({ demographic }: DemographicTableProps) {
  return (
    <Table>
      <TableHead>
        <Typography>Demografía</Typography>
        <TableRow>
          <TableCell>Rango de edad</TableCell>
          <TableCell align="right">Femenino</TableCell>
          <TableCell align="right">Masculino</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>13-17</TableCell>
          <TableCell align="right">
            {secondsToString(demographic["F.13-17"] / 1000)}
          </TableCell>
          <TableCell align="right">
            {secondsToString(demographic["M.13-17"] / 1000)}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>18-24</TableCell>
          <TableCell align="right">
            {secondsToString(demographic["F.18-24"] / 1000)}
          </TableCell>
          <TableCell align="right">
            {secondsToString(demographic["M.18-24"] / 1000)}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>25-34</TableCell>
          <TableCell align="right">
            {secondsToString(demographic["F.25-34"] / 1000)}
          </TableCell>
          <TableCell align="right">
            {secondsToString(demographic["M.25-34"] / 1000)}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>35-44</TableCell>
          <TableCell align="right">
            {secondsToString(demographic["F.35-44"] / 1000)}
          </TableCell>
          <TableCell align="right">
            {secondsToString(demographic["M.35-44"] / 1000)}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>45-54</TableCell>
          <TableCell align="right">
            {secondsToString(demographic["F.45-54"] / 1000)}
          </TableCell>
          <TableCell align="right">
            {secondsToString(demographic["M.45-54"] / 1000)}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>55-64</TableCell>
          <TableCell align="right">
            {secondsToString(demographic["F.55-64"] / 1000)}
          </TableCell>
          <TableCell align="right">
            {secondsToString(demographic["M.55-64"] / 1000)}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>65 +</TableCell>
          <TableCell align="right">
            {secondsToString(demographic["F.65+"] / 1000)}
          </TableCell>
          <TableCell align="right">
            {secondsToString(demographic["M.65+"] / 1000)}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default DemographyTable;
