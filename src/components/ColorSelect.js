import React from "react";

import {
  MenuItem,
  Grid,
  FormControl,
  InputLabel,
  Select
} from "@material-ui/core";

const materialColors = [
  { name: "red", value: "#f44336" },
  { name: "pink", value: "#e91e63" },
  { name: "purple", value: "#9c27b0" },
  { name: "deepPurple", value: "#673ab7" },
  { name: "indigo", value: "#3f51b5" },
  { name: "blue", value: "#2196f3" },
  { name: "lightBlue", value: "#03a9f4" },
  { name: "cyan", value: "#00bcd4" },
  { name: "green", value: "#4caf50" },
  { name: "teal", value: "#009688" },
  { name: "lightGreen", value: "#8bc34a" },
  { name: "lime", value: "#cddc39" },
  { name: "yellow", value: "#ffeb3b" },
  { name: "amber", value: "#ffc107" },
  { name: "orange", value: "#ff9800" },
  { name: "deepOrange", value: "#ff5722" }
];

const ColorPreview = ({ colorCode }) => (
  <div
    style={{
      width: 19,
      height: 19,
      backgroundColor: colorCode,
      borderRadius: 4
    }}
  ></div>
);

const ColorSelect = ({ value, name, label, handleChange }) => {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select value={value} onChange={handleChange} name={name}>
        {materialColors.map((color, index) => (
          <MenuItem key={index} value={color.value}>
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <ColorPreview colorCode={color.value} />
              </Grid>
              <Grid item xs>
                {color.name}
              </Grid>
            </Grid>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ColorSelect;
