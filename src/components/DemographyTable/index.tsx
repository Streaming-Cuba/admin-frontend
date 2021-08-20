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
import {useMemo} from "react";

type DemographicTableProps = {
  demographic: Demographic;
  disableTitle?: boolean
};

function DemographyTable({ demographic, disableTitle }: DemographicTableProps) {

  const totalLength = useMemo(
      () => Object
          .values(demographic)
          .reduce((previousValue, currentValue) => previousValue + currentValue),
      []
  )

  const percent = (value: number): string => `${(value*100/totalLength).toFixed(2)}%`

  return (
    <Table>
      <TableHead>
        {
          !disableTitle && <Typography>Demografía</Typography>
        }
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
            {percent(demographic["F.13-17"])}
          </TableCell>
          <TableCell align="right">
            {percent(demographic["M.13-17"])}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>18-24</TableCell>
          <TableCell align="right">
            {percent(demographic["F.18-24"])}
          </TableCell>
          <TableCell align="right">
            {percent(demographic["M.18-24"])}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>25-34</TableCell>
          <TableCell align="right">
            {percent(demographic["F.25-34"])}
          </TableCell>
          <TableCell align="right">
            {percent(demographic["M.25-34"])}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>35-44</TableCell>
          <TableCell align="right">
            {percent(demographic["F.35-44"])}
          </TableCell>
          <TableCell align="right">
            {percent(demographic["M.35-44"])}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>45-54</TableCell>
          <TableCell align="right">
            {percent(demographic["F.45-54"])}
          </TableCell>
          <TableCell align="right">
            {percent(demographic["M.45-54"])}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>55-64</TableCell>
          <TableCell align="right">
            {percent(demographic["F.55-64"])}
          </TableCell>
          <TableCell align="right">
            {percent(demographic["M.55-64"])}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>65 +</TableCell>
          <TableCell align="right">
            {percent(demographic["F.65+"])}
          </TableCell>
          <TableCell align="right">
            {percent(demographic["M.65+"])}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default DemographyTable;
