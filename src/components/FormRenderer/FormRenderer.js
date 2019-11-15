import React, { Component, Fragment } from "react";
import { Form, Field, useField } from "react-final-form";
import { TextField, Checkbox, Select, Radio } from "final-form-material-ui";

import {
  Grid,
  Button,
  MenuItem,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  FormHelperText,
  Box,
  Typography,
  Divider
} from "@material-ui/core";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";

const SelectField = ({ field, ...props }) => {
  return (
    <Field
      name={field.name}
      label={field.label}
      formControlProps={{
        fullWidth: true,
        margin: "dense",
        required: field.required
      }}
      component={Select}
      fullWidth
      {...props}
    >
      {field.options &&
        field.options.map((option, key) => (
          <MenuItem key={key} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
    </Field>
  );
};

const RadioGroupControl = ({ field }) => {
  const ff = useField(field.name);
  const showError =
    ((ff.meta.submitError && !ff.meta.dirtySinceLastSubmit) || ff.meta.error) &&
    ff.meta.touched;

  return (
    <FormControl component="fieldset" error={showError}>
      <FormLabel component="legend">{`${field.label}${
        field.required ? "*" : ""
      }`}</FormLabel>
      <RadioGroup row>
        {field.options.map((option, key) => (
          <FormControlLabel
            key={key}
            label={option.label}
            control={
              <Field
                name={field.name}
                component={Radio}
                type="radio"
                value={option.value}
              />
            }
          />
        ))}
      </RadioGroup>
      {showError && (
        <FormHelperText>{ff.meta.error || ff.meta.submitError}</FormHelperText>
      )}
    </FormControl>
  );
};

class FormRenderer extends Component {
  constructor(props) {
    super(props);
    this.state = { values: {} };
  }

  getComponentForType = field => {
    switch (field.type) {
      case "check":
        return Checkbox;
      default:
        return TextField;
    }
  };

  buildField = field => {
    switch (field.type) {
      case "select":
        return <SelectField field={field} />;
      case "radio":
        return <RadioGroupControl field={field} />;
      case "checkbox":
        return (
          <FormControlLabel
            label={field.label}
            control={
              <Field
                name={field.name}
                component={Checkbox}
                label={field.label}
                margin={"dense"}
                type={field.type}
              />
            }
          />
        );
      case "divider":
        return (
          <Fragment>
            <Box mt={4}>
              <Typography
                variant={field.textVariant || "h6"}
                color="textSecondary"
              >
                {field.label}
              </Typography>
            </Box>
            <Divider />
          </Fragment>
        );
      case "textBlock":
        return (
          <Typography variant={field.textVariant || "caption"}>
            {field.label}
          </Typography>
        );
      default:
        return (
          <Field
            required={field.required}
            name={field.name}
            component={this.getComponentForType(field.type)}
            label={field.label}
            multiline={field.multiline}
            margin={"dense"}
            fullWidth
            type={field.type}
          />
        );
    }
  };

  validate = values => {
    let errors = {};
    const { fields } = this.props;

    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];

      //Required field validation
      if (isEmpty(values[field.name]) && field.required) {
        errors[field.name] = "Campo obrigatório!";
      }

      //RegExp pattern validation
      if (!isNil(field.regEx) && !isEmpty(field.regEx)) {
        const regEx = new RegExp(field.regEx);
        if (!regEx.test(values[field.name])) {
          errors[field.name] = field.regEx_message;
        }
      }
    }

    return errors;
  };

  render() {
    const { fields } = this.props;

    if (isNil(fields) || isEmpty(fields)) return null;
    else
      return (
        <div style={{ padding: 16, marginTop: 64 }}>
          <Form
            onSubmit={this.props.onFormSubmit}
            validate={this.validate}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
              <form onSubmit={handleSubmit}>
                <Grid container alignItems="flex-start" spacing={2}>
                  {fields.map((field, key) => (
                    <Fragment key={key}>
                      <Grid item xs={field.xsCols || 12}>
                        {this.buildField(field)}
                      </Grid>
                      {field.fillRow && field.xsCols && (
                        <Grid
                          key={key}
                          item
                          xs={12 - (field.xsCols || 0)}
                        ></Grid>
                      )}
                    </Fragment>
                  ))}
                  <Grid item xs></Grid>
                  <Grid item>
                    <Box mt={3}>
                      <Button type="submit" color="primary" variant="contained">
                        Generate Contract
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            )}
          ></Form>
        </div>
      );
  }
}

export default FormRenderer;
