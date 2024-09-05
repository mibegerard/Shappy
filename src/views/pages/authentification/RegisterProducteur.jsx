import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider'; // Import Divider component
import headerimage from '../../../assets/images/Header_Photo fruits et légumes.png';
import avocat from 'assets/images/Avocat producteur.png';
import AuthCardWrapper from '../AuthCardWrapper';
import Logo from '../../../ui-component/Logo';
import ProducteurRegister from './authforms/ProducteurRegister';

// ===============================|| AUTH3 - REGISTER ||=============================== //

const RegisterProducteur = () => {
  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down('md'));
  const downXS = useMediaQuery(theme.breakpoints.down('sm'));


  return (
    <Grid 
      container 
      direction="column" 
      justifyContent="center" 
      alignItems="center" 
      sx={{ width: '100%' }} // Removed minHeight to avoid full page height
    >
      {/* Header Image Block */}
      <Grid 
        item xs={12} 
        sx={{ position: 'relative', width: '100%', height: '40vh' }}
      >
        <Box
          component="img"
          src={headerimage}
          alt="Header"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'relative',
            zIndex: 1,
          }}
        />
        {/* Avocat Image */}
        <Box
          component="img"
          src={avocat}
          alt="avocat"
          sx={{
            position: 'absolute',
            bottom: 0,
            left: '80%',
            transform: 'translateX(-50%)',
            height: '30%',
            zIndex: 2,
          }}
        />
        {/* Overlay Block */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: downMD ? '0 0 40px 40px' : '0 0 60px 60px',
            backgroundColor: '#9ACF5D',
            zIndex: 0,
          }}
        />
      </Grid>

      {/* Authentication Card Block */}
      <Grid item xs={12} sx={{ position: 'relative', width: '100%', mt: downMD ? '-8vh' : '-35vh' }}>
        <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: downMD ? '60vh' : '50vh' }}>
          <Grid item xs={12} sm={8} md={6} lg={6} sx={{ display: 'flex', justifyContent: 'center' }}>
            <AuthCardWrapper>
              <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ position: 'relative', zIndex: 2 }}>
                {/* Logo Block */}
                <Grid item xs={12} sx={{ textAlign: 'center', mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <Link to="#" aria-label="theme logo">
                      <Logo /> {/* Adjust size here */}
                    </Link>
                  </Box>
                </Grid>
                <Box sx={{ width: '100%', textAlign: 'center', mb: 2 }}>
                  <Typography
                    variant="h2"
                    sx={{
                      color: '#9ACF5D',
                      fontSize: '30px',
                      fontWeight: '700',
                      letterSpacing: '1px',
                    }}
                  >
                    INSCRIPTION PRODUCTEUR
                  </Typography>
                </Box>
                <Grid item xs={12}>
                  <ProducteurRegister />
                </Grid>
                {/* Alternatives */}
                <Grid item xs={12} sx={{ mt: 3 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 2, // Add some space between the items
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: '600', fontSize: downXS ? '10px' : '14px', color: '#9ACF5D', }}>
                        Déjà Inscrit ?
                      </Typography>
                      <Button
                        component={Link}
                        to="/auth/login"
                        variant="outlined"
                        sx={{
                          color: '#9ACF5D',
                          fontSize: downXS ? '10px' : '14px',
                          borderColor: '#FC8A1A',
                          '&:hover': {
                            backgroundColor: '#E7272D',
                            color: '#fff',
                            borderColor: '#FC8A1A',
                          },
                        }}
                      >
                        Connectez-vous
                      </Button>
                    </Box>
                    <Divider orientation="vertical" flexItem sx={{ borderColor: '#FC8A1A' }} /> {/* Vertical Divider */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: '600', fontSize: downXS ? '10px' : '14px', color: '#9ACF5D', }}>
                         Se connecter en tant que
                      </Typography>
                      <Button
                        component={Link}
                        to="/auth/register/restaurateur"
                        variant="outlined"
                        sx={{
                          color: '#9ACF5D',
                          fontSize: downXS ? '10px' : '14px',
                          borderColor: '#FC8A1A',
                          '&:hover': {
                            backgroundColor: '#FC8A1A',
                            color: '#fff',
                            borderColor: '#FC8A1A',
                          },
                        }}
                      >
                        Restaurateur
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </AuthCardWrapper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RegisterProducteur;
