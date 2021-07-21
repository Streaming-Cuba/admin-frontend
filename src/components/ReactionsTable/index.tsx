import React from "react"
import {makeStyles, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@material-ui/core";

interface ReactionsTableProps {
    reactions: {[key: string]: number},
    disableTitle?: boolean
}

const useStyles = makeStyles(() => ({
    cellWithImg: {
        display: "flex",
        alignItems: "center",

        "& img": {
            marginRight: 5,
        }
    },
}))

export default function ReactionTable ({ reactions, disableTitle }: ReactionsTableProps): JSX.Element {

    const classes = useStyles()

    const getReactionImage = (reaction: string): string => {
        switch (reaction) {
            case "like":
                return "https://cdn.iconscout.com/icon/free/png-128/like-2387659-1991059.png";
            case "love":
                return "https://cdn.iconscout.com/icon/free/png-128/love-2387666-1991064.png";
            case "wow":
                return "https://cdn.iconscout.com/icon/free/png-128/wow-2387663-1991062.png";
            case "haha":
                return "https://cdn.iconscout.com/icon/free/png-128/haha-2387660-1991060.png";
            case "sorry":
                return "https://cdn.iconscout.com/icon/free/png-128/sad-2387665-1991063.png";
            case "anger":
                return "https://cdn.iconscout.com/icon/free/png-128/angry-2387661-1991061.png";
            default:
                return "";
        }
    };

    return (
        <Table>
            <TableHead>
                {
                    !disableTitle && <Typography>Reacciones</Typography>
                }
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell>Total de Reacciones:</TableCell>
                    <TableCell align="right">
                        {Object.values(reactions).reduce(
                            (previousValue, currentValue) =>
                                previousValue + currentValue
                        )}
                    </TableCell>
                </TableRow>
                {Object.keys(reactions).map((value, index) => (
                    <TableRow key={index}>
                        <TableCell className={classes.cellWithImg}>
                            <img
                                src={getReactionImage(value)}
                                style={{ maxWidth: "24px" }}
                            />
                            {value.charAt(0).toUpperCase() + value.slice(1)}
                        </TableCell>
                        <TableCell align="right">
                            {reactions[value]}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}