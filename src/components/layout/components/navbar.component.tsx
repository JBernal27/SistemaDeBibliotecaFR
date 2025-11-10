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

    handleAuthChange();

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
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
          }}
        >
          Sistema de Biblioteca
        </Typography>

        <Box display={"flex"} alignItems="center">
          {user ? (
            <>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    px: 1,
                    py: 1,
                    fontWeight: "bold",
                    color: "inherit",
                    display: { xs: "none", sm: "block" },
                  }}
                >
                  Hola, {user.full_name}
                </Typography>
                <IconButton color="inherit" onClick={handleMenuOpen}>
                  <AccountCircle sx={{ fontSize: { xs: 28, sm: 36, md: 40 } }} />
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
                      navigate("/profile");
                    }}
                  >
                    <AccountCircle fontSize="small" sx={{ mr: 1 }} /> Perfil
                  </MenuItem>

                  {user.role_name === "admin" && (
                    <MenuItem
                      onClick={() => {
                        handleMenuClose();
                        navigate("/loans");
                      }}
                    >
                      <Dashboard fontSize="small" sx={{ mr: 1 }} /> Panel de Administracion
                    </MenuItem>
                  )}

                  <MenuItem onClick={handleLogout}>
                    <Logout fontSize="small" sx={{ mr: 1 }} /> Cerrar sesión
                  </MenuItem>
                </Menu>
              </Box>
            </>
          ) : (
            <Button
              variant="contained"
              component={RouterLink}
              to="/auth"
              endIcon={<Login />}
              sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
            >
              <span style={{ display: "inline-block" }}>Iniciar sesión</span>
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
