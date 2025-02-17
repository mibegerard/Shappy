import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

// Material-UI components
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { toast } from 'react-toastify';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AnimateButton from '../../../../ui-component/extended/AnimateButton';
import { useAuth } from 'context/AuthContext';
import axiosInstance from 'api/axiosInstance';
import { strengthColor, strengthIndicator } from '../../../../utils/password-strength';

const ProducteurRegister = ({ ...others }) => {
  const { auth } = useAuth();
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();
  const [productOptions, setProductOptions] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().max(255).required('Le prénom est requis'),
    lastName: Yup.string().max(255).required('Le nom est requis'),
    email: Yup.string().email('Doit être un email valide').max(255).required('L\'email est requis'),
    phoneNumber: Yup.string().max(15).required('Le numéro de téléphone est requis'),
    city: Yup.string().max(255).required('La ville est requise'),
    postalCode: Yup.string().max(10).required('Le code postal est requis'),
    password: Yup.string()
      .max(255)
      .required('Le mot de passe est requis')
      .test('password-strength', 'Le mot de passe doit comporter au moins 6 caractères, inclure des chiffres, des majuscules, des minuscules et des caractères spéciaux.', (value) => {
        return strengthIndicator(value) >= 5;
      }),
    products: Yup.array().min(1, 'Au moins un produit doit être sélectionné')
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      city: '',
      postalCode: '',
      password: '',
      products: []
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

  const handleProductChange = (event) => {
    const { value } = event.target;
    setSelectedProducts(value);
    setValue('products', value);
    setDropdownOpen(false);
  };

  const onSubmit = async (data) => {
    try {
      console.log("Submitting data:", data); // Log the submitted data
      const response = await axiosInstance.post('/auth/register/producteur', { ...data, role: 'producteur' });
      console.log('Registration response:', response.data); // Log the server response
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Navigate to the email verification page
      navigate('/auth/verify-email');
      toast.success('Inscription réussie');
      toast.success(`Heureux de vous savoir parmi nous, ${user.firstName}!`);
      toast.success('Veuillez consulter vos mails');
      
    } catch (error) {
      console.error('Registration error:', error); // Log the error object
      toast.error('Erreur d\'inscription : cet email est déjà utilisé. Veuillez essayer un autre.');
      console.log({ error });
    }
    if (errors.response) {
      // If the server responded with an error
      console.error('Server response error data:', errors.response.data); // Log the server error response
    } else if (errors.request) {
      // If the request was made but no response was received
      console.error('No response received:', errors.request); // Log the request details
    } else {
      // Something happened in setting up the request
      console.error('Error setting up request:', errors.message); // Log the error message
    }
  };

  useEffect(() => {
    if (auth.isAuthenticated && auth.user) {
      if (auth.user.role === 'producteur') {
        navigate('/je-suis-producteur');
      } else {
        navigate('/restaurateur');
      }
      toast.success('Inscription réussie!');
      toast.success(`Heureux de vous savoir parmi nous, ${auth.user.firstName}!`);
    }
  }, [auth, navigate]);

  return (
    <>
      <form noValidate onSubmit={handleSubmit(onSubmit)} {...others}>
        <Grid container spacing={matchDownSM ? 0 : 2}>
          {/* Left Side */}
          <Grid item xs={12} sm={6}>
            {/* Fields for First Name, Email, and Commune */}
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
  
            <FormControl fullWidth error={Boolean(errors.city)} sx={{ ...theme.typography.customInput }}>
              <InputLabel
                htmlFor="outlined-adornment-city-register"
                className="required-star"
                sx={{ fontSize: '13px' }}
              >
                Ville
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
  
          {/* Right Side */}
          <Grid item xs={12} sm={6}>
            {/* Fields for Last Name, Telephone, and Postal Code */}
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
  
            <FormControl fullWidth error={Boolean(errors.postalCode)} sx={{ ...theme.typography.customInput }}>
              <InputLabel
                htmlFor="outlined-adornment-postalCode-register"
                className="required-star"
                sx={{ fontSize: '13px' }}
              >
                Code Postal
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-postalCode-register"
                type="text"
                {...register('postalCode')}
                label="Code Postal"
                inputProps={{}}
              />
              {errors.postalCode && (
                <FormHelperText error id="standard-weight-helper-text-postalCode-register">
                  {errors.postalCode.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
  
          {/* Password and Product Selection */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel
                id="product-select-label"
                className="required-star"
                sx={{
                  fontWeight: '300px',
                  fontSize: '14px',
                  color: 'grey',
                  textAlign: 'center',
                  paddingTop: '5px',
                }}
              >
                Vos Produits
              </InputLabel>
              <Select
                labelId="product-select-label"
                id="product-select"
                multiple
                value={selectedProducts}
                onChange={handleProductChange}
                label="Vos Produits"
                open={dropdownOpen}
                onOpen={() => setDropdownOpen(true)}
                onClose={() => setDropdownOpen(false)}
                sx={{ pt: 0.7, pb: 0.7 }}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Typography key={value} sx={{ color: 'grey' }}>{value}</Typography>
                    ))}
                  </Box>
                )}
              >
                <MenuItem value="Fruits">
                  <FormControlLabel
                    control={<Checkbox checked={selectedProducts.includes('Fruits')} sx={{ color: 'grey' }} />}
                    label="Fruits"
                    sx={{ color: 'grey' }}
                  />
                </MenuItem>
                <MenuItem value="Légumes">
                  <FormControlLabel
                    control={<Checkbox checked={selectedProducts.includes('Légumes')} sx={{ color: 'grey' }} />}
                    label="Légumes"
                    sx={{ color: 'grey' }}
                  />
                </MenuItem>
              </Select>
              {errors.products && (
                <FormHelperText error id="standard-weight-helper-text-products-register">
                  {errors.products.message}
                </FormHelperText>
              )}
            </FormControl>
  
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
                {...register('password', { onChange: (e) => changePassword(e.target.value) })}
                label="Mot de passe"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
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

            {/* Strength Indicator */}
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
                  sx={{ backgroundColor: '#9ACF5D' }}
                  fullWidth
                  disabled={isSubmitting}
                  startIcon={isSubmitting && <CircularProgress size={24} color="inherit" />}
                >
                  {isSubmitting ? 'Loading...' : 'S\'inscrire'}
                </Button>
              </AnimateButton>
            </Box>
          </Grid>
        </Grid>
      </form>
    </>
  );
  };
  
  export default ProducteurRegister;  