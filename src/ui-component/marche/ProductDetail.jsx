import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Grid, Container, CircularProgress, Alert, IconButton, Divider, Button, useTheme, useMediaQuery, Snackbar } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star';
import axiosInstance from 'api/axiosInstance';
import ProductCard from 'ui-component/Cards/ProductCard';
import { Skeleton } from '@mui/material';


const ProductDetail = () => {
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
    const [relatedLoading, setRelatedLoading] = useState(true); // New state for related products loading
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axiosInstance.get(`/product/${productId}`);
                setProduct(response.data.data);
                
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

        fetchProductDetails();
    }, [productId]);

    // Handle Snackbar close
    const handleSnackbarClose = () => setSnackbarOpen(false);

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

    const handleQuantityIncrease = () => {
        if (quantity < product.quantity) {
            setQuantity(prevQuantity => prevQuantity + 1);
        }
    };

    const handleQuantityDecrease = () => {
        if (quantity > 0) setQuantity(prevQuantity => prevQuantity - 1);
    };

    const handleAddToCart = () => {
        if (quantity > 0 && quantity <= product.quantity) {
            console.log(`Added ${quantity} of ${product.name} to the cart.`);
            setQuantity(0);
            setSnackbarOpen(true);
        } else if (quantity > product.quantity) {
            alert('You cannot add more items than available in stock.');
        } else {
            alert('Please select a quantity greater than 0.');
        }
    };

    const totalPrice = quantity * product.price;

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
                                    <strong>Commune:</strong> {product.producteur.commune}
                                </Typography>
                                <Typography variant="body1" gutterBottom sx={{ color: vertFonce }}>
                                    <strong>Code Postal:</strong> {product.producteur.postalCode}
                                </Typography>
                            </Box>
                        )}
                    </Grid>
                </Grid>


                {/* Quantity Selection, Add to Cart, and Total Price */}
                <Grid container alignItems="center" spacing={2}>
                    {/* Add to Cart Button */}
                    <Grid item>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: '#385909' }}
                            onClick={handleAddToCart}
                        >
                            <strong>Valider mon marché</strong>
                            
                        </Button>
                    </Grid>
                    
                    {/* Quantity Selection */}
                    <Grid item>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            border: '1px solid #385909',
                            borderRadius: '8px',
                            padding: 1,
                        }}>
                            <IconButton onClick={handleQuantityDecrease} disabled={quantity === 0}>
                                <RemoveIcon />
                            </IconButton>
                            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                            <Typography sx={{ mx: 2, color: vertFonce }}>{quantity}</Typography>
                            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                            <IconButton onClick={handleQuantityIncrease} disabled={quantity >= product.quantity} aria-label="Increase quantity">
                                <AddIcon />
                            </IconButton>

                        </Box>
                    </Grid>

                    {/* Total Price */}
                    {quantity > 0 && (
                        <Grid item>
                            <Typography variant="h5" sx={{ color: vertFonce }}>
                                Total: {totalPrice.toFixed(2)} € {/* Display total price */}
                            </Typography>
                        </Grid>
                    )}

                </Grid>
                <Grid>
                    <Snackbar 
                        open={snackbarOpen} 
                        onClose={handleSnackbarClose} 
                        message="Produit ajouté au panier!" 
                        autoHideDuration={3000}
                        sx={{ marginTop: '5rem' }} // Add margin here
                    />

                    <Divider sx={{ marginTop: '2rem' }} />

                    <Typography variant="h1" sx={{ color: vertFonce, marginY: '3rem', letterSpacing: '1px' }}>
                        Continuer Mes Achats
                    </Typography>

                    <Grid container spacing={4}>
                        {relatedLoading ? (
                            // Display skeletons while loading
                            [...Array(3)].map((_, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Skeleton variant="rectangular" width="100%" height={250} />
                                    <Skeleton width="80%" />
                                    <Skeleton width="60%" />
                                </Grid>
                            ))
                        ) : (
                            relatedProducts.map((item) => (
                                <Grid item xs={12} sm={6} md={4} key={item._id}>
                                    <ProductCard
                                        item={{
                                            name: item.name,
                                            localText: 'Local',
                                            price: `${item.price} € / ${item.unit}`,
                                            stock: item.quantity,
                                            unit: item.unit,
                                            producteur: item.producteur ? `${item.producteur.lastName}` : 'Inconnu',
                                            src: item.image,
                                            alt: `relatedProduct${item._id}`
                                        }}
                                    />
                                </Grid>
                            ))
                        )}
                    </Grid>
                    <Box sx={{ marginBottom: '5rem'}}> </Box>
                </Grid>
            </Container>
        </>
    );
};

export default ProductDetail;