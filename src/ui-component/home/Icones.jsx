import React from 'react';
import { Box, Typography, Button, Grid, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import group1 from 'assets/images/Group1.png';
import group2 from 'assets/images/Group2.png';
import group3 from 'assets/images/Group3.png';
import group4 from 'assets/images/Group4.png';

const Description = () => {
    const theme = useTheme();

    return (
        <Box sx={{ backgroundColor: theme.palette.beige.clair, paddingTop: '3rem', paddingBottom: '3rem' }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h1" sx={{ paddingTop: '1rem', paddingBottom: '4rem', color: theme.palette.text.primary }}>
                        Nos avantages juteux
                    </Typography>
                    <Grid container spacing={2} justifyContent="center" padding="30px">
                        <Grid item xs={6} sm={4} md={3} padding={2}>
                            <Box sx={{ height: '100px' }}>
                                <img src={group1} alt="Group 1" style={{marginTop: '-1.5rem', height: 'auto'}} />
                            </Box>
                            <Typography variant="body2" sx={{color: theme.palette.text.secondary }}>
                                Connexion directe
                                producteur-restaurateur
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sm={4} md={3} padding={2}>
                            <Box sx={{ height: '100px' }}>
                                <img src={group2} alt="Group 2" style={{ height: 'auto' }} />
                            </Box>
                            <Typography variant="body2" sx={{color: theme.palette.text.secondary }}>
                                Soutien
                                aux producteurs locaux
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sm={4} md={3} padding={2}>
                            <Box sx={{ height: '100px' }}>
                                <img src={group3} alt="Group 3" style={{ height: 'auto' }} />
                            </Box>
                            <Typography variant="body2" sx={{color: theme.palette.text.secondary }}>
                                Simplicité d'utilisation 
                                et gain de temps
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sm={4} md={3} padding={2}>
                            <Box sx={{ height: '100px' }}>
                                <img src={group4} alt="Group 4" style={{ height: 'auto' }} />
                            </Box>
                            <Typography variant="body2" sx={{color: theme.palette.text.secondary }}>
                                Fruits et légumes moches
                                pour réduire le gaspillage
                            </Typography>
                        </Grid>
                    </Grid>
                    <Button
                        variant="contained"
                        sx={{
                            marginTop: '2rem',
                            borderRadius: '15px',
                            backgroundColor: theme.palette.orange.main, 
                            color: theme.palette.beige.clair, 
                            paddingRight: '30px', paddingLeft: '30px'
                        }}
                    >
                        Je commence gratuitement
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default Description;
