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

import { useAuth } from 'context/AuthContext';
import axiosInstance from 'api/axiosInstance';
import { toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';

const RestaurateurEditForm = ({ ...others }) => {
  const { auth } = useAuth();
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const [level, setLevel] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Function to get user ID from auth context
  const getUserId = () => auth.user?._id || auth.user?.id;

  const validationSchema = Yup.object().shape({
    restaurantName: Yup.string().optional(),
    restaurantAddress: Yup.string().optional(),
    city: Yup.string().optional(),
    postalCode: Yup.string().optional(),
    phoneNumber: Yup.string().optional(),
    description: Yup.string().optional()
  });
    
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      restaurantName: '',
      restaurantAddress: '',
      city: '',
      postalCode: '',
      phoneNumber: '',
      description: ''
    },
  });
  

  // Watch all form values
  const watchValues = watch();
  
  useEffect(() => {
    const fetchProfileData = async () => {
      const userId = getUserId();
      if (!userId) {
        setError('User ID missing. Cannot fetch data.');
        setLoading(false);
        return;
      }
  
      try {
        const response = await axiosInstance.get(`/auth/me`);
        console.log('Fetching user data for user ID:', userId);
        console.log(response); 
        const { restaurantName, restaurantAddress, city, postalCode, phoneNumber, description } = response.data;
  
        // Check the structure of the response
        const userData = response.data.data; // Access the nested 'data' object

        // Log the data to verify it
        console.log({
          restaurantName: userData.restaurantName,
          restaurantAddress: userData.restaurantAddress,
          city: userData.city,
          postalCode: userData.postalCode,
          phoneNumber: userData.phoneNumber,
          description: userData.description
        });
  
        // Set the form values
        ['restaurantName', 'restaurantAddress', 'city', 'postalCode', 'phoneNumber', 'description'].forEach((field) =>
          setValue(field, userData[field] || '')
        );

        // Update the userData state
        setUserData(userData);
      } catch (err) {
        console.log(err);  // Log the error for debugging
        setError('Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };
  
    if (auth.isAuthenticated) {
      fetchProfileData();
    } else {
      setError('User is not authenticated.');
      setLoading(false);
    }
  }, [auth.isAuthenticated, setValue]);  

  const onSubmit = async (data) => {
    setIsSubmitting(true);
  
    const updatedData = Object.entries(data).reduce((acc, [key, value]) => {
      // Only include fields that have changed compared to userData
      if (value !== userData[key]) acc[key] = value;
      return acc;
    }, {});
  
    if (Object.keys(updatedData).length === 0) {
      toast.info('No changes detected.');
      setIsSubmitting(false);
      return;
    }
  
    // Log the updatedData to see what is being sent
    console.log('Updated Data to be sent:', updatedData);
  
    try {
      // Dynamically define the property and value based on updated data
      const property = Object.keys(updatedData)[0]; // Get the first property that changed
      const value = updatedData[property]; // Get the value for that property
  
      // Log the property and value being sent
      console.log('Property:', property);
      console.log('Value:', value);
  
      // Send the request with property and updateData
      await axiosInstance.put(`/restaurateur/update`, {
        property,
        updateData: updatedData, // Now only send updatedData, no need for value anymore
      });
  
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Error updating profile.');
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <>
      <form noValidate onSubmit={handleSubmit(onSubmit)} {...others}>
        <Grid container spacing={matchDownSM ? 0 : 2}>
          {/* Left Side */}
          <Grid item xs={12} sm={6}>

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

        <Grid item xs={12}>
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

          <FormControl fullWidth error={Boolean(errors.description)} sx={{ ...theme.typography.customInput }}>
            <InputLabel
              htmlFor="outlined-adornment-description-register"
              className="required-star"
              sx={{ fontSize: '13px' }}
            >
              Description
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-description-register"
              type="text"
              {...register('description')}
              label="Description"
              inputProps={{}}
            />
            {errors.description && (
              <FormHelperText error id="standard-weight-helper-text-city-register">
                {errors.description.message}
              </FormHelperText>
            )}
          </FormControl>
          
        </Grid>

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
              {isSubmitting ? 'Un instant...' : 'Mettre à jour'}
            </Button>
          </AnimateButton>
        </Box>
      </form>
    </>
  );
};

export default RestaurateurEditForm;
