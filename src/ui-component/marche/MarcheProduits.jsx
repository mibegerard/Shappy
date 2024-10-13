import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Container, useMediaQuery, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import ProductCard from 'ui-component/Cards/ProductCard';
import aubergine from 'assets/images/Fichier 15@2x 1.png';
import axiosInstance from 'api/axiosInstance';

const MarcheProduits = () => {
    const theme = useTheme();
    const isMediumOrSmaller = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();
    

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null); // Track selected product for preview modal

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosInstance.get(`/products`);
                setProducts(response.data.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    // Navigate to product details page
    const handleProductClick = (product) => {
        navigate(`/product/${product._id}`);
    };

    // Add product to cart
    const handleAddToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
        console.log('Added to cart:', product);
    };

    // Close modal
    const handleClose = () => {
        setSelectedProduct(null);
    };

    if (!products || products.length === 0) {
        return <Typography variant="h6" align="center">No products available</Typography>;
    }

    return (
        <Container maxWidth="lg">
            <Box 
                sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    gap: '1rem', 
                    marginBottom: '5rem',
                    marginTop: '5rem' 
                }}
            >
                <Button variant="contained" color="primary" onClick={() => console.log('Filter Fruits')}>Fruits</Button>
                <Button variant="contained" color="primary" onClick={() => console.log('Filter Légumes')}>Légumes</Button>
            </Box>

            <Box 
                sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '1rem',
                    marginBottom: '2rem'
                }}
            >
                <Typography
                    variant="h1"
                    align="left"
                    gutterBottom
                    sx={{ marginTop: '2rem', marginBottom: '2rem' }}
                >
                    Nos produits
                </Typography>
                <img 
                    src={aubergine} 
                    alt="Carottes" 
                    style={{ width: 'auto', height: '100px' }}
                />
            </Box>
            
            <Grid container spacing={4}>
                {products.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                        <Box onClick={() => handleProductClick(item)} sx={{ cursor: 'pointer' }}>
                            <ProductCard 
                                item={{
                                    name: item.name,
                                    localText: 'Local',
                                    price: `${item.price} € / ${item.unit}`,
                                    stock: item.quantity,
                                    unit: item.unit,
                                    producteur: item.producteur ? `${item.producteur.lastName}` : 'Inconnu',
                                    src: item.image,
                                    alt: `product${index + 1}`
                                }} 
                            />
                        </Box>
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ marginBottom: '5rem'}}> </Box>
        </Container>
    );
};

export default MarcheProduits;
