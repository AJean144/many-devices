import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectInput({ name, onChange, value }) {
  const availableTypes = [
    { id: 1, type: "WINDOWS_WORKSTATION" },
    { id: 3, type: "WINDOWS_SERVER" },
    { id: 5, type: "MAC" },
  ];

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name={name}
          value={value}
          label="Select Type"
          onChange={onChange}
        >
          {availableTypes.map(({ id, type }) => (
            <MenuItem key={id} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
