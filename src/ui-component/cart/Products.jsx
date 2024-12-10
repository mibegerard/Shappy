import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, IconButton, Grid } from '@mui/material';
import ProductCartCard from '../Cards/ProductCartCard';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'context/AuthContext';
import axiosInstance from 'api/axiosInstance';

const Products = () => {
    const { auth } = useAuth(); 
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getUserId = () => auth.user?._id || auth.user?.id;

    // Fetch cart details based on the logged-in restaurateur
    const fetchCart = async () => {
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
    
    useEffect(() => {
        fetchCart();
    }, [auth.isAuthenticated, auth.user]);

    // Handle quantity change (called from child component)
    const handleQuantityChange = async (productId, newQuantity) => {
        const userId = getUserId();
        if (!userId) {
            console.error("User ID is missing. Cannot fetch cart.");
            return;
        }
        if (newQuantity < 1) {
            console.warn(`Invalid quantity: ${newQuantity}. Quantity must be at least 1.`);
            return;
        }

        const url = `/cart/${userId}/product`;
        const data = { productId, quantity: newQuantity };
        try {
            await axiosInstance.put(url, data);
            // Re-fetch cart after quantity update
            fetchCart();
        } catch (err) {
            console.error(`Error updating quantity for product ID: ${productId}.`, err);
        }
    };

    const handleDelete = async (productId) => {
        const userId = getUserId();
        if (!userId) {
            console.error("User ID is missing. Cannot fetch cart.");
            return;
        }
        try {
            console.log(`Sending delete request for product ID: ${productId}`);
            await axiosInstance.delete(`/cart/${userId}/product/${productId}`);
            console.log(`Product ID: ${productId} successfully removed from the cart`);
            
            // Re-fetch cart after deletion to ensure the UI is updated
            fetchCart();
        } catch (err) {
            console.error(`Error deleting product ID: ${productId}`, err);
            alert("An error occurred while removing the product from your cart. Please try again.");
        }
    };
    

    // Function to handle clearing the cart
    const handleClearCart = async () => {
        const userId = getUserId();
            if (!userId) {
                console.error("User ID is missing. Cannot fetch cart.");
                return;
            }
        try {
            // Optional: Add a confirmation prompt
            const confirmClear = window.confirm("Are you sure you want to clear all items from your cart?");
            if (!confirmClear) {
                console.log("Clear cart action canceled by the user");
                return;
            }

            console.log(`Attempting to clear cart for user ID: ${userId}`);
            
            // Send request to clear the cart
            const response = await axiosInstance.delete(`/cart/${userId}`);
            
            console.log("Cart cleared successfully:", response.data);
            
            // Update state to reflect the cleared cart
            setCart([]); 
            
            // Optional: Provide user feedback
            alert("Your cart has been cleared successfully.");
        } catch (error) {
            console.error(`Error clearing cart for user ID: ${userId}`, error);
            
            // Optional: Notify user about the error
            alert("An error occurred while trying to clear the cart. Please try again.");
        }
    };

    if (loading) return <Typography>Loading cart...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Container maxWidth="lg">
            <Typography
                variant="body1"
                sx={{
                    cursor: 'pointer',
                    color: 'primary.main',
                    textDecoration: 'underline',
                    margin: '30px 0',
                }}
                onClick={() => navigate('/mon-marche')}
            >
                Retour à la boutique
            </Typography>

            <Box display="flex" flexDirection="column">
                {/* Display products in cart */}
                <Grid container spacing={2}>
                    {cart.length > 0 ? (
                        cart.map((item) => (
                            <Grid item xs={12} md={12} lg={6} key={item._id}>
                                <ProductCartCard
                                    item={item}
                                    onDelete={handleDelete}
                                    onQuantityChange={handleQuantityChange}
                                    sx={{ margin: '1rem 0', padding: '2rem 0' }}
                                />
                            </Grid>
                        ))
                    ) : (
                        <Typography variant="h6">Votre panier est vide.</Typography>
                    )}
                </Grid>
            </Box>
            {cart.length > 0 && (
                <Box sx={{ marginTop: '20px' }}>
                    <Typography variant="h6">Total: {cart.reduce((total, item) => total + item.product.price * item.quantity, 0)} €</Typography>
                    <Box sx={{ display: 'flex', gap: '0px', alignItems: 'center', margin: '20px 0' }}>
                        <IconButton onClick={handleClearCart} color="error">
                            <DeleteIcon />
                        </IconButton>
                        <Typography variant="body1" sx={{ marginLeft: '2px' }}>
                            Je vide mon panier
                        </Typography>
                        <Box sx={{ flexGrow: 1, borderBottom: '1px solid #000', marginLeft: '10px' }} />
                    </Box>
                </Box>
            )}
        </Container>
    );
};

export default Products;
