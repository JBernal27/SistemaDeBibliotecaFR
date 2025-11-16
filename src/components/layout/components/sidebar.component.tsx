import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Divider,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SecurityIcon from "@mui/icons-material/Security";
import PersonIcon from "@mui/icons-material/Person";
import AuthStorage from "../../utilities/auth-storage.utility";
import { IPayload } from "../../../common/interfaces/payload.interface";

const drawerWidth = 260;

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

const navItems: NavItem[] = [
  { id: "home", label: "Inicio", icon: <HomeIcon />, path: "/" },
  { id: "dashboard", label: "Dashboard", icon: <SecurityIcon />, path: "/dashboard" },
  {
    id: "materials",
    label: "Materiales",
    icon: <MenuBookIcon />,
    path: "/materials",
  },
  { id: "authors", label: "Autores", icon: <PersonIcon />, path: "/authors" },
  { id: "users", label: "Usuarios", icon: <PeopleIcon />, path: "/users" },
  { id: "loans", label: "Préstamos", icon: <AssignmentIcon />, path: "/loans" },
];

export default function SidebarLayout() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [user, setUser] = useState<IPayload | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleAuthChange = () => setUser(AuthStorage.getUser());
    handleAuthChange();

    window.addEventListener("authChange", handleAuthChange);
    return () => window.removeEventListener("authChange", handleAuthChange);
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleLogout = () => {
    AuthStorage.logout();
    setUser(null);
    navigate("/auth");
  };

  const currentItem = navItems.find((item) => location.pathname === item.path);
  const currentTitle = currentItem ? currentItem.label : "Biblioteca";

  const drawer = (
    <div>
      <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}>
        <Box>
          <Typography variant="h6">Sistema de Biblioteca</Typography>
          <Typography variant="body2" color="text.secondary">
            {user ? user.full_name : "Invitado"}
          </Typography>
        </Box>
      </Box>

      <Divider />

      <List>
        {navItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => {
                navigate(item.path);
                setMobileOpen(false);
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ flexGrow: 1 }} />
      <Divider />

      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Ajustes" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding onClick={handleLogout}>
          <ListItemButton>
            <ListItemIcon>
              <LogoutIcon color="error" />
            </ListItemIcon>
            <ListItemText primary="Cerrar sesión" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          background: "linear-gradient(90deg,#1976d2, #0b8793)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {!isDesktop && (
              <IconButton
                color="inherit"
                edge="start"
                onClick={handleDrawerToggle}
                aria-label="open drawer"
                sx={{ mr: 1 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" noWrap component="div">
              {currentTitle}
            </Typography>
          </Box>

          {user && (
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              {user.full_name}
            </Typography>
          )}
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {!isDesktop && (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        )}

        {isDesktop && (
          <Drawer
            variant="permanent"
            open
            sx={{
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                borderRight: `1px solid ${theme.palette.divider}`,
              },
            }}
          >
            {drawer}
          </Drawer>
        )}
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: '100%',
          minHeight: "100vh",
          background: "#f7f9fb",
        }}
      >
        <Toolbar />
        <Box component={"main"} sx={{ width: { xlg: "70%", lg: "90%", sm: "90%" }, mx: "auto" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
