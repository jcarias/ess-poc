import React, { Fragment } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import isEmpty from "lodash/isEmpty";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Box,
  Grid,
  Typography,
  Button,
  TableFooter,
  Fab
} from "@material-ui/core";

import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

import "./SortListTest.css";

export const Actions = { add: "add", edit: "edit", delete: "delete" };

const SortableItem = SortableElement(
  ({ field, index, itemAction, ...otherProps }) => {
    return (
      <TableRow key={index} hover>
        <TableCell align="right" width="24px">
          <DragIndicatorIcon
            style={{ cursor: "row-resize" }}
            color="disabled"
          />
        </TableCell>

        <TableCell width="33%">{field.type}</TableCell>
        <TableCell width="33%">{field.name}</TableCell>
        <TableCell width="33%">{field.label}</TableCell>
        <TableCell nowrap="true">
          <IconButton onClick={() => itemAction(Actions.edit, field)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => itemAction(Actions.delete, field)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  }
);

const SortableList = SortableContainer(({ items, onItemAction }) => {
  return (
    <Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>

            <TableCell>
              <strong>Type</strong>
            </TableCell>
            <TableCell>
              <strong>Name</strong>
            </TableCell>
            <TableCell>
              <strong>Display Label</strong>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!isEmpty(items) ? (
            items.map((value, index) => {
              return (
                <SortableItem
                  key={`item-${index}`}
                  index={index}
                  idx={index}
                  field={value}
                  itemAction={onItemAction}
                />
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={6}>
                <Box p={3} m={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography
                        variant="subtitle1"
                        align="center"
                        color="textSecondary"
                      >
                        No items added yet.
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        variant="caption"
                        align="center"
                        color="textSecondary"
                        component="p"
                      >
                        Create a new field or choose from templates.
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Box m={2}>
                        <Grid
                          container
                          justify="center"
                          direction="row"
                          alignItems="center"
                          spacing={3}
                        >
                          <Grid item>
                            <Button color="primary" variant="outlined">
                              Choose template...
                            </Button>
                          </Grid>
                          <Grid item>
                            <Typography color="textSecondary" component="p">
                              or
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Button
                              color="primary"
                              variant="contained"
                              onClick={() => onItemAction(Actions.add)}
                            >
                              Create New Field
                            </Button>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        {!isEmpty(items) && (
          <TableFooter>
            <TableRow>
              <TableCell colSpan={6} align="right">
                {`${items.length} fields`}
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
      <Fab
        style={{ position: "fixed", bottom: 16, right: 16 }}
        onClick={() => onItemAction(Actions.add)}
        color="primary"
      >
        <AddIcon />
      </Fab>
    </Fragment>
  );
});

const SortableTable = ({ items, onSortEnd, onItemAction }) => {
  return (
    <SortableList
      helperClass={"helperClass"}
      distance={5}
      items={items}
      onSortEnd={onSortEnd}
      onItemAction={onItemAction}
    />
  );
};

export default SortableTable;
