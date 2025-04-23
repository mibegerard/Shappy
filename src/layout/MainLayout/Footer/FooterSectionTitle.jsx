import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box, useTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

  const FooterSectionTitle = ({ title }) => {
    const { auth } = useAuth();
    const location = useLocation();
    const theme = useTheme();
    console.log('FooterSectionTitle Auth:', auth);
    console.log('FooterSectionTitle Auth:', auth);

  // Déterminer la couleur de fond en fonction de la page et du statut d'authentification
  let color = '#FC8A1A'; // Default color
  
  if (!auth || !auth.isAuthenticated) {
    if (location.pathname === '/') {
      color = '#E7272D';
    } else if (location.pathname === '/je-suis-producteur') {
      color = '#9ACF5D';
    } else if (location.pathname === '/restaurateur') {
      color = '#FC8A1A';
    }
  } else {
    color = auth.user?.role === 'restaurateur' ? theme.palette.primary.main : '#9ACF5D';
    console.log('Auth role:', auth.user?.role);
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mb: 2,
      }}
    >
      <Typography component="h1" variant="h3" sx={{ color: color, fontWeight: '700', fontSize: '1.6rem' }}>
        {title}
      </Typography>
    </Box>
  );
};

FooterSectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default FooterSectionTitle;
