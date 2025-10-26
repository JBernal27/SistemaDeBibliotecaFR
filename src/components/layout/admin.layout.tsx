import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Footer from './components/footer.component';
import Sidebar from './components/sidebar.component';

const AdminLayout = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: "center"
      }}
    >
      <Sidebar />
      <Box
        component="main"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          maxWidth: "1600px",
          width: "100%"
        }}
      >
        <Outlet/>
      </Box>
      <Footer />
    </Box>
  );
};

export default AdminLayout;