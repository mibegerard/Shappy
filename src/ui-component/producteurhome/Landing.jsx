// Landing.js
import React from 'react';
import { Box, Button, useMediaQuery, useTheme, Typography, Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import prodheader from 'assets/images/Producteurheader.png';
import InfoCard from '../Cards/InfoCard.jsx';

const Landing = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    const getHeight = () => {
        if (isSmallScreen) return 'auto';
        if (isMediumScreen) return 'auto';
        return '100vh';
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
        <Box position="relative" sx={{ mb: isSmallScreen ? '3rem' : isMediumScreen ? '3rem' : '12rem' }}>
            {/* Header Image */}
            <Box
                component="img"
                src={prodheader}
                alt="Header background"
                sx={{ 
                    width: '100%', 
                    height: getHeight(), 
                    objectFit: 'auto'
                }}
            />
            {/* Button */}
            <Box
                position={isSmallScreen ? 'static' : isMediumScreen ? 'relative' : 'absolute'}
                bottom={isSmallScreen ? 'initial' : isMediumScreen ? '8rem' : '10rem'}
                left={isSmallScreen ? 'initial' : isMediumScreen ? '2rem' : '5rem'}
                sx={{ 
                    mt: isSmallScreen ? '1rem' : '0',
                    display: 'flex',
                    justifyContent: isSmallScreen ? 'center' : 'flex-start'
                }}
            >
                <Button 
                    component={Link}
                    to="/je-depose-mon-potager"
                    variant="contained"
                    sx={{
                        backgroundColor: theme.palette.beige.clair,
                        borderRadius: '12px',
                    }}
                >
                    <Typography variant="button" sx={{ color: theme.palette.vert.claire }}>
                        Je dépose mon potager
                    </Typography>
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
