import React from 'react';
import { Box, Button, useMediaQuery, useTheme, Typography, Container, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link } from 'react-router-dom';
import { useAuth } from 'context/AuthContext'; 
import restaurateurimage from 'assets/images/restaurateurimage.png';
import InfoCard from '../Cards/InfoCard.jsx';
import { toast } from 'react-toastify'; 

const Landing = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    const { auth } = useAuth(); // Access auth state

    const handleButtonClick = () => {
        if (auth.isAuthenticated && auth.user?.role === 'producteur') {
        } else {
            toast.warn("Accès réservé aux utilisateurs authentifiés avec le rôle de producteur.");
        }
    };

    const getHeight = () => {
        if (isSmallScreen) return 'auto';
        if (isMediumScreen) return 'auto';
        return 'auto';
    };

    const cardsData = [
        {
            percentage: '32%',
            text: 'De gaspillage alimentaire chez les',
            highlight: ' producteurs'
        },
        {
            percentage: '42%',
            text: 'De grand gaspillage alimentaire chez les',
            highlight: ' producteurs'
        },
        {
            percentage: '72%',
            text: 'De grand exces gaspillage alimentaire chez les',
            highlight: ' producteurs'
        }
    ];

    return (
        <Box sx={{ position: 'relative', width: '100%' }}>
            {/* Header Image */}
            <Box
                component="img"
                src={restaurateurimage}
                alt="Header background"
                sx={{
                    width: '100%',
                    height: getHeight(),
                    objectFit: 'auto'
                }}
            />

            <Typography
                variant="h1"
                sx={{
                    position: 'absolute',
                    top: isSmallScreen ? '10%' : isMediumScreen ? '20%' : '41%',
                    left: isSmallScreen ? '5%' : isMediumScreen ? '6%' : '6%',
                    letterSpacing: '1px',
                    fontSize: isSmallScreen ? '1rem' : isMediumScreen ? '2.5rem' : '4rem',
                    textAlign: isSmallScreen ? 'center' : 'left',
                }}
            >
                <span style={{ color: '#FFF4E2' }}>La plateforme qui met en lien</span>
                <br />
                <span style={{ color: '#FFE3B6' }}>producteurs & restaurateurs</span>
            </Typography>

            {/* Overlay Box */}
            <Box
                sx={{
                    position: isSmallScreen ? 'static' : 'absolute',
                    bottom: isSmallScreen ? '0' : isMediumScreen ? '33rem' :'10rem',
                    left: isSmallScreen ? '0' : isMediumScreen ? '1rem' : '5.5rem',
                    bgcolor: isSmallScreen ? '#FFF4E2' : '#FFF4E2', 
                    padding: '10px',
                    display: 'flex',
                    flexDirection: isSmallScreen ? 'column' : 'row',
                    alignItems: 'center',
                    justifyContent: isSmallScreen ? 'center' : 'flex-start', 
                    zIndex: 1,
                    borderRadius: isSmallScreen ? '20px' : '15px',
                    width: isSmallScreen ? '70%' : isMediumScreen ? '80%' :'auto',
                    maxWidth: '600px', 
                    margin: isSmallScreen ? '0 auto' : '0'
                }}
            >
                {/* Search Box */}
                <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '16px' }}>
                    <SearchIcon sx={{ color: '#353F47' }} />
                    <Typography variant="body1" sx={{ marginLeft: '8px', color: '#353F47' }}>
                        Fruits et Légumes
                    </Typography>
                </Box>

                {/* Location Box */}
                <Box 
                    sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        marginRight: '16px',
                        marginTop: isSmallScreen ? '10px' : '0', 
                    }}
                >
                    <LocationOnIcon sx={{ color: '#353F47' }} />
                    <Typography variant="body1" sx={{ marginLeft: '8px', color: '#353F47' }}>
                        Localisation
                    </Typography>
                </Box>

                <Button
                    component="a"
                    href="/mon-marche"
                    variant="contained"
                    sx={{
                        backgroundColor: '#FC8A1A',
                        borderRadius: '10px',
                        color: 'white',
                        marginTop: isSmallScreen ? '10px' : '0',
                        textDecoration: 'none', // Optional if you want to ensure no underline
                    }}
                >
                    Je commence mon marché
                </Button>


            </Box>
            
            {/* Cards Container */}
            <Container
                sx={{
                    position: isSmallScreen ? 'static' : isMediumScreen ? 'static' : 'absolute',
                    bottom: isSmallScreen ? 'initial' : '-10rem',
                    left: isSmallScreen ? 'initial' : isMediumScreen ? 'initial' : '50%',
                    transform: isSmallScreen ? 'initial' : isMediumScreen ? 'initial' : 'translateX(-50%)',
                    width: isSmallScreen ? '90%' : isMediumScreen ? '80%' : '80%',
                    mt: isSmallScreen ? '2rem' : isMediumScreen ? '2rem' : '0'
                }}
            >
                <Grid container spacing={isSmallScreen ? 2 : 4} justifyContent="center" alignItems="center">
                    {cardsData.map((card, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index} container justifyContent="center" alignItems="center">
                            <InfoCard 
                                percentage={card.percentage}
                                text={card.text}
                                highlight={card.highlight}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Landing;
