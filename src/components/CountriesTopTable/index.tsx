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
      .splice(0, 10);

    return topCountries.map((value, index) => {
      return (
        <TableRow key={index}>
          <TableCell className={classes.cellWithImg}>
            <img src={getFlagUrlByCountry(value)} />
            {value}
          </TableCell>
        </TableRow>
      );
    });
  };

  return (
    <Table>
      <TableHead>
          {
             !disableTitle && <Typography>10 Paises con más tiempo de reproducción</Typography>
          }
      </TableHead>
      <TableBody>
          {
              renderTopCountries()
          }
      </TableBody>
    </Table>
  );
}

export default CountriesTopTable;
