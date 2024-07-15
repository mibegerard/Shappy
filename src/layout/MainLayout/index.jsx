import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Header from './Header';
import Footer from './Footer';

// ==============================|| Main layout ||============================== //

const MainLayout = () => {
    return (
        <Box>
            {<Header />}
            <Outlet />
            {<Footer />}
        </Box>
    );
};

export default MainLayout;
