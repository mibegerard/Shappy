import React, { useEffect } from 'react';
import { Box, Container, Typography, Paper, Button, useMediaQuery } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from 'context/AuthContext';
import axiosInstance from 'api/axiosInstance';
import { useTheme } from '@mui/material/styles';
import { toast } from 'react-toastify';
import restheader from 'assets/images/headerandbackground.png';

const VerifyEmail = () => {
    const { login, loginWithToken } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        if (token) {
            handleEmailVerification(token);
        }
    }, [location]);

    const handleEmailVerification = async (token) => {
        try {
            await loginWithToken(token);
            navigate('/'); // Redirect to the home page after successful login
            toast.success('Email vérifié avec succès ! Redirection en cours...');
        } catch (error) {
            console.error("Error during email verification:", error);
            toast.error('Échec de la vérification de l\'email. Veuillez vérifier votre compte');
        }
    };

    const handleVerifyDone = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            await handleEmailVerification(token);
        } else {
          toast.error('Veuillez vérifier le lien de vérification dans votre e-mail et réessayer.');
        }
    };

    const handleLogin = async () => {
        navigate('/auth/login'); // Adjust this based on your routing setup
        toast.info('Redirection vers la page de connexion...');
    };

    const handleResendEmail = async (email) => {
      try {
          const email = localStorage.getItem('email');
          console.log('Email retrieved from local storage:', email);
          if (!email) {
              toast.error('Email non trouvé. Veuillez vous reconnecter et réessayer.');
              return;
          }

          const response = await axiosInstance.post('/auth/resend-verification', { email });

          toast.success('Un nouveau lien de vérification a été envoyé à votre adresse e-mail.');
      } catch (error) {
          console.error("Error while resending verification email:", error);
          toast.error('Erreur lors de l\'envoi du lien de vérification. Veuillez réessayer.');
      }
    };

    return (
      <Box sx={{ position: 'relative', width: '100%', height: '100vh' }}>
          {/* Header Image */}
          <Box
              component="img"
              src={restheader}
              alt="Header background"
              sx={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover' 
              }}
          />

          {/* Centered Content */}
          <Box
              sx={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 1,
                  p: 3,
              }}
          >
              <Container maxWidth="sm">
                  <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
                      <Box textAlign="center" sx={{ mb: 3 }}>
                          <Typography variant="h4" gutterBottom>
                              Vérifiez votre adresse e-mail
                          </Typography>
                          <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                              Un e-mail de vérification a été envoyé à votre adresse. Veuillez vérifier votre boîte de réception pour confirmer votre adresse e-mail.
                          </Typography>
                      </Box>
                      {/* Action Buttons */}
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                          <Button
                              variant="contained"
                              color="primary"
                              onClick={handleVerifyDone}
                              sx={{
                                  '&:hover': { backgroundColor: theme.palette.primary.dark },
                              }}
                          >
                              Connexion automatique
                          </Button>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Button
                                  variant="contained"
                                  color="secondary"
                                  onClick={handleResendEmail}
                                  sx={{
                                      '&:hover': { backgroundColor: theme.palette.secondary.dark },
                                      flex: 1, // Allow buttons to take equal space
                                      mr: 1, // Margin to separate the buttons
                                  }}
                              >
                                  Renvoyer le lien
                              </Button>
                              <Button
                                  variant="contained"
                                  color="red"
                                  onClick={handleLogin}
                                  sx={{
                                      '&:hover': { backgroundColor: theme.palette.secondary.dark },
                                      flex: 1, // Allow buttons to take equal space
                                      mr: 1, // Margin to separate the buttons
                                  }}
                              >
                                  Login
                              </Button>
                          </Box>
                      </Box>
                  </Paper>
              </Container>
          </Box>
      </Box>
  );
};

export default VerifyEmail;