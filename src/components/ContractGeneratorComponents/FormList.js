import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Link
} from "@material-ui/core";
import ContractIcon from "@material-ui/icons/DescriptionOutlined";
import EditIcon from "@material-ui/icons/Edit";
import VerticalMenuIcon from "@material-ui/icons/MoreVert";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";

const useStyles = makeStyles(theme => {
  return {
    emptyListContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      height: "50vh"
    },
    contractAvatar: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText
    }
  };
});

const FormList = ({ formTemplates, handleRowClick, handleEditClick }) => {
  const classes = useStyles();

  if (isNil(formTemplates) || isEmpty(formTemplates)) {
    return (
      <div className={classes.emptyListContainer}>
        <Typography variant="h2" color="textSecondary">
          No Contract Forms exist
        </Typography>
        <Typography variant="body1" color="textSecondary">
          <Link>Create a new form</Link>
        </Typography>
      </div>
    );
  }
  return (
    <List>
      {formTemplates.map((template, index) => (
        <ListItem
          key={index}
          button
          divider
          onClick={() => handleRowClick(template)}
        >
          <ListItemAvatar>
            <Avatar className={classes.contractAvatar}>
              <ContractIcon fontSize={"large"} />
            </Avatar>
          </ListItemAvatar>

          <ListItemText
            primary={template.title}
            secondary={template.description}
          >
            as
          </ListItemText>
          <ListItemSecondaryAction>
            <React.Fragment>
              <IconButton
                color="primary"
                onClick={() => handleEditClick(template.id)}
              >
                <EditIcon />
              </IconButton>
              <IconButton>
                <VerticalMenuIcon />
              </IconButton>
            </React.Fragment>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default FormList;
