import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
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
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import axiosInstance from 'api/axiosInstance';
import { useMediaQuery } from '@mui/system';
import CheckoutCard from '../Cards/CheckoutCard';

const Paiement = () => {
    const { auth } = useAuth(); 
    const theme = useTheme();
    const navigate = useNavigate();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); 
    const [cartProducts, setCartProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const getUserId = React.useCallback(() => auth.user?._id || auth.user?.id, [auth.user]);
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
    console.log("Stripe Public Key:", import.meta.env.VITE_STRIPE_PUBLIC_KEY);

    useEffect(() => {
        const fetchCartProducts = async () => {
            if (auth.isAuthenticated && auth.user?.role === 'restaurateur') {
                const userId = getUserId();
                if (!userId) {
                    console.error("User ID is missing. Cannot fetch cart.");
                    return;
                }
                try {
                    const response = await axiosInstance.get(`/cart/${userId}`);
                    const fetchedCart = response.data.products || [];
                    
                    // Log the fetched cart data for debugging
                    console.log("Fetched cart data:", fetchedCart);
        
                    // Log each product's details for a deeper inspection
                    fetchedCart.forEach((item, index) => {
                        console.log(`Product #${index + 1}:`, item);
                        if (item.product) {
                            console.log("Product details from the parent component:", item.product);
                        } else {
                            console.warn(`Missing 'product' field in item at index ${index}. Full item:`, item);
                        }
                    });
        
                    setCart(fetchedCart);
                    setLoading(false);
                } catch (err) {
                    console.error("Failed to fetch cart details:", err);
                    setLoading(false);
                }
            }
        };

        fetchCartProducts();
    }, [auth.isAuthenticated, auth.user?.role, getUserId]);

    const handleStripeCheckout = async () => {
        try {
            // Préparer les données des produits pour Stripe
            const items = cart.map((item) => ({
                _id: item.product?._id,
                quantity: item.quantity,
                totalPrice: item.product?.price * item.quantity, // Ensure totalPrice is calculated correctly
            }));
    
            // Inclure l'email de l'utilisateur authentifié
            const userEmail = auth.user?.email;

            console.log("User email for Stripe Checkout:", userEmail);
            console.log("Items for Stripe Checkout:", items);

            // Envoyer une requête pour créer une session Stripe Checkout
            const response = await axiosInstance.post('/cart/stripe/checkout-session', { items, email: userEmail });
    
            if (response.data.sessionId) {
                const stripe = await stripePromise;
    
                // Rediriger l'utilisateur vers Stripe Checkout via Stripe.js
                const { error } = await stripe.redirectToCheckout({
                    sessionId: response.data.sessionId,
                });
    
                if (error) {
                    console.error('Stripe Checkout redirection error:', error);
                    toast.error("Une erreur est survenue lors de la redirection vers Stripe.");
                }
            } else {
                toast.error("Échec de la création de la session de paiement.");
            }
        } catch (error) {
            console.error("Erreur lors de la création de la session Stripe:", error);
            toast.error("Une erreur est survenue lors de la création de la session de paiement.");
        }
    };

    // Log the auth user
    useEffect(() => {
        console.log("Authenticated user from checkout is:", auth.user);
    }, [auth.user]);

    return (
        <Container>
            <Grid container spacing={2}>
                {/* Formulaire à gauche */}
                <Grid item xs={12} md={8} sx={{ marginTop: 10, marginBottom: 5, paddingRight: 10 }}>
                    <Typography variant="h2" gutterBottom sx={{ letterSpacing: '1px' }} marginBottom={5}>
                        Qui Passe la Commande ?
                    </Typography>
                    <form>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} marginBottom={5}>
                                <TextField
                                    fullWidth
                                    label="Nom"
                                    variant="outlined"
                                    defaultValue={auth.user?.lastName || ''}
                                    sx={{
                                        '& .MuiOutlinedInput-input': {
                                            backgroundColor: '#FFF4E2'
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} marginBottom={5}>
                                <TextField
                                    fullWidth
                                    label="Prénom"
                                    variant="outlined"
                                    defaultValue={auth.user?.firstName || ''}
                                    sx={{
                                        '& .MuiOutlinedInput-input': {
                                            backgroundColor: '#FFF4E2'
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} marginBottom={5}>
                                <TextField
                                    fullWidth
                                    label="Addresse email"
                                    variant="outlined"
                                    defaultValue={auth.user?.email || ''}
                                    sx={{
                                        '& .MuiOutlinedInput-input': {
                                            backgroundColor: '#FFF4E2'
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} marginBottom={5}>
                                <TextField
                                    fullWidth
                                    label="Numéro de téléphone"
                                    variant="outlined"
                                    defaultValue={auth.user?.phoneNumber || ''}
                                    sx={{
                                        '& .MuiOutlinedInput-input': {
                                            backgroundColor: '#FFF4E2'
                                        }
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </form>
                    <Box sx={{ borderBottom: '1px solid #FC8A1A', marginTop: 2 }} />
                    <Typography variant="h2" gutterBottom sx={{ letterSpacing: '1px' }} marginBottom={5} marginTop={5}>
                        Adresse de livraison
                    </Typography>
                    <form>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} marginBottom={5}>
                                <TextField
                                    fullWidth
                                    label="Nom du restaurant"
                                    variant="outlined"
                                    defaultValue={auth.user?.restaurantName || ''}
                                    sx={{
                                        '& .MuiOutlinedInput-input': {
                                            backgroundColor: '#FFF4E2'
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} marginBottom={5}>
                                <TextField
                                    fullWidth
                                    label="Adresse du restaurant"
                                    variant="outlined"
                                    defaultValue={auth.user?.restaurantAddress || ''}
                                    sx={{
                                        '& .MuiOutlinedInput-input': {
                                            backgroundColor: '#FFF4E2'
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} marginBottom={5}>
                                <TextField
                                    fullWidth
                                    label="Ville du restaurant"
                                    variant="outlined"
                                    defaultValue={auth.user?.city || ''}
                                    sx={{
                                        '& .MuiOutlinedInput-input': {
                                            backgroundColor: '#FFF4E2'
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} marginBottom={5}>
                                <TextField
                                    fullWidth
                                    label="Code postal"
                                    variant="outlined"
                                    defaultValue={auth.user?.postalCode || ''}
                                    sx={{
                                        '& .MuiOutlinedInput-input': {
                                            backgroundColor: '#FFF4E2'
                                        }
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </form>
                    <Box sx={{ borderBottom: '1px solid #FC8A1A', marginTop: 2 }} />
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleStripeCheckout}
                            sx={{ marginTop: 2 }}
                        >
                            Procéder au paiement 
                        </Button>
                    </div>
                </Grid>

                {/* Produits du panier à droite */}
                <Grid item xs={12} md={4}  sx={{ marginTop: 10, marginBottom: 5, paddingLeft: 10 }}>
                    <Typography variant="h2" gutterBottom sx={{ letterSpacing: '1px' }} marginBottom={5}>
                        Résumé du marché
                    </Typography>
                    <Box display="flex" flexDirection="column">
                        {/* Display products in cart */}
                        <Grid container spacing={2}>
                            {cart.length > 0 ? (
                                cart.map((item) => (
                                    <Grid item xs={12} key={item._id}>
                                        <CheckoutCard
                                            item={item}
                                            sx={{ }}
                                        />
                                    </Grid>
                                ))
                            ) : (
                                <Typography variant="h6">Votre panier est vide.</Typography>
                            )}
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Paiement;