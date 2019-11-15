import React from "react";
import { Grid, TextField, Typography, Box, Divider } from "@material-ui/core";
import ColorSelect from "../ColorSelect";
import FontSelect from "../FontSelect";

const TemplateFormSettings = ({ template, handleChange }) => {
  return (
    <Grid container spacing={2} style={{ padding: 8 }}>
      <Grid item xs={12}>
        <Typography variant="h6" color="textSecondary">
          <strong>Form Settings</strong>
        </Typography>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="title"
          label="Title"
          fullWidth
          onChange={handleChange}
          value={template.title}
          autoComplete="off"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="description"
          label="Description"
          fullWidth
          onChange={handleChange}
          value={template.description}
          autoComplete="off"
          multiline
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="eSignTemplateName"
          label="E-Sign template name"
          fullWidth
          onChange={handleChange}
          value={template.eSignTemplateName}
          autoComplete="off"
        />
      </Grid>
      <Grid item xs={12}>
        <Box pt={3}>
          <Typography variant="subtitle1" color="textSecondary">
            <strong>Display Settings</strong>
          </Typography>
          <Divider />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <ColorSelect
          name="primary"
          label="Primary color"
          value={template.primary}
          handleChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <ColorSelect
          name="secondary"
          label="Secondary color"
          value={template.secondary}
          handleChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <FontSelect
          name="customFont"
          label="Form font"
          value={template.customFont}
          handleChange={handleChange}
        />
      </Grid>
    </Grid>
  );
};

export default TemplateFormSettings;
