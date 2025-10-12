import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Footer from './components/footer.component';
import Navbar from './components/navbar.component';

const UserLayout = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Navbar />
      <Box
        component="main"
        sx={{
          flex: '1 0 auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default UserLayout;