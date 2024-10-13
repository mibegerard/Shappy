import React from 'react';
import { Box, Typography, Button, useMediaQuery, useTheme } from '@mui/material';
import producteur from 'assets/images/Photo producteur.png';
import avocat from 'assets/images/Avocat producteur.png';

const ProducteurDescription = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    return (
        <Box sx={{ position: 'relative', width: '100%', overflow: 'hidden', height: isSmallScreen ? '20rem' : isMediumScreen ? '30vh' : '50vh' }}>
            <img 
                src={producteur} 
                alt="producteur" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#9ACF5D',
                    opacity: 0.8,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    textAlign: 'center',
                    padding: '10px',
                    boxSizing: 'border-box'
                }}
            >
                <Typography 
                    variant={isSmallScreen ? "h1" : isMediumScreen ? "h1" : "h1"} 
                    sx={{ color: '#FFF4E2', fontWeight: 'bold', marginTop: '3rem' }}
                >
                    Je suis producteur
                </Typography>
                <Typography 
                    variant="body1" 
                    sx={{ color: '#FFFFFF', margin: 'auto', maxWidth: isSmallScreen ? '100%' : '600px', padding: isSmallScreen ? '0 10px' : '0', fontWeight:'bold' }}
                >
                    Présentez vos produits « moches » sur Shappy pour les vendre à des restaurateurs en quête d’ingrédients de saison.
                </Typography>
                <Button 
                    variant="contained" 
                    sx={{ 
                        backgroundColor: '#385909',
                        color: '#FFFFFF',
                        borderRadius: '10px',
                        padding: isSmallScreen ? '5px 10px' : '10px 20px',
                        marginBottom: '4rem',
                        fontWeight:'bold'
                    }}
                >
                    Je dépose mon potager
                </Button>
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    bottom: isSmallScreen ? '0rem' : isMediumScreen ? '0rem' : '0rem',
                    left: isSmallScreen ? '0rem' : isMediumScreen ? '0rem' : '16rem',
                    width: 'auto',
                    height: 'auto',
                    padding: '10px',
                    boxSizing: 'border-box'
                }}
            >
                <img 
                    src={avocat} 
                    alt="Avocat producteur" 
                    style={{
                        width: isSmallScreen ? '80px' : isMediumScreen ? '100px' : 'auto',
                        height: 'auto',
                        objectFit: 'contain'
                    }} 
                />
            </Box>
        </Box>
    );
};

export default ProducteurDescription;
