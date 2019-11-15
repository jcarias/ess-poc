import React from "react";

import { MenuItem, FormControl, InputLabel, Select } from "@material-ui/core";

const customFonts = [
  { name: "Cuprum", value: "Cuprum" },
  { name: "Montserrat", value: "Montserrat" },
  { name: "Nunito", value: "Nunito" },
  { name: "OpenSansCondensed", value: "OpenSansCondensed" },
  { name: "Raleway", value: "Raleway" },
  { name: "Roboto", value: "Roboto" }
];

const FontSelect = ({ value, name, label, handleChange }) => {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select value={value} onChange={handleChange} name={name}>
        {customFonts.map((fontItem, index) => (
          <MenuItem key={index} value={fontItem.value}>
            <span
              style={{
                width: 19,
                height: 19,
                fontFamily: fontItem.value,
                borderRadius: 4
              }}
            >
              {fontItem.name}
            </span>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FontSelect;
