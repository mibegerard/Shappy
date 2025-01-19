import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Grid, Container, CircularProgress, Alert, IconButton, Divider, Button, useTheme, useMediaQuery, Snackbar } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star';
import axiosInstance from 'api/axiosInstance';
import { useAuth } from 'context/AuthContext';
import ProductCard from 'ui-component/Cards/ProductCard';
import { Skeleton } from '@mui/material';


const ProductDetail = () => {
    const { auth } = useAuth(); 
    const theme = useTheme();
    const vertFonce = theme.palette.vert?.fonce;
    const beigeClair = theme.palette.beige?.clair;
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [relatedLoading, setRelatedLoading] = useState(true); 
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const fetchProductDetails = async () => {
        try {
            setLoading(true);
            setError(null); // Clear previous errors
            const response = await axiosInstance.get(`/product/${productId}`);
            setProduct(response.data.data);
            console.log('Product:', response.data.data);
    
            // Fetch related products
            const relatedResponse = await axiosInstance.get(`/products?category=${response.data.data.category}`);
            setRelatedProducts(relatedResponse.data.data);
        } catch (err) {
            setError('Error fetching product details. Please try again later.');
            console.error('Error fetching product details:', err);
        } finally {
            setLoading(false);
            setRelatedLoading(false); // Stop loading for related products
        }
    };
    
    useEffect(() => {
        fetchProductDetails();
    }, [productId, auth?.user?._id]);
    
    // Handle Snackbar close
    const handleSnackbarClose = () => setSnackbarOpen(false);

    const handleDeleteProduct = async () => {
        try {
            console.log('Deleting product:', productId);
            await axiosInstance.delete(`/product/${productId}`);
            alert('Produit supprimé avec succès');
            // Rediriger vers une autre page après la suppression
            window.location.href = '/account';
        } catch (error) {
            console.error('Erreur lors de la suppression du produit:', error);
            alert('Erreur lors de la suppression du produit');
        }
    };
    
    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center">
                <CircularProgress />
                <Typography sx={{ marginLeft: '1rem' }}>Loading product details...</Typography>
            </Box>
        );
    }
    
    if (error) {
        return (
            <Alert severity="error" action={<Button onClick={fetchProductDetails}>Retry</Button>}>
                {error}
            </Alert>
        );
    }

    return (
        <>
            <Box sx={{ marginTop: '5rem'}}> </Box>

            {/* Full-Width Product Image with Blurred Background */}
            <Box sx={{ position: 'relative', width: '100%', height: '500px', marginBottom: '2rem' }}>
                {/* Blurred Background Image */}
                <Box
                    component="img"
                    src={product.image}
                    alt={product.name}
                    loading="lazy"  // Add lazy loading
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: 'blur(8px)',
                        zIndex: 1,
                        opacity: 0.6,
                    }}
                />

                {/* Product Image */}
                <Box
                    component="img"
                    src={product.image}
                    alt={product.name}
                    loading="lazy"  // Add lazy loading
                    sx={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        zIndex: 2,
                        borderRadius: '8px',
                    }}
                />
            </Box>


            {/* Content Container */}
            <Container maxWidth="lg">
                {/* Local Text and Stars */}
                <Grid container justifyContent="space-between" alignItems="center" sx={{ marginBottom: '2rem' }}>
                    {/* Local Text */}
                    <Grid item>
                        <Typography
                            variant="body1"
                            sx={{
                                color: beigeClair,
                                backgroundColor: vertFonce,
                                padding: '7px 15px',
                                WebkitBorderRadius: '1.5rem',
                                fontSize: '20px'
                            }}
                        >
                            Local
                        </Typography>
                    </Grid>

                    {/* Gold Stars */}
                    <Grid item>
                        {[...Array(5)].map((_, index) => (
                            <StarIcon key={index} sx={{ color: vertFonce }} />
                        ))}
                    </Grid>

                </Grid>

                {/* Product Name, Stock, and Price */}
                <Grid container justifyContent="space-between" sx={{ marginBottom: '2rem' }}>
                    {/* Product Name and Stock */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="body1" sx={{ fontSize: isSmallScreen ? '2rem' : '3rem', color: vertFonce }}>
                            {product.name}
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'gray' }}>
                            En stock: {product.quantity}
                        </Typography>
                    </Grid>

                    {/* Product Price */}
                    <Grid>
                        <Typography
                            variant="body1"
                            sx={{
                                color: beigeClair,
                                backgroundColor: vertFonce,
                                padding: '0px 8px',
                                borderTopRightRadius: '0.5rem',
                                borderBottomLeftRadius: '0.5rem',
                                fontSize: '20px'
                            }}
                        >
                            {product.price} € / {product.unit}
                        </Typography>
                    </Grid>
                </Grid>

                {/* Producer Information and Product Description */}
                <Grid container spacing={4} justifyContent="space-between">
                    {/* Product Description */}
                    <Grid item xs={12} md={8}>
                        <Box sx={{ marginBottom: '0.5rem', marginTop: '0.5rem' }}>
                            <Typography variant="body1" sx={{ width: '100%', color: vertFonce }}>
                                {product.description}
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Producer Details */}
                    <Grid item xs={12} md={4} sx={{ textAlign: 'right' }}>
                        {product.producteur && (
                            <Box sx={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
                                <Typography variant="h3" gutterBottom sx={{ color: vertFonce }}>
                                    Détails du Producteur
                                </Typography>
                                <Typography variant="body1" gutterBottom sx={{ color: vertFonce }}>
                                    <strong>Nom:</strong> {product.producteur.firstName} {product.producteur.lastName}
                                </Typography>
                                <Typography variant="body1" gutterBottom sx={{ color: vertFonce }}>
                                    <strong>Commune:</strong> {product.producteur.city}
                                </Typography>
                                <Typography variant="body1" gutterBottom sx={{ color: vertFonce }}>
                                    <strong>Code Postal:</strong> {product.producteur.postalCode}
                                </Typography>
                            </Box>
                        )}
                    </Grid>
                </Grid>
                {/* Buttons */}
                <Grid container spacing={2} justifyContent="center" sx={{ marginTop: '3rem', marginBottom: '3rem' }}>
                    <Grid item>
                        <Button variant="contained" color="primary" href='/je-depose-mon-potager'>Ajouter un autre produit</Button>
                    </Grid>
                    <Grid item>
                    <Button variant="contained" color="error" onClick={handleDeleteProduct}>Supprimer ce produit</Button>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default ProductDetail;