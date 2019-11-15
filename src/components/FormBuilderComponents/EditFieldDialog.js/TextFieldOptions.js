import React, { Fragment } from "react";
import { Grid, FormControlLabel } from "@material-ui/core";
import { Field } from "react-final-form";
import { Checkbox, TextField } from "final-form-material-ui";

const TextFieldOptions = ({ values, marginType, ...otherProps }) => {
  return (
    <Fragment>
      <Grid item xs={12} md={6} lg={4}>
        <FormControlLabel
          label="Multiline"
          control={
            <Field name="multiline" component={Checkbox} type="checkbox" />
          }
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Field
          name="numRows"
          component={TextField}
          label="Number of Rows (Multiline)"
          placeholder="Number of rows"
          fullWidth
          type="number"
          margin={marginType}
          autoComplete="off"
          disabled={!values.multiline}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Field
          name="maxRows"
          component={TextField}
          label="Max. Number of Rows (Multiline)"
          placeholder="Máx rows"
          fullWidth
          type="number"
          margin={marginType}
          autoComplete="off"
          disabled={!values.multiline}
        />
      </Grid>
    </Fragment>
  );
};

export default TextFieldOptions;
