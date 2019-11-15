import React from "react";
import {
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  TableFooter,
  Button
} from "@material-ui/core";
import { FieldArray } from "react-final-form-arrays";
import { Field } from "react-final-form";
import { TextField } from "final-form-material-ui";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const OptionsBuilder = ({ arrayName, push }) => {
  return (
    <Grid item xs={12}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell width="50%">Label</TableCell>
            <TableCell width="50%">Value</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <FieldArray name={arrayName}>
            {({ fields }) =>
              fields.map((name, index) => (
                <TableRow key={name}>
                  <TableCell align="right">{`${index + 1}`}</TableCell>
                  <TableCell>
                    <Field
                      name={`${name}.label`}
                      component={TextField}
                      placeholder="Label"
                      fullWidth
                      autoComplete="off"
                    />
                  </TableCell>
                  <TableCell>
                    {" "}
                    <Field
                      name={`${name}.value`}
                      component={TextField}
                      placeholder="value"
                      fullWidth
                      autoComplete="off"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => fields.remove(index)}
                    >
                      <RemoveCircleIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            }
          </FieldArray>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4} align="right">
              <Button onClick={() => push("options", { label: "", value: "" })}>
                <AddCircleIcon /> Add Option
              </Button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Grid>
  );
};

export default OptionsBuilder;
