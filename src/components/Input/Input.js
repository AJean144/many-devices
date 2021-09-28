import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function Input({
  label,
  variant,
  name,
  type = "text",
  onChange,
  value,
}) {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { width: "100%", margin: "16px 0" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        name={name}
        type={type}
        label={label}
        variant={variant}
        onChange={onChange}
        value={value}
      />
    </Box>
  );
}
