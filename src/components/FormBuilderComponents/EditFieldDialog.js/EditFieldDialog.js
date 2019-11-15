import React, { Fragment, useState } from "react";

import { Form, Field, FormSpy } from "react-final-form";
import arrayMutators from "final-form-arrays";
import {
  Grid,
  MenuItem,
  Divider,
  Button,
  FormControlLabel,
  Paper,
  Tabs,
  Tab,
  Box,
  Badge,
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { TextField, Select, Checkbox } from "final-form-material-ui";
import isEmpty from "lodash/isEmpty";

import OptionsBuilder from "./OptionsBuilder";
import TextFieldOptions from "./TextFieldOptions";
import ColumnsInput from "./ColumnsInput";
import TabPanel from "./TabPanel";

const fieldTypes = [
  { value: "text", label: "Text field" },
  { value: "select", label: "Combo box" },
  { value: "checkbox", label: "Check box" },
  { value: "radio", label: "Radio group" }
];

const formElements = [
  { value: "divider", label: "Divider" },
  { value: "textBlock", label: "Text Block" }
];

const EditFieldDialog = ({ onSubmit, field, open, handleClose }) => {
  const [selTab, setSelTab] = useState(0);

  const validate = values => {
    //TODO: implement validation rules here
    const errors = {};
    if (isEmpty(values["name"])) {
      errors.name = "The field name is required";
    } else {
      const re = new RegExp("^[a-zA-Z0-9_]+$");
      if (!re.test(values["name"])) {
        errors.name =
          "Invalid field name. Only allowed letters, numbers and underscore (_)";
      }
    }

    if (isEmpty(values["label"])) {
      errors.label = "The field label is required";
    }

    return errors;
  };

  const handleChangeTab = (event, newValue) => {
    setSelTab(newValue);
  };

  const settingsErrorCounter = errors => {
    let total = 0;
    const settingsValues = ["name", "type", "label"];

    if (!isEmpty(errors)) {
      total = settingsValues.reduce((acc, value) => {
        return acc + (errors[value] ? 1 : 0);
      }, 0);
    }

    return total;
  };

  const marginType = "dense";

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={field}
      mutators={{
        ...arrayMutators
      }}
      render={({
        handleSubmit,
        values,
        form: {
          mutators: { push, pop }
        },
        form,
        submitting,
        pristine,
        invalid,
        ...rest
      }) => (
        <form onSubmit={handleSubmit}>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            fullWidth
            maxWidth="md"
          >
            <DialogTitle id="form-dialog-title">
              <Grid container alignItems="center">
                <Grid item xs>
                  Edit field
                </Grid>
                <Grid item>
                  <IconButton onClick={handleClose}>
                    <CloseIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </DialogTitle>
            <Divider />
            <DialogContent style={{ minHeight: "50vh" }}>
              <Box style={{ width: "100%" }}>
                <Paper square>
                  <Tabs
                    value={selTab}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChangeTab}
                    aria-label="disabled tabs example"
                  >
                    <Tab
                      label={
                        <Badge
                          color="error"
                          badgeContent={settingsErrorCounter(rest.errors)}
                        >
                          <span>Settings</span>
                        </Badge>
                      }
                    />
                    <Tab label="Field Options" />
                    <Tab label="Validation" />
                    <Tab label="Layout"></Tab>
                  </Tabs>
                </Paper>
                <TabPanel value={selTab} index={0}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} md={6} lg={4}>
                      <Field
                        name="type"
                        component={Select}
                        label="Type"
                        fullWidth
                        formControlProps={{
                          fullWidth: true,
                          margin: marginType
                        }}
                        margin={marginType}
                      >
                        {fieldTypes.map((type, key) => (
                          <MenuItem key={key} value={type.value}>
                            {type.label}
                          </MenuItem>
                        ))}
                        <Divider />
                        {formElements.map((type, key) => (
                          <MenuItem key={key} value={type.value}>
                            {type.label}
                          </MenuItem>
                        ))}
                      </Field>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <Field
                        name="name"
                        component={TextField}
                        label="Name"
                        placeholder="Component unique name"
                        fullWidth
                        margin={marginType}
                        autoComplete="off"
                      />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                      <Field
                        name="label"
                        component={TextField}
                        label="Label"
                        placeholder="Component display label"
                        fullWidth
                        margin={marginType}
                        autoComplete="off"
                      />
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value={selTab} index={1}>
                  <Grid container spacing={1}>
                    <FormSpy subscription={{ values: true }}>
                      {({ values }) =>
                        values.type === "text" && (
                          <TextFieldOptions
                            values={values}
                            marginType={marginType}
                          />
                        )
                      }
                    </FormSpy>
                    <FormSpy subscription={{ values: true }}>
                      {({ values }) =>
                        (values.type === "select" ||
                          values.type === "radio") && (
                          <OptionsBuilder arrayName="options" push={push} />
                        )
                      }
                    </FormSpy>
                  </Grid>
                </TabPanel>
                <TabPanel value={selTab} index={2}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} md={6} lg={4}>
                      <FormControlLabel
                        label="Required field"
                        control={
                          <Field
                            name="required"
                            component={Checkbox}
                            type="checkbox"
                          />
                        }
                      />
                    </Grid>
                    <FormSpy subscription={{ values: true }}>
                      {({ values }) =>
                        values.type === "text" && (
                          <Fragment>
                            <Grid item xs={12}>
                              <Divider />
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <Field
                                name="regEx"
                                component={TextField}
                                label="Regular Expression"
                                placeholder=""
                                fullWidth
                                type="text"
                                margin={marginType}
                                autoComplete="off"
                              />
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <Field
                                name="regEx_message"
                                component={TextField}
                                label="Error message"
                                placeholder=""
                                fullWidth
                                type="text"
                                margin={marginType}
                                autoComplete="off"
                                disabled={!values.regEx}
                              />
                            </Grid>
                          </Fragment>
                        )
                      }
                    </FormSpy>
                  </Grid>
                </TabPanel>
                <TabPanel value={selTab} index={3}>
                  <Box p={2}>
                    <FormSpy subscription={{ values: true }}>
                      {({ values }) => (
                        <Field
                          label={`Columns: ${values.xsCols}`}
                          name="xsCols"
                          component={ColumnsInput}
                        />
                      )}
                    </FormSpy>
                  </Box>
                  <Box p={2}>
                    <FormControlLabel
                      label="Fill the remaining row space?"
                      control={
                        <Field
                          name="fillRow"
                          component={Checkbox}
                          type="checkbox"
                        />
                      }
                    />
                  </Box>
                </TabPanel>
              </Box>
            </DialogContent>
            <Divider />
            <DialogActions>
              <Button
                disabled={submitting || pristine}
                onClick={form.reset}
                type="button"
                color="primary"
                variant="outlined"
              >
                Discard changes
              </Button>
              <Button
                type="button"
                onClick={() => {
                  form.reset();
                  return handleClose();
                }}
                color="secondary"
                variant="contained"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                disabled={pristine || invalid}
                onClick={form.submit}
              >
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </form>
      )}
    />
  );
};

export default EditFieldDialog;
