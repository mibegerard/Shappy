import React from 'react';
import { Box, Typography, Button, useMediaQuery, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
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
                    variant={isSmallScreen ? "h2" : isMediumScreen ? "h1" : "h1"} 
                    sx={{ 
                        color: '#FFF', // Bright white text
                        fontWeight: 'bold', 
                        marginTop: '3rem',
                        textShadow: '2px 2px 6px rgba(0, 0, 0, 0.7)' // Add shadow for contrast
                    }}
                >
                    Je suis producteur
                </Typography>
                <Typography 
                    variant="body1" 
                    sx={{ 
                        color: '#FFF', // Bright white text
                        margin: 'auto', 
                        maxWidth: isSmallScreen ? '100%' : '600px', 
                        padding: isSmallScreen ? '0 10px' : '0', 
                        fontWeight: 'bold',
                        textShadow: '1px 1px 4px rgba(0, 0, 0, 0.6)' // Add shadow for contrast
                    }}
                >
                    Présentez vos produits « moches » sur Shappy pour les vendre à des restaurateurs en quête d’ingrédients de saison.
                </Typography>
                <Button 
                    variant="contained" 
                    component={Link}
                    to="/je-depose-mon-potager" 
                    sx={{ 
                        backgroundColor: '#385909',
                        color: '#FFF',
                        borderRadius: '10px',
                        padding: isSmallScreen ? '5px 10px' : '10px 20px',
                        marginBottom: '4rem',
                        fontWeight: 'bold',
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)' // Button shadow for better appearance
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
