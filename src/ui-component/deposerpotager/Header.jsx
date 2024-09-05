import React from 'react';
import { Box, Typography, Grid, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import headerimage from 'assets/images/Header_Photo fruits et légumes.png';
import avocat from 'assets/images/producteur1.png';

const Header = () => {
    const theme = useTheme();
    const downMD = useMediaQuery(theme.breakpoints.down('md')); 

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ width: '100%', height: {
                xs: '30vh',  // Height for small screens
                md: '30vh',  // Height for medium screens
                lg: '50vh'
            }}} 
        >
            {/* Header Image Block */}
            <Grid item xs={12} sx={{ position: 'relative', width: '100%', height: '40vh' }}>
                <Box
                    component="img"
                    src={headerimage}
                    alt="Header"
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        position: 'relative',
                        zIndex: 1,
                    }}
                />
                {/* avocat Image */}
                <Box
                    component="img"
                    src={avocat}
                    alt="avocat"
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: '80%',
                        transform: 'translateX(-50%)',
                        height: '30%',
                        zIndex: 2,
                    }}
                />
                {/* Overlay Block */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        borderRadius: downMD ? '0 0 40px 40px' : '0 0 60px 60px',
                        backgroundColor: '#9ACF5D',
                        zIndex: 0,
                    }}
                />
                {/* Heading */}
                <Typography
                    variant="h1"
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '10%',
                        transform: 'translateY(-50%)',
                        zIndex: 3,
                        color: 'white',
                        fontWeight: '500',
                        letterSpacing: '1px',
                        textAlign: 'left',
                        px: 2, // Padding to ensure text doesn't touch the edges
                        fontSize: {
                            xs: '2rem',   // Font size for small screens
                            md: '3rem',   // Font size for medium screens
                            lg: '4rem',   // Font size for large screens
                        }
                    }}
                >
                    Je dépose mon potager
                </Typography>
            </Grid>
        </Grid>
    );
};

export default Header;
