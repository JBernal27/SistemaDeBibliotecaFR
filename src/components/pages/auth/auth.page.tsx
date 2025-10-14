import { Box, Paper, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { LoginForm } from "./components/login.component";
import { RegisterForm } from "./components/register.component";
import {
  Login as LoginIcon,
  PersonAdd as PersonAddIcon,
} from "@mui/icons-material";

export const AuthPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}
    >
      <Paper elevation={6} sx={{ width: 450, p: 4, minWidth: 200 }}>
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          Bienvenido
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3}}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            aria-label="auth tabs"
          >
            <Tab
              label="Iniciar Sesión"
              icon={<LoginIcon />}
              iconPosition="start"
            />
            <Tab
              label="Registrarse"
              icon={<PersonAddIcon />}
              iconPosition="start"
            />
          </Tabs>
        </Box>

        <Box sx={{ mt: 2 }}>
          {activeTab === 0 ? <LoginForm /> : <RegisterForm />}
        </Box>
      </Paper>
    </Box>
  );
};
