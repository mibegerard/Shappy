import React from 'react';
import { Container, Grid, Box, Typography, Link, useTheme } from '@mui/material';
import { useAuth } from '../../../context/AuthContext';
import { useLocation } from 'react-router-dom';
import SocialLinks from './SocialLink'; 
import Footersec from './Footersec';

const Footer = () => {
  const { auth } = useAuth();
  console.log(' footer Auth:', auth);
  const location = useLocation();
  const theme = useTheme();

  // Déterminer la couleur de fond en fonction de la page et du statut d'authentification
    let bgColor = '#FC8A1A'; // Default color
  
  if (!auth || !auth.isAuthenticated) {
    if (location.pathname === '/') {
      bgColor = '#E7272D';
    } else if (location.pathname === '/je-suis-producteur') {
      bgColor = '#9ACF5D';
    } else if (location.pathname === '/restaurateur') {
      bgColor = '#FC8A1A';
    }
  } else {
    bgColor = auth.user?.role === 'restaurateur' ? theme.palette.primary.main : '#9ACF5D';
    console.log('Auth role:', auth.user?.role);
  }

  const companyMenu = [
    { label: 'Cookies', path: '#' },
    { label: 'Politique de Confidentialité', path: '#' },
    { label: 'Mention Légales', path: '#' },
    { label: 'RGPD', path: '#' },
    { label: 'CGV', path: '#' }
  ];

  console.log('Current Page:', location.pathname);
  console.log('Background Color:', bgColor);

  return (
    <>
      <Footersec />
      <Box
        component="footer"
        sx={{
          bgcolor: bgColor,
          color: 'white',
          py: { xs: 1, md: 1 }
        }}
      >
        <Container>
          <Grid container spacing={1}>
          </Grid>
            <Grid item md={12} sx={{ textAlign: 'left', padding: '2rem' }}>
              <Box display="flex" alignItems="center" pt={3} flexWrap={{ xs: 'wrap', md: 'nowrap' }}>
                <Typography color="white">&copy; Shappy 2024</Typography>

                {/* Ligne verticale entre le copyright et le menu */}
                <Box sx={{ width: '1px', height: '20px', bgcolor: 'white', mx: 2 }} />

                <Box display="flex" alignItems="center" flexWrap={{ xs: 'wrap', md: 'nowrap' }}>
                  {companyMenu.map((item, index) => (
                    <React.Fragment key={item.label}>
                      <Link href={item.path} color="white" underline="none" sx={{ display: 'block', mb: { xs: 1, md: 0 } }}>
                        {item.label}
                      </Link>
                      {index < companyMenu.length - 1 && <Typography color="white" mx={1}>-</Typography>}
                    </React.Fragment>
                  ))}
                </Box>

                {/* Ajouter les liens sociaux à droite */}
                <Box sx={{ marginLeft: 'auto', display: 'flex' }}>
                  <SocialLinks />
              </Box>
            </Box>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Footer;