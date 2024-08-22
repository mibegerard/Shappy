import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import MainCard from '../../ui-component/Cards/MainCard';

// ==============================|| AUTHENTICATION CARD WRAPPER ||============================== //

const AuthCardWrapper = ({ children, ...other }) => (
  <MainCard
    sx={{
      width: '100%',  // Take 80% of the screen width
      margin: { xs: 2.5, md: 3 },
      borderRadius: '20px',
      backgroundColor: 'white', // Ensure a solid background color
      zIndex: 2, // Ensure it is above the image
      position: 'relative', // Ensure proper positioning
      '& > *': {
        flexGrow: 1,
        flexBasis: '50%',
      }
    }}
    content={false}
    {...other}
  >
    <Box sx={{ p: { xs: 2, sm: 3, xl: 5 } }}>{children}</Box>
  </MainCard>
);

AuthCardWrapper.propTypes = {
  children: PropTypes.node
};

export default AuthCardWrapper;
