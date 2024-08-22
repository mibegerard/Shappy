import React from 'react';
import { Container, Grid, Box, Typography, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles'; // Import useTheme from @mui/material/styles
import SocialLinks from './SocialLink'; // Adjust the import path as needed

const Footer = () => {
  const theme = useTheme(); // Define theme using the useTheme hook
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
        mt: '2vh', // Adding margin-top of 5vh
      }}
    >
      <Container>
        <Grid container spacing={1}>
          <Grid item md={12} sx={{ textAlign: 'left' }}>
            <Box display="flex" alignItems="center" flexWrap={{ xs: 'wrap', md: 'nowrap' }}>
              <Typography sx={{ color: "#385909", mx: 1, my:'5vh' }}>&copy; Shappy 2024</Typography>

              {/* Vertical line between copyright and menu */}
              <Box sx={{ width: '1px', height: '20px', bgcolor: 'white', mx: 2 }} />

              <Box display="flex" alignItems="center" flexWrap={{ xs: 'wrap', md: 'nowrap' }}>
                {companyMenu.map((item, index) => (
                  <React.Fragment key={item.label}>
                    <Link
                      href={item.path}
                      underline="none"
                      sx={{
                        color: "#385909",
                        display: 'block',
                        mb: { xs: 1, md: 0 }
                      }}
                    >
                      {item.label}
                    </Link>
                    {index < companyMenu.length - 1 && (
                      <Typography sx={{ color: "#385909", mx: 1 }}>-</Typography>
                    )}
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
