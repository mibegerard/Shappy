import React from 'react';
import { Box, Typography, Button, useMediaQuery, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import restheader from 'assets/images/headermarche.png';

const marcheheader = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    const getHeight = () => {
        if (isSmallScreen) return 'auto';
        if (isMediumScreen) return 'auto';
        return '400px';  // Add a default height for larger screens
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
                    height: getHeight(), 
                    objectFit: 'cover' // Set to cover for better image scaling
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

            {/* Overlay Box */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: isSmallScreen ? '1rem' : isMediumScreen ? '2rem' :'3rem',
                    left: isSmallScreen ? '50%' : isMediumScreen ? '1rem' : '5.5rem',
                    transform: isSmallScreen ? 'translateX(-50%)' : 'none',
                    bgcolor: '#F5F5DC',
                    padding: '10px',
                    display: 'flex',
                    flexDirection: isSmallScreen ? 'column' : 'row',
                    alignItems: 'center',
                    justifyContent: isSmallScreen ? 'center' : 'flex-start', 
                    zIndex: 1,
                    borderRadius: '15px',
                    width: isSmallScreen ? '90%' : 'auto',
                    maxWidth: '600px', 
                    textAlign: isSmallScreen ? 'center' : 'left', // Center text on small screens
                    margin: '0 auto'
                }}
            >
                {/* Search Box */}
                <Box sx={{ display: 'flex', alignItems: 'center', marginRight: isSmallScreen ? '0' : '16px', marginBottom: isSmallScreen ? '10px' : '0' }}>
                    <SearchIcon color="primary" />
                    <Typography variant="body1" sx={{ marginLeft: '8px' }}>
                        Fruits et Légumes
                    </Typography>
                </Box>

                {/* Location Box */}
                <Box 
                    sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        marginRight: isSmallScreen ? '0' : '16px',
                        marginBottom: isSmallScreen ? '10px' : '0', 
                    }}
                >
                    <LocationOnIcon color="primary" />
                    <Typography variant="body1" sx={{ marginLeft: '8px' }}>
                        Localisation
                    </Typography>
                </Box>

                {/* Button */}
                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        borderRadius: '10px',
                        color: 'white',
                        width: isSmallScreen ? '100%' : 'auto',  // Full-width on small screens
                        marginTop: isSmallScreen ? '10px' : '0', 
                    }}
                >
                    Je commence mon marché
                </Button>
            </Box>
        </Box>
    );
};

export default marcheheader;
