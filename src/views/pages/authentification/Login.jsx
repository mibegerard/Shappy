import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import headerimage from '../../../assets/images/Header_Photo fruits et légumes.png';
import citron from 'assets/images/Fichier 14@2x 1.png';
import Logo from '../../../ui-component/Logo';
import restau from 'assets/images/Restaurateur_Rouge.png';
import prod from 'assets/images/Restarateur et producteur 1.png';
import carote from 'assets/images/Carotte restauratrice.png';
import avocat from 'assets/images/Avocat producteur.png';

// project imports
import AuthCardWrapper from '../AuthCardWrapper';
import AuthLogin from './authforms/AuthLogin';

const Login = () => {
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
        {/* Citron Image */}
        <Box
          component="img"
          src={citron}
          alt="citron"
          sx={{
            position: 'absolute',
            bottom: '30%',
            left: '65%',
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
            backgroundColor: '#E7272D',
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
                      <Logo />
                    </Link>
                  </Box>
                </Grid>
                <Box sx={{ width: '100%', textAlign: 'center', mb: 2 }}>
                  <Typography
                    variant="h2"
                    sx={{
                      color: theme.colors?.redMain || '#E7272D',
                      fontSize: '30px',
                      fontWeight: '700',
                      letterSpacing: '1px',
                    }}
                  >
                    CONNEXION
                  </Typography>
                </Box>
                <Grid item xs={12}>
                  <AuthLogin />
                </Grid>

                {/* New Section with Carrot, Text, and Avocado */}
                <Grid item xs={12}>
                  <Grid container justifyContent="center" alignItems="center">
                    <Grid item>
                      <Box
                        component="img"
                        src={carote}
                        alt="Carrot Icon"
                        sx={{
                          width: downXS ? '70px' : '70px',
                          height: 'auto',
                        }}
                      />
                    </Grid>
                    <Grid item sx={{ mx: 2 }}>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: downXS ? '12px' : '16px',
                          color: '#E7272D',
                          fontWeight: 900,
                          textAlign: 'center',
                        }}
                      >
                        ou <br /> s'inscrire en tant que
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Box
                        component="img"
                        src={avocat}
                        alt="Avocado Icon"
                        sx={{
                          width: downXS ? '70px' : '70px',
                          height: 'auto',
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                {/* Alternatives */}
                <Grid item xs={12} sx={{ mt: -3 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 2, // Add some space between the items
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Button
                        component={Link}
                        to="/auth/register/restaurateur"
                        variant="outlined"
                        sx={{
                          color: '#E7272D',
                          fontSize: downXS ? '10px' : '14px',
                          borderColor: '#E7272D',
                          borderWidth: '2px',
                          '&:hover': {
                            backgroundColor: '#FC8A1A',
                            color: '#fff',
                            borderColor: '#FC8A1A',
                          },
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        <Box
                          component="img"
                          src={restau}
                          alt="Restaurateur Icon"
                          sx={{
                            width: downXS ? '25px' : '29px', // 5px larger than Producteur image
                            height: 'auto',
                          }}
                        />
                        Restaurateur
                      </Button>
                    </Box>
                    <Divider orientation="vertical" flexItem sx={{ borderColor: '#FC8A1A' }} />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Button
                        component={Link}
                        to="/auth/register/producteur"
                        variant="outlined"
                        sx={{
                          color: '#E7272D',
                          fontSize: downXS ? '10px' : '14px',
                          borderColor: '#E7272D',
                          borderWidth: '2px',
                          '&:hover': {
                            backgroundColor: '#9ACF5D',
                            color: '#fff',
                            borderColor: '#FC8A1A',
                          },
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        <Box
                          component="img"
                          src={prod}
                          alt="Producteur Icon"
                          sx={{
                            width: downXS ? '20px' : '24px',
                            height: 'auto',
                          }}
                        />
                        Producteur
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

export default Login;
