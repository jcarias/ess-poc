import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import styled from "styled-components";
import { E_SIGN_SERVER } from "../constants";

const ESignViewer = styled.iframe`
  width: 100%;
  height: calc(100vh - 100px);
  border: 1px solid black;
  margin-top: 64px;
`;

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

class ContractDisplayContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { formId: null, contractId: null, formData: { fields: [] } };
  }

  componentDidMount() {
    const foundTemplate = this.props.templates.find(
      template => template.id === this.props.match.params.formId
    );

    if (foundTemplate !== undefined) {
      this.setState({
        formId: this.props.match.params.formId,
        formData: foundTemplate,
        contractId: this.props.match.params.contractId
      });
    }
  }

  handleCloseButton = () => {
    this.props.history.push("/");
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
              {formData.title ? formData.title : <em>Unnamed Contract</em>}
            </Typography>
          </Toolbar>
        </AppBar>
        <ESignViewer
          src={`${E_SIGN_SERVER}/?session=${this.state.contractId}`}
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
export default connect(mapStateToProps)(withRouter(ContractDisplayContainer));
