import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';

// project imports
import AnimateButton from '../../../../ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from '../../../../utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import axiosInstance from 'api/axiosInstance';
import { toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';

const RestaurateurRegister = ({ ...others }) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().max(255).required('Le prénom est requis'),
    lastName: Yup.string().max(255).required('Le nom est requis'),
    email: Yup.string().email('Doit être un email valide').max(255).required('L\'email est requis'),
    phoneNumber: Yup.string().max(15).required('Le numéro de téléphone est requis'),
    restaurantName: Yup.string().max(255).required('Le nom du restaurant est requis'),
    restaurantAddress: Yup.string().max(255).required('L\'adresse du restaurant est requise'),
    postalCode: Yup.string().max(10).required('Le code postal est requis'),
    city: Yup.string().max(255).required('La ville est requise'),
    password: Yup.string().max(255).required('Le mot de passe est requis')
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      restaurantName: '',
      restaurantAddress: '',
      postalCode: '',
      city: '',
      password: ''
    }
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('123456');
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post('/auth/register/restaurateur', { ...data, role: 'restaurateur' });
      const { token, user } = response.data;
      
      // Store the token in local storage or session storage
      localStorage.setItem('token', token);
      // Optionally, store user details in local storage
      localStorage.setItem('user', JSON.stringify(user));
  
      // Update state or context if necessary
      navigate('/');
  
      // Display success toast messages
      toast.success('Inscription réussie');
      toast.success(`Heureux de vous savoir parmi nous, ${user.firstName}!`);
  
    } catch (error) {
      toast.error('Erreur d\'inscription');
      console.log({ error });
    }
  };
  

  return (
    <>
      <form noValidate onSubmit={handleSubmit(onSubmit)} {...others}>
        <Grid container spacing={matchDownSM ? 0 : 2}>
          {/* Left Side */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={Boolean(errors.firstName)} sx={{ ...theme.typography.customInput }}>
              <InputLabel
                htmlFor="outlined-adornment-firstName-register"
                className="required-star"
                sx={{ fontSize: '13px' }}
              >
                Prénom
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-firstName-register"
                type="text"
                {...register('firstName')}
                label="Prénom"
                inputProps={{}}
              />
              {errors.firstName && (
                <FormHelperText error id="standard-weight-helper-text-firstName-register">
                  {errors.firstName.message}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel
                htmlFor="outlined-adornment-email-register"
                className="required-star"
                sx={{ fontSize: '13px' }}
              >
                Adresse Mail
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="email"
                {...register('email')}
                label="Adresse Mail"
                inputProps={{}}
              />
              {errors.email && (
                <FormHelperText error id="standard-weight-helper-text-email-register">
                  {errors.email.message}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(errors.restaurantName)} sx={{ ...theme.typography.customInput }}>
              <InputLabel
                htmlFor="outlined-adornment-restaurantName-register"
                className="required-star"
                sx={{ fontSize: '13px' }}
              >
                Nom du Restaurant
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-restaurantName-register"
                type="text"
                {...register('restaurantName')}
                label="Nom du Restaurant"
                inputProps={{}}
              />
              {errors.restaurantName && (
                <FormHelperText error id="standard-weight-helper-text-restaurantName-register">
                  {errors.restaurantName.message}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(errors.postalCode)} sx={{ ...theme.typography.customInput }}>
              <InputLabel
                htmlFor="outlined-adornment-postalCode-register"
                className="required-star"
                sx={{ fontSize: '13px' }}
              >
                Code Postale
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-postalCode-register"
                type="text"
                {...register('postalCode')}
                label="Code Postale"
                inputProps={{}}
              />
              {errors.postalCode && (
                <FormHelperText error id="standard-weight-helper-text-postalCode-register">
                  {errors.postalCode.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/* Right Side */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={Boolean(errors.lastName)} sx={{ ...theme.typography.customInput }}>
              <InputLabel
                htmlFor="outlined-adornment-lastName-register"
                className="required-star"
                sx={{ fontSize: '13px' }}
              >
                Nom
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-lastName-register"
                type="text"
                {...register('lastName')}
                label="Nom"
                inputProps={{}}
              />
              {errors.lastName && (
                <FormHelperText error id="standard-weight-helper-text-lastName-register">
                  {errors.lastName.message}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(errors.phoneNumber)} sx={{ ...theme.typography.customInput }}>
              <InputLabel
                htmlFor="outlined-adornment-phoneNumber-register"
                className="required-star"
                sx={{ fontSize: '13px' }}
              >
                Numéro de téléphone
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-phoneNumber-register"
                type="text"
                {...register('phoneNumber')}
                label="Numéro de téléphone"
                inputProps={{}}
              />
              {errors.phoneNumber && (
                <FormHelperText error id="standard-weight-helper-text-phoneNumber-register">
                  {errors.phoneNumber.message}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(errors.restaurantAddress)} sx={{ ...theme.typography.customInput }}>
              <InputLabel
                htmlFor="outlined-adornment-restaurantAddress-register"
                className="required-star"
                sx={{ fontSize: '13px' }}
              >
                Adresse du Restaurant
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-restaurantAddress-register"
                type="text"
                {...register('restaurantAddress')}
                label="Adresse du Restaurant"
                inputProps={{}}
              />
              {errors.restaurantAddress && (
                <FormHelperText error id="standard-weight-helper-text-restaurantAddress-register">
                  {errors.restaurantAddress.message}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(errors.city)} sx={{ ...theme.typography.customInput }}>
              <InputLabel
                htmlFor="outlined-adornment-city-register"
                className="required-star"
                sx={{ fontSize: '13px' }}
              >
                Ville du Restaurant
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-city-register"
                type="text"
                {...register('city')}
                label="Ville du Restaurant"
                inputProps={{}}
              />
              {errors.city && (
                <FormHelperText error id="standard-weight-helper-text-city-register">
                  {errors.city.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>

        <FormControl fullWidth error={Boolean(errors.password)} sx={{ ...theme.typography.customInput }}>
          <InputLabel
            htmlFor="outlined-adornment-password-register"
            className="required-star"
            sx={{ fontSize: '13px' }}
          >
            Mot de passe
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password-register"
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            label="Mot de passe"
            onChange={(e) => changePassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  size="large"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            inputProps={{}}
          />
          {errors.password && (
            <FormHelperText error id="standard-weight-helper-text-password-register">
              {errors.password.message}
            </FormHelperText>
          )}
        </FormControl>

        {strength !== 0 && (
          <FormControl fullWidth>
            <Box sx={{ my: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Box style={{ backgroundColor: level?.color }} sx={{ width: 85, height: 8, borderRadius: '7px' }} />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" fontSize="0.75rem">
                    {level?.label}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </FormControl>
        )}

        <Box sx={{ mt: 2 }}>
          <AnimateButton>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isSubmitting}
              startIcon={isSubmitting && <CircularProgress size={24} color="inherit" />}
            >
              {isSubmitting ? 'Loading...' : 'S\'inscrire'}
            </Button>
          </AnimateButton>
        </Box>
      </form>
    </>
  );
};

export default RestaurateurRegister;
