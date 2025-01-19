import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Container, useMediaQuery, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'context/AuthContext';
import { toast } from 'react-toastify';
import ProductCard from 'ui-component/Cards/ProfileProductCard';
import axiosInstance from 'api/axiosInstance';
import Header from 'ui-component/account/Header';

const ProducteurAllProducts = () => {
    const { auth } = useAuth()
    const theme = useTheme();
    const navigate = useNavigate();
    

    const [products, setProducts] = useState([]);

    console.log('Products:');

    useEffect(() => {
        const fetchProducts = async () => {
            const userId = auth.user.id || auth.user._id;
            console.log('Fetching products...');
            console.log('User:', userId);
            try {
                const response = await axiosInstance.get(`/products/user/${userId}`);
                setProducts(response.data.data);
                console.log('Products:', response.data.data.slice(0, 4));
            } catch (error) {
                console.error('Error fetching products:', error);
                toast.error('Erreur lors de la récupération des produits.');
            }
        };

        if (auth.user) {
            fetchProducts();
        }
    }, [auth.user]);

    const handleProductClick = (product) => {
        // Check if the user is authenticated and has the 'producteur' role
        if (!auth.user || auth.user.role !== 'producteur') {
            toast.warn('Vous devez être un producteur vérifié pour accéder aux détails du produit.');
            return; // Prevent navigation if the user is not a producteur
        }
    
        // Proceed to the product details page if the user is a producteur
        navigate(`/profile-producteur/product/${product._id}`);
    };

    return (
        <>
            <Header />
            <Container maxWidth="lg">
                <Box 
                    sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '1rem',
                        marginTop: '2rem',
                        marginBottom: '2rem'
                    }}
                >
                    <Typography
                        variant="h1"
                        align="left"
                        gutterBottom
                        sx={{ marginTop: '2rem', marginBottom: '2rem', borderBottom: '2px solid #F5A623', wordSpacing: '0.5rem', letterSpacing: '1px' }}
                    >
                        Mes Produits Ajoutés
                    </Typography>
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
        </>
    );
};

export default ProducteurAllProducts;