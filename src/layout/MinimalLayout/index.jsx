import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

// ==============================|| Auth Layout ||============================== //

const MinimalLayout  = () => {
  return (
      <Box>
          {<Header />}
          <Outlet />
          {<Footer />}
      </Box>
  );
};


export default MinimalLayout;
