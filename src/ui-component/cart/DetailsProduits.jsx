import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, Typography, Button, CircularProgress, Alert } from '@mui/material';
import CartDetailCard from 'ui-component/Cards/CartDetailCard'; 
import axiosInstance from 'api/axiosInstance'; 
import { useAuth } from 'context/AuthContext'; 

const DetailsProduits = () => {
    const { auth } = useAuth(); 
    const [cartProducts, setCartProducts] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);
    const deliveryFee = 5.00; 

    // Fetch the cart data for the logged-in restaurateur
    const fetchCart = async () => {
        console.log('Fetching cart for user:', auth.user?._id); // Log user ID for debugging
        if (auth.isAuthenticated && auth.user?.role === 'restaurateur') {
            try {
                console.log('Making API request to fetch cart data');
                const response = await axiosInstance.get(`/cart/${auth.user._id}`);
                console.log('Fetched cart data:', response.data); // Log the entire response to inspect it
                const fetchedCart = response.data.products || [];
                console.log('Fetched products:', fetchedCart); // Log the products in the cart
                setCartProducts(fetchedCart);
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch cart details:', err);
                setError('Failed to fetch cart details');
                setLoading(false);
            }
        } else {
            console.warn('User not authenticated or not a restaurateur.');
        }
    };

    // Calculate the total price for a single product
    const calculateProductTotal = (product) => {
        // Calculate total price by multiplying the quantity with the product price (nested in product object)
        const total = product.quantity * product.product.price; 
        console.log(`Calculating total for product ${product.product._id}: ${product.product.price} * ${product.quantity} = ${total}`);
        return total;
    };

    // Calculate the total price of all products in the cart
    const calculateTotalPrice = () => {
        console.log('Calculating total price for all products in cart');
        const total = cartProducts.reduce((total, product) => {
            console.log(`Adding product ${product.product._id} price to total`);
            return total + calculateProductTotal(product);
        }, 0).toFixed(2);
        console.log('Total price of all products:', total); // Log total price of all products
        return total;
    };

    // Calculate the grand total (including delivery fee)
    const calculateGrandTotal = () => {
        console.log('Calculating grand total');
        const grandTotal = (parseFloat(calculateTotalPrice()) + deliveryFee).toFixed(2);
        console.log('Grand total (including delivery fee):', grandTotal); // Log grand total
        return grandTotal;
    };

    // Handle removing a product from the cart
    const handleRemoveProduct = async (productId) => {
        console.log(`Removing product with ID: ${productId}`); // Log the product being removed
        try {
            console.log(`Making API request to remove product with ID: ${productId}`);
            await axiosInstance.delete(`/cart/${auth.user._id}/product/${productId}`);
            console.log(`Successfully removed product with ID: ${productId}`);
            setCartProducts((prev) => prev.filter((product) => product.product._id !== productId));
        } catch (err) {
            console.error('Failed to remove product:', err);
        }
    };

    // Proceed to payment
    const handleProceedToPayment = () => {
        console.log('Proceeding to payment');
    };

    // Fetch the cart when the component is mounted or user authentication changes
    useEffect(() => {
        console.log('Auth state changed. Is authenticated:', auth.isAuthenticated);
        console.log('User data:', auth.user); // Log user data for further inspection
        fetchCart();
    }, [auth.isAuthenticated, auth.user]);

    if (loading) {
        console.log('Loading cart data...');
        return <Typography>Loading...</Typography>;
    }
    if (error) {
        console.error('Error occurred while loading cart:', error);
        return <Typography>Error: {error}</Typography>;
    }

    console.log('Rendering cart details');

    return (
        <Container maxWidth="lg" sx={{ justifyContent: 'center', padding: '20px 0' }}>
            <Box sx={{ backgroundColor: '#fff', padding: 3, borderRadius: 2, boxShadow: 3, width: '100%' }}>
                <Typography variant="h6" sx={{ margin: '40px 0', textAlign: 'center' }}>
                    Récapitulatif de votre commande
                </Typography>
                <Grid container spacing={2} alignItems="center" sx={{ margin: '2O0px 0', borderBottom: 1, borderColor: 'grey.300', paddingBottom: 1 }}>
                    <Grid item xs={3}><Typography fontWeight="bold" align="center">Nom du produit</Typography></Grid>
                    <Grid item xs={3}><Typography fontWeight="bold" align="center">Quantité</Typography></Grid>
                    <Grid item xs={3}><Typography fontWeight="bold" align="center">Prix total</Typography></Grid>
                    <Grid item xs={3} container justifyContent="center">
                        <Typography fontWeight="bold" align="center">Actions</Typography>
                    </Grid>
                </Grid>

                {cartProducts.map((product) => (
                    <CartDetailCard
                        key={product.product._id}
                        product={product} 
                        onRemove={() => handleRemoveProduct(product.product._id)}
                        onProceed={handleProceedToPayment}
                    />
                ))}

                {/* Delivery Fee and Total Price */}
                <Box sx={{ marginTop: 3, borderTop: 1, borderColor: 'grey.300', paddingTop: 2 }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={6}>
                            <Typography fontWeight="bold">Livraison</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography align="right">{deliveryFee.toFixed(2)}€</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography fontWeight="bold">Total des Produits</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography align="right">{calculateTotalPrice()}€</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" fontWeight="bold">Montant Total</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" align="right" fontWeight="bold">{calculateGrandTotal()}€</Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Box sx={{ marginTop: 3 }}>
                <Button variant="outlined" sx={{ marginRight: 2, backgroundColor: '#fff', color: 'black', borderColor: '#ccc' }}>
                    Total: {calculateGrandTotal()}€
                </Button>
                <Button variant="contained" color="primary" onClick={handleProceedToPayment}>
                    Valider mon panier
                </Button>
            </Box>
        </Container>
    );
};

export default DetailsProduits;
