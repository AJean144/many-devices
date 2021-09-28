import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ModalDisplay from "./components/ModalDisplay";
import Input from "./components/Input";
import SelectInput from "./components/SelectInput";
import DataTable from "./components/DataTable";
import Notification from "./components/Notification";

const styles = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
};

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [devices, setDevices] = useState(false);
  const [currentAction, setCurrentAction] = useState("");
  const [systemValue, setSystemValue] = useState("");
  const [typeValue, setTypeValue] = useState("");
  const [hddValue, setHddValue] = useState("");
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [notificationType, setNotificationType] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [dataPayload, setDataPayload] = useState({
    system_name: "",
    type: "",
    hdd_capacity: "",
  });

  const handleOpen = () => {
    setCurrentAction("Add");
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSystemValue("");
    setTypeValue("");
    setHddValue("");
    setOpenModal(false);
  };

  const handleChange = (event) => {
    setDataPayload({
      ...dataPayload,
      [event.target.name]: event.target.value,
    });

    if (event.target.name === "system_name")
      return setSystemValue(event.target.value);

    if (event.target.name === "hdd_capacity")
      return setHddValue(event.target.value);

    return setTypeValue(event.target.value);
  };

  const handleSave = () => {
    fetch("http://localhost:3000/devices", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPayload),
    })
      .then((rawResponse) => rawResponse.json())
      .then((res) => {
        setDevices([...devices, res]);
        handleCloseModal(false);
        setOpenNotification(true);
        setNotificationType("success");
        setNotificationMessage("Device Saved Successfully!");
      })
      .catch((err) => {
        setOpenNotification(true);
        setNotificationType("error");
        setNotificationMessage(err.message);
      });
  };

  const handleEdit = () => {
    fetch(`http://localhost:3000/devices/${selectedDeviceId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPayload),
    })
      .then((rawResponse) => rawResponse.json())
      .then((res) => {
        var updateIndex = devices
          .map((device) => {
            return device.id;
          })
          .indexOf(selectedDeviceId);
        devices[updateIndex] = { ...devices[updateIndex], ...dataPayload };

        setDevices(devices);
        handleCloseModal(false);
        setOpenNotification(true);
        setNotificationType("info");
        setNotificationMessage("Device Updated Successfully!");
      })
      .catch((err) => {
        setOpenNotification(true);
        setNotificationType("error");
        setNotificationMessage(err.message);
      });
  };

  const handleDelete = (deviceId) => {
    fetch(`http://localhost:3000/devices/${deviceId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((rawResponse) => rawResponse.json())
      .then((res) => {
        var removeIndex = devices
          .map((device) => {
            return device.id;
          })
          .indexOf(deviceId);

        devices.splice(removeIndex, 1);

        setDevices(devices);
        setOpenNotification(true);
        setNotificationType("info");
        setNotificationMessage("Device Deleted Successfully!");
      })
      .catch((err) => {
        setOpenNotification(true);
        setNotificationType("error");
        setNotificationMessage(err.message);
      });
  };

  const handleEditClick = (selectedDevice) => {
    setCurrentAction("Edit");
    setDataPayload({
      system_name: selectedDevice.system_name,
      type: selectedDevice.type,
      hdd_capacity: selectedDevice.hdd_capacity,
    });
    setSystemValue(selectedDevice.system_name);
    setTypeValue(selectedDevice.type);
    setHddValue(selectedDevice.hdd_capacity);
    setSelectedDeviceId(selectedDevice.id);
    setOpenModal(true);
  };

  React.useEffect(() => {
    fetch("http://localhost:3000/devices")
      .then((response) => response.json())
      .then((data) => setDevices(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Client Web Application To Work With Devices
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <DataTable
        data={devices}
        handleOpen={handleOpen}
        handleEditClick={handleEditClick}
        handleDelete={handleDelete}
      />
      <Notification
        openNotification={openNotification}
        setOpenNotification={setOpenNotification}
        notificationType={notificationType}
        notificationMessage={notificationMessage}
      />
      <ModalDisplay
        open={openModal}
        currentAction={currentAction}
        setOpen={setOpenModal}
        handleClose={handleCloseModal}
        title={`${currentAction} Device`}
      >
        <Input
          name="system_name"
          label="System Name"
          variant="outlined"
          value={systemValue}
          onChange={handleChange}
        />
        <SelectInput name="type" value={typeValue} onChange={handleChange} />
        <Input
          name="hdd_capacity"
          label="HDD Capacity"
          variant="outlined"
          value={hddValue}
          type="number"
          onChange={handleChange}
        />
        <Box sx={styles}>
          <Button variant="outlined" color="error" onClick={handleCloseModal}>
            Close
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={currentAction === "Edit" ? handleEdit : handleSave}
          >
            Save
          </Button>
        </Box>
      </ModalDisplay>
    </Box>
  );
}

export default App;
