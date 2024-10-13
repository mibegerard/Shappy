import React from 'react';
import { Container, Grid, Box, Link, Button } from '@mui/material';
import FooterNavigation from './FooterNavigation';
import logorange from 'assets/images/logoshappyor.png';

const Footersec = () => {
    return (
      <Box
        component="footer"
        sx={{
          bgcolor: '#fff7eb',
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
                  <img src={logorange} alt="Logo" style={{ height: 'auto' }} />
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
