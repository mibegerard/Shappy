import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Container, useMediaQuery, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'context/AuthContext';
import { toast } from 'react-toastify';
import ProductCard from 'ui-component/Cards/ProductCard';
import aubergine from 'assets/images/Fichier 15@2x 1.png';
import axiosInstance from 'api/axiosInstance';

const CommandesRestaurateur = () => {
    const { auth } = useAuth()
    const theme = useTheme();
    const isMediumOrSmaller = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();
    

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null); // Track selected product for preview modal

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosInstance.get(`/products/user/:userId`);
                setProducts(response.data.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleProductClick = (product) => {
        // Check if the user is authenticated and has the 'producteur' role
        if (!auth.user || auth.user.role !== 'producteur') {
            toast.warn('Vous devez être un producteur vérifié pour accéder aux détails du produit.');
            return; // Prevent navigation if the user is not a producteur
        }
    
        // Proceed to the product details page if the user is a producteur
        navigate(`/product/${product._id}`);
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
                        <ProductCard 
                            item={{
                                name: item.name,
                                localText: 'Local',
                                price: `${item.price} € / ${item.unit}`,
                                stock: item.quantity,
                                unit: item.unit,
                                producteur: item.producteur ? `${item.producteur.firstName}` : 'Inconnu',
                                src: item.image,
                                alt: `product-${item._id}`
                            }}
                            onProductClick={() => handleProductClick(item)}
                        />
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ marginBottom: '5rem'}}> </Box>
        </Container>
    );
};

export default CommandesRestaurateur;