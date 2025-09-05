import React from 'react';
import { Container, Grid, Box, Link, Button, useTheme } from '@mui/material';
import FooterNavigation from './FooterNavigation';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import logorange from 'assets/images/logoshappyor.png';
import logored from 'assets/images/Logored.png';

const Footersec = () => {
  const { auth } = useAuth();
  const location = useLocation();
  const theme = useTheme();

  // Déterminer l'image du logo en fonction de la page et du statut d'authentification
  let logoImage = logorange; 
  console.log('Auth auth:', auth);
  
  if (!auth || !auth.isAuthenticated) {
    if (location.pathname === '/') {
      logoImage = logored;
    } else if (location.pathname === '/je-suis-producteur') {
      logoImage = logorange;
    } else if (location.pathname === '/restaurateur') {
      logoImage = logorange;
    }
  } else {
    // If the user is authenticated, set the logo to logorange
    logoImage = logorange;
  }

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "transparent",
        color: 'white',
        py: { xs: 6, md: 10 }
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={10}>
          <Grid item xs={12} md={3}>
            <Box display="flex" flexDirection="column" justifyContent="center" height="100%">
              <Button 
                component={Link} 
                to="/" 
                sx={{ 
                  p: 0, 
                  '&:hover': { 
                    backgroundColor: 'transparent' 
                  } 
                }}
              >
                <img src={logoImage} alt="Logo" style={{ height: 'auto' }} />
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            <FooterNavigation />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footersec;