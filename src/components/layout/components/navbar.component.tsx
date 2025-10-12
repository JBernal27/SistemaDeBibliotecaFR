import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit'
          }}
        >
          Sistema de Biblioteca
        </Typography>
        <Box>
          <Button
            component={RouterLink}
            to="/"
            color="inherit"
          >
            Home
          </Button>
          <Button
            component={RouterLink}
            to="/about"
            color="inherit"
          >
            Log In
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;