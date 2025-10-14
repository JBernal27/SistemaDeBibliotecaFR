import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthStorage from "../../utilities/auth-storage.utility";
import { IPayload } from "../../../common/interfaces/payload.interface";
import { Login, AccountCircle, Dashboard, Logout } from "@mui/icons-material";

const Navbar = () => {
  const [user, setUser] = useState<IPayload | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthChange = () => {
      setUser(AuthStorage.getUser());
    };

    handleAuthChange(); // Cargar el usuario al montar el componente

    window.addEventListener("authChange", handleAuthChange);
    return () => window.removeEventListener("authChange", handleAuthChange);
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    AuthStorage.logout();
    setUser(null);
    handleMenuClose();
    navigate("/auth");
  };

  return (
    <AppBar position="static" sx={{ display: "flex", alignItems: "center" }}>
      <Toolbar sx={{ width: "100%", maxWidth: "1600px" }}>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: "inherit",
          }}
        >
          Sistema de Biblioteca
        </Typography>

        <Box>
          {user ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="subtitle1"
                sx={{ px: 1, py: 1, fontWeight: "bold", color: "inherit" }}
              >
                Hola, {user.full_name}
              </Typography>
              <IconButton color="inherit" onClick={handleMenuOpen}>
                <AccountCircle sx={{fontSize: 40}}/>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <Divider />

                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    navigate("/dashboard");
                  }}
                >
                  <Dashboard fontSize="small" sx={{ mr: 1 }} /> Dashboard
                </MenuItem>

                <MenuItem onClick={handleLogout}>
                  <Logout fontSize="small" sx={{ mr: 1 }} /> Cerrar sesión
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Button
              variant="contained"
              component={RouterLink}
              to="/auth"
              endIcon={<Login />}
            >
              Iniciar sesión
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
