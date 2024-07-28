import React from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const InfoCard = ({ percentage, text, highlight }) => {
    const theme = useTheme();
    
    // Define media queries
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    // Define styles with responsive font sizes
    const styles = {
        cardContainer: {
            backgroundColor: 'white',
            color: theme.palette.vert.fonce,
            padding: isSmallScreen ? '1.5rem' : '3rem',
            borderRadius: '15px',
            boxShadow: 3,
            textAlign: 'center',
            width: isSmallScreen ? '70%' : isMediumScreen ? '80%' : 'auto',
        },
        percentageText: {
            fontSize: isSmallScreen ? '2rem' : isMediumScreen ? '3rem' : '4rem',
            color: theme.palette.vert.fonce,
        },
        bodyText: {
            fontSize: isSmallScreen ? '1rem' : isMediumScreen ? '1.25rem' : '1.5rem',
            color: theme.palette.vert.fonce,
        },
        highlightText: {
            color: theme.palette.vert.claire,
        }
    };

    // Determine the variant of Typography based on screen size
    const headerVariant = isSmallScreen ? 'h3' : isMediumScreen ? 'h2' : 'h1';
    
    return (
        <Box sx={styles.cardContainer}>
            <Typography variant={headerVariant} sx={styles.percentageText}>
                {percentage}
            </Typography>
            <Typography variant="h3" sx={styles.bodyText}>
                {text} <span style={styles.highlightText}>{highlight}</span>
            </Typography>
        </Box>
    );
};

export default InfoCard;
