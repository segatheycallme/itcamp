import "./Auth.css";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";
import { useState } from "react";

export default function Auth() {
  const [tabName, setTabName] = useState("login");

  return (
    <div className="auth">
      <TabContext value={tabName}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={(_, v) => { setTabName(v) }} >
            <Tab label="login" value="login" />
            <Tab label="register" value="register" />
          </TabList>
        </Box>
        <TabPanel value="login">
          <Login />
        </TabPanel>
        <TabPanel value="register">
          <Register />
        </TabPanel>
      </TabContext>
    </div>
  );
}
