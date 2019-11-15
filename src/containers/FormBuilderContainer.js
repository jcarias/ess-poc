import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import BackIcon from "@material-ui/icons/ArrowBack";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import {
  addTemplateAction,
  updateTemplateAction
} from "../store/actions/TemplatesActions";
import { Grid, Box, Divider } from "@material-ui/core";
import FormBuilder from "../components/FormBuilderComponents/FormBuilder";
import uuid from "uuid/v4";
import SortableTable, { Actions } from "../components/SortTable/SortableTable";
import { deepClone, moveArrayElement } from "../utils/utils";
import EditFieldDialog from "../components/FormBuilderComponents/EditFieldDialog.js/EditFieldDialog";
import ConfirmDialog from "../components/ConfirmDialog";
import styled from "styled-components";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  titleContainer: {
    flexGrow: 1
  }
});

const fieldTemplate = {
  id: "",
  name: "",
  label: "",
  type: "text",
  multiline: false,
  options: [],
  xsCols: 12
};

const VerticalContainer = styled.div`
  height: calc(100vh - 64px);
  padding: 16px;
  overflow: auto;
  background-color: ${props => (props.left ? "#F0F0F0" : "transparent")};
`;

class FormBuilderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      template: {
        id: "",
        title: "",
        description: "",
        eSignTemplateName: "",
        active: true,
        fields: [],
        primary: "#f44336",
        secondary: "#2196f3",
        customFont: "Roboto"
      },
      templateId: null,
      isEditDialogOpen: false,
      isConfirmDeleteOpen: false,
      selectedField: fieldTemplate
    };
  }

  componentDidMount() {
    const foundTemplate = this.props.templates.find(
      template => template.id === this.props.match.params.templateId
    );
    if (foundTemplate !== undefined) {
      this.setState({
        templateId: this.props.match.params.templateId,
        template: foundTemplate
      });
    }
  }

  handleChange = ev => {
    if (ev.target) {
      this.setState({
        ...this.state,
        template: { ...this.state.template, [ev.target.name]: ev.target.value }
      });
    }
  };

  save = () => {
    if (this.state.templateId) {
      this.props.updateTemplate(this.state.template);
    } else {
      this.props.createTemplate({ ...this.state.template, id: uuid() });
    }
    this.props.history.push("/");
  };

  handleItemAction = (action, item) => {
    switch (action) {
      case Actions.edit:
        this.setState({ isEditDialogOpen: true, selectedField: item });
        break;
      case Actions.add:
        const template = deepClone(fieldTemplate);
        this.setState({ isEditDialogOpen: true, selectedField: template });
        break;
      case Actions.delete:
        this.setState({
          isConfirmDeleteOpen: true,
          selectedField: item
        });
        break;

      default:
        break;
    }
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    const newFields = deepClone(this.state.template.fields);
    const swappedFields = moveArrayElement(newFields, oldIndex, newIndex);
    this.setState({
      template: { ...this.state.template, fields: swappedFields }
    });
  };

  closeEditDialog = () => {
    this.setState({ isEditDialogOpen: false, selectedField: fieldTemplate });
  };

  closeConfirmDeleteDialog = () => {
    this.setState({ isConfirmDeleteOpen: false, selectedField: fieldTemplate });
  };

  handleFieldEditSubmit = field => {
    let tempFields = deepClone(this.state.template.fields);
    const fieldIndex = tempFields.findIndex(
      tempField => tempField.id === field.id
    );
    if (fieldIndex >= 0) {
      tempFields.splice(fieldIndex, 1, field);
    } else {
      //Is a new field...
      const newId = uuid();
      tempFields = [...tempFields, { ...field, id: newId }];
    }

    this.setState({
      template: { ...this.state.template, fields: tempFields },
      selectedField: fieldTemplate,
      isEditDialogOpen: false
    });
  };

  handleConfirmDeleteField = () => {
    console.log(this.state.selectedField);
    let tempFields = deepClone(this.state.template.fields);
    const newFields = tempFields.filter(
      field => field.id !== this.state.selectedField.id
    );

    this.setState({
      template: { ...this.state.template, fields: newFields },
      selectedField: fieldTemplate,
      isConfirmDeleteOpen: false
    });
  };

  render() {
    const { classes, history } = this.props;

    return (
      <Fragment>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={() => history.push("/")}
            >
              <BackIcon />
            </IconButton>
            <div className={classes.titleContainer}>
              <Typography variant="h6" component="span">
                Form Builder:{" "}
                <Typography variant="subtitle1" component="span">
                  {this.state.template.title}
                </Typography>
              </Typography>
            </div>
            <Button color="inherit" onClick={() => history.push("/")}>
              Cancel
            </Button>
            <Button color="inherit" variant="outlined" onClick={this.save}>
              Save
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <VerticalContainer left>
              <FormBuilder
                template={this.state.template}
                handleChange={this.handleChange}
              />
            </VerticalContainer>
          </Grid>
          <Grid item xs={12} sm={6} md={8} lg={9} xl={10}>
            <VerticalContainer>
              <Grid container spacing={2} style={{ padding: 8 }}>
                <Grid item xs={12}>
                  <Typography variant="h6" color="textSecondary">
                    <strong>Form Fields</strong>
                  </Typography>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <SortableTable
                    items={this.state.template.fields}
                    onItemAction={this.handleItemAction}
                    onSortEnd={this.onSortEnd}
                  />
                </Grid>
              </Grid>
            </VerticalContainer>
          </Grid>
        </Grid>
        <EditFieldDialog
          open={this.state.isEditDialogOpen}
          handleClose={this.closeEditDialog}
          field={this.state.selectedField}
          onSubmit={this.handleFieldEditSubmit}
        />
        <ConfirmDialog
          open={this.state.isConfirmDeleteOpen}
          handleClose={this.closeConfirmDeleteDialog}
          title={`Delete Field?`}
          contentText={`Are you sure you want to delete the field named '${this.state.selectedField.name}'? This cannot be undone!`}
          handleConfirm={this.handleConfirmDeleteField}
        ></ConfirmDialog>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    templates: state.TemplatesReducer.templates
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createTemplate: template => {
      dispatch(addTemplateAction(template));
    },
    updateTemplate: template => {
      dispatch(updateTemplateAction(template));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(FormBuilderContainer)));
