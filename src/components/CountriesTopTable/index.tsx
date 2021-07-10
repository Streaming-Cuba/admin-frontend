import {
  Table,
  TableHead,
  TableBody,
  Typography,
  TableRow,
  TableCell,
} from "@material-ui/core";
import { getFlagUrlByCountry, secondsToString } from "../../utils/FormatUtils";
import useStyles from "./styles";
import React from "react";

type CountriesTopTableProps = {
  countries: { [key: string]: number };
  disableTitle?: boolean
};

function CountriesTopTable({ countries, disableTitle }: CountriesTopTableProps) {
  const classes = useStyles();

  const renderTopCountries = () => {
    let topCountries = Object.keys(countries)
      .sort((a, b) => countries[b] - countries[a])
      .splice(0, 5);

    return topCountries.map((value, index) => {
      return (
        <TableRow key={index}>
          <TableCell className={classes.cellWithImg}>
            <img src={getFlagUrlByCountry(value)} />
            {value}
          </TableCell>
          <TableCell align="right">{secondsToString(countries[value] * 60)}</TableCell>
        </TableRow>
      );
    });
  };

  return (
    <Table>
      <TableHead>
          {
             !disableTitle && <Typography>5 Paises con más tiempo de reproducción</Typography>
          }
      </TableHead>
      <TableBody>
          <TableRow>
              <TableCell>Total de Paises:</TableCell>
              <TableCell align="right">
                  {Object.keys(countries).length}
              </TableCell>
          </TableRow>
          {
              renderTopCountries()
          }
      </TableBody>
    </Table>
  );
}

export default CountriesTopTable;
