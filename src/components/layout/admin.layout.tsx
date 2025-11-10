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
      }}
    >
      <Sidebar />
      <Footer />
    </Box>
  );
};

export default AdminLayout;