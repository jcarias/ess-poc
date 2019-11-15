import React from "react";
import { Grid, FormLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(2)
  },
  padding: {
    padding: theme.spacing(0, 2)
  },
  cell: {
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    border: `1px solid ${theme.palette.primary.main}`,
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    "&:hover": {
      backgroundColor: theme.palette.primary.light
    }
  },
  selectedCell: {
    border: `1px solid ${theme.palette.primary.dark}`,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark
    }
  }
}));

const ColumnsInput = ({ input: { value, onChange }, label, ...props }) => {
  const cols = Array.from(Array(12));
  const classes = useStyles();
  const { cell, selectedCell } = classes;

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <FormLabel>{label}</FormLabel>
      </Grid>
      {cols.map((col, index) => (
        <Grid key={index} item xs={1}>
          <div
            className={classNames(cell, { [selectedCell]: index < value })}
            onClick={() => onChange(index + 1)}
          >
            {index + 1}
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default ColumnsInput;
