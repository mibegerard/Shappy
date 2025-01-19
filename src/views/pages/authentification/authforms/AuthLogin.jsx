import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAuth } from 'context/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import axiosInstance from 'api/axiosInstance';

const AuthLogin = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const [checked, setChecked] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Must be a valid email').max(255).required('L\'email est requis'),
    password: Yup.string().max(255).required('Le mot de passe est requis')
  });

  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data) => {
    const token = localStorage.getItem('token'); 
    console.log('Login request payload:', data); 
    console.log('Token:', token);
    try {
      const response = await axiosInstance.post('/auth/login', { ...data, token});
      const { token: newToken, user } = response.data;

      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(user));
      if (response) {
        // Reload the page
        window.location.reload();
      }
    } catch (error) {
      toast.error('Vos identifiants sont incorrects.');
      console.error('Login error:', error);
    }
  };

  useEffect(() => {
    if (auth.isAuthenticated && auth.user) {
      if (auth.user.role === 'producteur') {
        navigate('/je-suis-producteur');
      } else {
        navigate('/');
      }
      toast.success('Connexion réussie!');
      toast.success(`Heureux de vous savoir parmi nous, ${auth.user.firstName}!`);
    }
  }, [auth, navigate]);

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <FormControl fullWidth error={Boolean(errors.email)} sx={{ ...theme.typography.customInput }}>
        <InputLabel htmlFor="outlined-adornment-email-login">Adresse Mail</InputLabel>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <OutlinedInput
              {...field}
              id="outlined-adornment-email-login"
              type="email"
              label="Adresse Mail"
              endAdornment={
                <InputAdornment position="end">
                  <MailOutlineIcon edge="end" size="large" />
                </InputAdornment>
              }
            />
          )}
        />
        {errors.email && (
          <FormHelperText error id="standard-weight-helper-text-email-login">
            {errors.email.message}
          </FormHelperText>
        )}
      </FormControl>

      <FormControl fullWidth error={Boolean(errors.password)} sx={{ ...theme.typography.customInput }}>
        <InputLabel htmlFor="outlined-adornment-password-login">Mot de passe</InputLabel>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <OutlinedInput
              {...field}
              id="outlined-adornment-password-login"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                    size="large"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              label="Mot de passe"
            />
          )}
        />
        {errors.password && (
          <FormHelperText error id="standard-weight-helper-text-password-login">
            {errors.password.message}
          </FormHelperText>
        )}
      </FormControl>

      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              sx={{ color: '#E7272D', '&.Mui-checked': { color: '#E7272D' } }}
              onChange={(event) => setChecked(event.target.checked)}
              name="checked"
              color="primary"
            />
          }
          label={<Typography sx={{ color: '#E7272D', fontSize: { xs: '12px', sm: '16px' } }}>Se souvenir de moi</Typography>}
        />
        <Typography variant="subtitle1" color="#FC8A1A" sx={{ textDecoration: 'none', cursor: 'pointer', fontSize: { xs: '12px', sm: '16px' } }}>
          Mot de passe oublié?
        </Typography>
      </Stack>

      {errors.submit && (
        <Box sx={{ mt: 3 }}>
          <FormHelperText error>{errors.submit}</FormHelperText>
        </Box>
      )}

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ width: '70%', backgroundColor: '#E7272D', fontSize: '18px' }}
          disabled={isSubmitting}
          startIcon={isSubmitting && <CircularProgress size={24} color="inherit" />}
        >
          {isSubmitting ? 'Loading...' : 'Se connecter'}
        </Button>
      </Box>
    </form>
  );
};

export default AuthLogin;
