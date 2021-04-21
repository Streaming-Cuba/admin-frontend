import clsx from "clsx";
import { SyntheticEvent } from "react";
import useStyles from "./styles";

function TextField(props: TextFieldProps) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, classes.inputGroup)}>
      <span className={classes.adornment}>{props.startAdornment}</span>
      <input
        onChange={props.onChange && props.onChange}
        value={props.value || ""}
        placeholder={props.placeholder}
        type={props.type}
        className={classes.input}
      />
    </div>
  );
}

interface TextFieldProps {
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  startAdornment?: React.ReactNode;
  type?: string;
}

export default TextField;
