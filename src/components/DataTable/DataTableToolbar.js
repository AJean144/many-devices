import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/AddToQueueRounded";

const DataTableToolbar = (props) => {
  const { numSelected, handleOpen, handleDelete } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Devices
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <div style={{ display: "flex", flexDirection: "row", width: 110 }}>
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            <AddIcon />
          </Button>
        </div>
      )}
    </Toolbar>
  );
};

DataTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  handleOpen: PropTypes.func.isRequired,
};

export default DataTableToolbar;
