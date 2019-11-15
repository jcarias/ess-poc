import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Grid, Divider } from "@material-ui/core";

import { withRouter } from "react-router-dom";
import FormList from "../components/ContractGeneratorComponents/FormList";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  mainGridContainer: {
    padding: theme.spacing(1)
  },
  mainGrid: {
    marginTop: theme.spacing(2)
  }
});

class ContractGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleRowClick = formTemplate => {
    console.log(formTemplate, this.props);
    this.props.history.push(`/form/${formTemplate.id}`);
  };

  render() {
    const { classes, templates, history } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" className={classes.title}>
              Contract Forms
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        <div className={classes.mainGridContainer}>
          <Grid container spacing={2} className={classes.mainGrid}>
            <Grid item xs>
              <Typography variant="h6" color="primary">
                Available contract templates
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => history.push("/builder")}
              >
                Create New
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Divider />
              <FormList
                formTemplates={templates}
                handleRowClick={formData => this.handleRowClick(formData)}
                handleEditClick={templateId =>
                  history.push(`/builder/${templateId}`)
                }
              />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    templates: state.TemplatesReducer.templates
  };
};
export default connect(mapStateToProps)(
  withRouter(withStyles(styles)(ContractGenerator))
);
