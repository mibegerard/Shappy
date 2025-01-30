import React, { useEffect } from 'react';
import Restaurateur from 'ui-component/home/Header';
import Description from 'ui-component/home/Icones';
import Mission from 'ui-component/home/Mission';
import Produits from 'ui-component/home/Produits';
import ProducteurDescription from 'ui-component/home/ProducteurDescription';
import Producteur from 'ui-component/home/Producteur';
import Abonnement from 'ui-component/home/Abonnements';
import Comments from 'ui-component/home/Comments';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from 'context/AuthContext';
import axiosInstance from 'api/axiosInstance';
import { toast } from 'react-toastify';

const Home = () => {

  const { loginWithToken } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
      loginWithToken(token).then(() => {
        toast.success('Login successful! Redirecting...');
        navigate('/'); // Redirect to home or another route as needed
      }).catch((error) => {
        console.error('Error during login with token:', error);
        toast.error('Login failed. Please try again.');
      });
    }
  }, [location]);

  return (
    <>
      <Restaurateur />
      <Description />
      <Mission />
      <Produits />
      <ProducteurDescription />
      <Producteur />
      <Abonnement />
      <Comments />
    </>
  );
};

export default Home;
