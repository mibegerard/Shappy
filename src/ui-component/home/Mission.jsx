import React from 'react';
import { Box, Typography, Button, Container, Grid, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import mission from 'assets/images/mission.png';
import chemin from 'assets/images/chemin.png';
import processimg from 'assets/images/Process.png';
import tomates from 'assets/images/Tomate.png';

const Mission = () => {
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
            {/* Left Section */}
            <Box
                sx={{
                    backgroundColor: theme.palette.beige.main,
                    padding: '40px 0', 
                    borderRadius: '3rem', 
                    overflow: 'hidden',
                    position: 'relative' // Added for absolute positioning of tomate image
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Box 
                                sx={{ 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    justifyContent: 'flex-start', 
                                    textAlign: 'left',
                                    padding: '2rem 3rem'
                                }}
                            >
                                <Typography 
                                    variant="h1" 
                                    sx={{ 
                                        marginBottom: '1rem',
                                        paddingTop: '20px', 
                                        color: theme.palette.text.primary,
                                        fontWeight: 'bold',
                                        lineHeight: '1.2'
                                    }}
                                >
                                    Notre mission
                                </Typography>
                                <Typography 
                                    variant="h3" 
                                    sx={{ 
                                        marginBottom: '1rem',
                                        fontFamily: 'Poppins',
                                        color: theme.palette.text.primary,
                                        lineHeight: '1.4'
                                    }}
                                >
                                    Ce n'est pas la forme qui compte
                                </Typography>
                                <Typography 
                                    variant="body2" 
                                    sx={{ 
                                        marginBottom: '2rem', 
                                        color: theme.palette.text.primary,
                                        lineHeight: '1.6',
                                        '& > p': {
                                            marginBottom: '1.5rem'
                                        }
                                    }}
                                >
                                    En France, plus de 10 millions de tonnes de fruits et légumes sont perdus chaque année, entraînant une perte économique de 16 milliards d'euros.
                                    <br /><br /> 
                                    Shappy achète ces produits aux producteurs pour les revendre aux restaurateurs via une application. Cette approche réduit le gaspillage alimentaire, et offre aux restaurateurs un gain de temps précieux dans leur processus d'approvisionnement.
                                </Typography>
                                <Button 
                                    sx={{ 
                                        marginTop: '2rem', 
                                        borderRadius: '15px',
                                        backgroundColor: theme.palette.orange.main,
                                        color: theme.palette.beige.clair,
                                        padding: '8px 16px',
                                        width: isSmallScreen ? 'auto' : (isMediumScreen ? 'auto' : '50%'),
                                    }}
                                >
                                    Je découvre Shappy
                                </Button>
                            </Box>
                        </Grid>

                        {/* Right Block */}
                        <Grid item xs={12} md={6}>
                            <Box 
                                sx={{ 
                                    display: 'flex', 
                                    justifyContent: 'center', 
                                    alignItems: 'center', 
                                    height: '100%' 
                                }}
                            >
                                <img 
                                    src={mission} 
                                    alt="Mission" 
                                    style={{ 
                                        width: '100%', 
                                        height: 'auto', 
                                        maxWidth: '100%' 
                                    }} 
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Container>

                {/* Tomates Image */}
                <Box
                    component="img"
                    src={tomates}
                    alt="Tomates"
                    sx={{
                        position: 'absolute',
                        top: '0rem',
                        left: '35%',
                        width: 'auto',
                        height: isSmallScreen ? '50px' : '80px', // Adjust size as needed
                    }}
                />
            </Box>

            {/* New Section with Background Image and Additional Image */}
            <Box
                sx={{
                    backgroundImage: `url(${processimg})`,
                    backgroundSize: isSmallScreen ? 'contain' : (isMediumScreen ? 'contain' : 'contain'),
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    height: isSmallScreen ? '30vh' : (isMediumScreen ? '50vh' : '70vh'), 
                    display: 'flex', 
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Container maxWidth="lg">
                    <Grid container justifyContent="center" alignItems="center">
                        <Grid item>
                            <Box
                                sx={{
                                    position: 'relative', 
                                    top: isMediumScreen ? '-1rem' : (isSmallScreen ? '-1rem' : '-2rem'), 
                                    left: isMediumScreen ? '-1.5rem' : (isSmallScreen ? '0' : '4rem'), 
                                }}
                            >
                                <img 
                                    src={chemin} 
                                    alt="Chemin" 
                                    style={{ 
                                        width: '100%', 
                                        height: 'auto', 
                                        maxWidth: '100%' 
                                    }} 
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

export default Mission;
