import React from 'react';
import { Container, Grid, Box, Typography, Link } from '@mui/material';
import SocialLinks from './SocialLink'; // Adjust the import path as needed

const Footer = () => {
  const companyMenu = [
    { label: 'Cookies', path: '#' },
    { label: 'Politique de Confidentialité', path: '#' },
    { label: 'Mention Légales', path: '#' },
    { label: 'RGPD', path: '#' },
    { label: 'CGV', path: '#' }
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: { xs: 1, md: 1 }
      }}
    >
      <Container>
        <Grid container spacing={1}>
          <Grid item md={12} sx={{ textAlign: 'left', padding: '2rem' }}>
            <Box display={'flex'} alignItems={'center'} pt={3}>
              <Typography color={'white'}>&copy; Shappy 2024</Typography>

              {/* Vertical line between copyright and menu */}
              <Box sx={{ width: '1px', height: '20px', bgcolor: 'white', mx: 2 }} />

              <Box display={'flex'} alignItems={'center'}>
                {companyMenu.map((item, index) => (
                  <React.Fragment key={item.label}>
                    <Link href={item.path} color="white" underline="none">
                      {item.label}
                    </Link>
                    {index < companyMenu.length - 1 && <Typography color="white" mx={1}>-</Typography>}
                  </React.Fragment>
                ))}
              </Box>

              {/* Add social links on the right */}
              <Box sx={{ marginLeft: 'auto', display: 'flex' }}>
                <SocialLinks />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
