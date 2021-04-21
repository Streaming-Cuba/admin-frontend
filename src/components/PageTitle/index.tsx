import { Typography } from "../Wrappers";

import useStyles from "./styles";

function PageTitle(props: {
  children?: any;
  title: string;
  subtitle?: string;
}) {
  var classes = useStyles();

  return (
    <div className={classes.pageTitleContainer}>
      <div>
        <Typography className={classes.typo} variant="h4" size="sm">
          {props.title}
        </Typography>
        {props.subtitle && (
          <Typography className={classes.typo} variant="h6" size="sm">
            {props.subtitle}
          </Typography>
        )}
      </div>

      <div className={classes.grow} />
      <div className={classes.content}>{props.children}</div>
    </div>
  );
}
export default PageTitle;
