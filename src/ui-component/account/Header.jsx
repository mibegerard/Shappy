import React from 'react';
import { Box, Typography, Button, useMediaQuery, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import restheader from 'assets/images/accountheader.png';

const Header = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    const getHeight = () => {
        if (isSmallScreen) return 'auto';
        if (isMediumScreen) return 'auto';
        return '500px';  // Add a default height for larger screens
    };

    return (
        <Box sx={{ position: 'relative', width: '100%' }}>
            {/* Header Image */}
            <Box
                component="img"
                src={restheader}
                alt="Header background"
                sx={{ 
                    width: '100%', 
                    height: getHeight, 
                    objectFit: 'auto' 
                }}
            />

            {/* Centering Container */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1,
                }}
            />

            
        </Box>
    );
};

export default Header;
