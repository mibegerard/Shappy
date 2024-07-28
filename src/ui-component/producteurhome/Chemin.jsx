import React from 'react';
import { Box, Grid, Typography, useTheme, useMediaQuery, Container, Button } from '@mui/material';
import mac from 'assets/images/MacBook Air (2022).png';
import cheminimage from 'assets/images/CheminProducteur.jpeg';

const Chemin = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Container>
            <Box sx={{ padding: isSmallScreen ? '2rem' : '4rem' }}>
                <Box sx={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <Typography variant={isSmallScreen ? 'h2' : 'h1'} sx={{ color: theme.palette.vert?.fonce }}>
                        Comment fonctionne mon potager ?
                    </Typography>
                </Box>
                <Grid container spacing={4} direction={isSmallScreen ? 'column' : 'row'} alignItems="center" marginTop="2rem">
                    {/* Left Block */}
                    <Grid item xs={12} md={6}>
                        <Box
                            component="img"
                            src={mac}
                            alt="Left image"
                            sx={{ 
                                width: '100%', 
                                height: 'auto'
                            }}
                        />
                    </Grid>
                    {/* Right Block */}
                    <Grid item xs={12} md={6}>
                        <Box
                            component="img"
                            src={cheminimage}
                            alt="Right image"
                            sx={{ 
                                width: '100%', 
                                height: 'auto'
                            }}
                        />
                    </Grid>
                </Grid>
                <Box sx={{ textAlign: 'center', marginTop: '2rem' }}>
                    <Button 
                        variant="contained"
                        sx={{
                            backgroundColor: theme.palette.vert?.fonce,
                            borderRadius: '12px',
                        }}
                    >
                        <Typography variant="button" sx={{ color: theme.palette.beige?.clair }}>
                            Accéder à mon potager
                        </Typography>
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Chemin;
