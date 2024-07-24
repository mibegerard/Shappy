import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Box, Typography, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import fruitsfooter from 'assets/images/fruitsfooter.png';
import FooterSectionTitle from './FooterSectionTitle';
import { useTheme } from '@mui/material/styles';

const PagesMenu = [
  { label: 'Je suis producteur', path: '#' },
  { label: 'Mon Potager', path: '#' },
  { label: 'Mon marché', path: '#' },
  { label: 'Les producteurs', path: '#' },
  { label: 'Je me connecte', path: '#' },
  { label: 'Qui sommes-nous ?', path: '#' },
  { label: 'Contactez-nous ?', path: '#' }
];

const Horaires = [
  { label: 'Du Lundi Au Vendredi de 09h à 19h', path: '#' },
  { label: 'Le week-end de 09h à 15h', path: '#' },
];

const Aide = [
  { label: 'Shappy.pro@gmail.com', path: '#' },
  { label: '40 rue du Chemin Vert, 75011 Paris', path: '#' }
];

const NavigationItem = ({ label, path }) => {
  const theme = useTheme();
  const orangeMain = theme.palette.orange?.main || '#FC8A1A'; // Ensure fallback value

  return (
    <Link to={path} passHref>
      <MuiLink
        sx={{
          display: 'block',
          mb: 1,
          color: orangeMain,
          textDecoration: 'none'
        }}
      >
        {label}
      </MuiLink>
    </Link>
  );
};

NavigationItem.propTypes = {
  label: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

const FooterNavigation = () => {
  const theme = useTheme();
  const orangeMain = theme.palette.orange?.main || '#FC8A1A';
  const beigeClair = theme.palette.beige?.clair || '#FFF4E2';

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3}> {/* Reduced size */}
        <FooterSectionTitle title="PAGES" />
        {PagesMenu.map(({ label, path }, index) => (
          <NavigationItem key={index + path} label={label} path={path} />
        ))}
      </Grid>
      <Grid item xs={12} md={4}>
        <Box sx={{ mb: 5 }}> {/* Padding bottom for the first section */}
          <FooterSectionTitle title="HORAIRES D'OUVERTURE" />
          {Horaires.map(({ label, path }, index) => (
            <NavigationItem key={index + path} label={label} path={path} />
          ))}
        </Box>
        
        <Box sx={{ mt: 5 }}> {/* Padding top for the second section */}
          <FooterSectionTitle title="BESOIN D'AIDE ?" />
          {Aide.map(({ label, path }, index) => (
            <NavigationItem key={index + path} label={label} path={path} />
          ))}
        </Box>
      </Grid>

      <Grid item xs={12} md={5}> {/* Increased size */}
        <Box display="flex" flexDirection="column">
          <Box display="flex" justifyContent="center" alignItems="center">
            <img src={fruitsfooter} alt="Logo" style={{ height: '130px' }} />
          </Box>
          <Typography variant="h2" sx={{ textAlign: 'left', mb: 2, color: orangeMain, fontSize: '1.6rem' }}>
            ABBONEZ-VOUS À NOTRE NEWS FRUITÉ
          </Typography>
          <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ padding: '0.5rem', backgroundColor: orangeMain, borderRadius: '0.5rem' }}>
            <EmailIcon />
            <MuiLink 
              href="mailto:shappy.pro@gmail.com" 
              sx={{ color: beigeClair, textDecoration: 'none' }}
              variant="body1" 
              noWrap
            >
              shappy.pro@gmail.com
            </MuiLink>
            <ArrowForwardIcon />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default FooterNavigation;
