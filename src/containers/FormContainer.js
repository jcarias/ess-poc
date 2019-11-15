import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import FormRenderer from "../components/FormRenderer/FormRenderer";
import { E_SIGN_SERVER, E_SIGN_CREATE_DOCUMENT } from "../constants";
import Axios from "axios";
import { parseFormDataIntoESignData } from "../utils/FormDataUtils";

const customTheme = (
  primaryColor = "#3f51b5",
  secondaryColor = "#f50057",
  customFont = "Raleway"
) =>
  createMuiTheme({
    palette: {
      primary: {
        main: primaryColor
      },
      secondary: {
        main: secondaryColor
      }
    },
    typography: {
      fontFamily: customFont
    }
  });

class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { formData: { fields: [] } };
  }

  componentDidMount() {
    const foundTemplate = this.props.templates.find(
      template => template.id === this.props.match.params.formId
    );
    console.log(foundTemplate);
    if (foundTemplate !== undefined) {
      this.setState({
        formId: this.props.match.params.formId,
        formData: foundTemplate
      });
    }
  }

  handleCloseButton = () => {
    this.props.history.push("/");
  };

  handleFormSubmit = values => {
    const parsedData = parseFormDataIntoESignData(
      values,
      this.state.formData.fields
    );
    const data = {
      template: this.state.formData.eSignTemplateName,
      ...parsedData
    };

    Axios.post(`${E_SIGN_SERVER}/${E_SIGN_CREATE_DOCUMENT}`, data, {
      headers: { "Content-Type": "application/json" },
      responseType: "json"
    })
      .then(response =>
        this.props.history.push(
          `/template/${this.state.formId}/contract/${response.data.Data.id}`
        )
      )
      .catch(error => console.error(error));
  };

  render() {
    const { formData } = this.state;
    return (
      <ThemeProvider
        theme={customTheme(
          formData.primary,
          formData.secondary,
          formData.customFont
        )}
      >
        <AppBar>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={this.handleCloseButton}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6">
              {formData.title ? formData.title : <em>Unnamed Form</em>}
            </Typography>
          </Toolbar>
        </AppBar>
        <FormRenderer
          fields={formData.fields}
          onFormSubmit={this.handleFormSubmit}
        />
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    templates: state.TemplatesReducer.templates
  };
};
export default connect(mapStateToProps)(withRouter(FormContainer));
