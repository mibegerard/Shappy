import React from 'react';
import { Box, Button, Typography, Grid, useTheme, useMediaQuery, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import { useAuth } from 'context/AuthContext'; 
import missionfruit from 'assets/images/Photo fruits et légumes.png';

const Mission = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const { auth } = useAuth(); 

    // Helper to check if the user is an authenticated producteur
    const isProducteur = auth.isAuthenticated && auth.user?.role === 'producteur';

    const handleButtonClick = () => {
        if (!isProducteur) {
            toast.warn("Seuls les producteurs authentifiés peuvent déposer leur potager.");
        }
    };

    return (
        <Container>
            <Box sx={{ padding: isSmallScreen ? '2rem' : '4rem' }}>
                <Grid container spacing={4} justifyContent="center">
                    {/* Left Block */}
                    <Grid item xs={12} md={6}>
                        <Box sx={{ maxWidth: '500px', margin: '0 auto' }}>
                            <Typography variant="h1" sx={{ color: theme.palette.vert.claire }}>
                                Notre mission
                            </Typography>
                            <Box sx={{ wordSpacing: '0.5rem', marginTop: '2rem' }}>
                                <Typography variant="body1" sx={{ color: theme.palette.vert.fonce, marginBottom: '2rem' }}>
                                    Vous êtes un producteur avec des fruits et légumes invendus ? Et vous avez des pertes économiques.
                                    <br />
                                    <br />
                                    Shappy est là pour vous ! Nous récupérons vos produits invendus pour les revendre à des restaurateurs en quête de produits frais et de qualité.
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    textAlign: isSmallScreen ? 'center' : 'left',
                                    marginTop: '2rem',
                                }}
                            >
                                <Button 
                                    component={isProducteur ? Link : 'button'}
                                    to={isProducteur ? "/je-depose-mon-potager" : undefined}
                                    onClick={handleButtonClick}
                                    variant="contained"
                                    sx={{ 
                                        marginTop: '2rem', 
                                        backgroundColor: theme.palette.vert.fonce, 
                                        color: theme.palette.beige.clair, 
                                        borderRadius: '12px',
                                        '&:hover': {
                                            backgroundColor: theme.palette.vert.fonce,
                                            opacity: 0.9,
                                        },
                                    }}
                                >
                                    Je dépose mon potager
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                    {/* Right Block */}
                    <Grid item xs={12} md={6}>
                        <Box
                            component="img"
                            src={missionfruit}
                            alt="Producteur header"
                            sx={{ 
                                width: '100%', 
                                height: 'auto', 
                                borderRadius: '8px', 
                                boxShadow: 3 
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Mission;
