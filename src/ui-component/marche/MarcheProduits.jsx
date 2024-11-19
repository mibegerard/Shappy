import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Container, useMediaQuery, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'context/AuthContext';
import { toast } from 'react-toastify';
import ProductCard from 'ui-component/Cards/ProductCard';
import aubergine from 'assets/images/Fichier 15@2x 1.png';
import axiosInstance from 'api/axiosInstance';

const MarcheProduits = () => {
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
                const response = await axiosInstance.get(`/products`);
                setProducts(response.data.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleProductClick = (product) => {
        // Check if the user is authenticated and has the 'restaurateur' role
        if (!auth.user || auth.user.role !== 'restaurateur') {
            toast.warn('Vous devez être un restaurateur vérifié pour accéder aux détails du produit.');
            return; // Prevent navigation if the user is not a restaurateur
        }
    
        // Proceed to the product details page if the user is a restaurateur
        navigate(`/product/${product._id}`);
    };
    
    const handleAddToCart = async (product) => {
        console.log("Attempting to add product to cart:", product);
    
        // Log the auth object to understand its structure
        console.log("Auth object:", auth);
    
        // Verify user authentication and role
        if (!auth.user || auth.user.role !== 'restaurateur') {
            console.warn("User is not authenticated as a restaurateur.");
            toast.warn('Vous devez être un restaurateur vérifié pour ajouter des produits au panier.');
            return;
        }
    
        // Extract restaurateur ID
        const restaurateurId = auth.user.id || auth.user._id;
        console.log("User authenticated as restaurateur:", auth.user);
        console.log("Restaurateur ID:", restaurateurId);
        console.log("Product ID:", product._id);
    
        try {
            // Fetch product details to check available stock
            console.log(`Fetching product details for product ID: ${product._id}`);
            const productDetailsResponse = await axiosInstance.get(`/product/${product._id}`);
            const productDetails = productDetailsResponse.data.data;
    
            console.log("Fetched product details:", productDetails);
            console.log("Fetched product quantity:", productDetails.quantity);
    
            // Check if the product is out of stock
            if (productDetails.quantity <= 0) {
                toast.warn("Le produit est en rupture de stock.");
                return;
            }
    
            // Fetch current quantity in the cart for this product
            console.log(`Fetching current quantity of product ${product._id} in cart for restaurateur: ${restaurateurId}`);
    
            let currentCartQuantity = 0; // Default value
            try {
                const cartProductResponse = await axiosInstance.get(`/cart/${restaurateurId}/product/${product._id}`);
                // If product is found in cart, get its quantity
                currentCartQuantity = cartProductResponse?.data?.quantity || 0;
                console.log("Current quantity in cart:", currentCartQuantity);
            } catch (cartError) {
                // If the product is not found in the cart, we assume the quantity is 0
                console.log("Product not found in cart, assuming quantity is 0.");
            }
    
            // Calculate the total quantity of the product to be added (current + new quantity)
            const totalQuantityInCart = currentCartQuantity + 1; // Assuming you want to add 1 unit at a time
    
            // Ensure the total quantity doesn't exceed available stock
            if (totalQuantityInCart > productDetails.quantity) {
                toast.warn(`Vous ne pouvez pas ajouter plus que ${productDetails.quantity} unités en stock.`);
                return;
            }
    
            // Add product to cart via POST request
            console.log(`POST request to /cart/${restaurateurId}/product`);
            const response = await axiosInstance.post(`/cart/${restaurateurId}/product`, {
                productId: product._id,
                quantity: 1, // Adjust this value based on your requirements
            });
    
            // Log the response from the POST request
            console.log("Response from adding product to cart:", response.data);
    
            // Update cart state and show success toast
            setCart(response.data.cart);
            toast.success('Produit ajouté au panier avec succès!');
        } catch (error) {
            // Handle errors and show error toast
            console.error("Erreur lors de l'ajout du produit au panier:", error);
            toast.error("Échec de l'ajout du produit au panier.");
        }
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
                            onAddToCart={() => handleAddToCart(item)}
                            onProductClick={() => handleProductClick(item)}
                        />
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ marginBottom: '5rem'}}> </Box>
        </Container>
    );
};

export default MarcheProduits;