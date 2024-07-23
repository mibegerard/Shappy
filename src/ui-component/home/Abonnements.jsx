import React from 'react';
import { Box, Typography, Container, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import abonnements from 'assets/images/Les abonnements Shappy.png'; 

const Abonnement = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); 

    return (
        <Container>
            <Box 
                sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    textAlign: 'center', 
                    padding: theme.spacing(4)
                }}
            >
                <Typography 
                    variant={isSmallScreen ? 'h3' : 'h1'} 
                    sx={{ 
                        color: theme.palette.text.primary,
                        marginTop: theme.spacing(6),  
                        marginBottom: theme.spacing(6) 
                    }}
                >
                    JE DÉCOUVRE LES ABONNEMENTS SHAPPY
                </Typography>
                <Box 
                    component="img" 
                    src={abonnements} 
                    alt="Les Abonnements Shappy" 
                    sx={{ 
                        maxWidth: '100%', 
                        height: 'auto', 
                        borderRadius: '8px' 
                    }} 
                />
            </Box>
        </Container>
    );
};

export default Abonnement;
