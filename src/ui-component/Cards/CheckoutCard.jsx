import React, { useState } from 'react';
import { Box, Typography, Grid, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import 'flag-icons/css/flag-icons.min.css';

const CheckoutCard = ({ item, onDelete, onQuantityChange, sx }) => {
    const theme = useTheme();
    const vertFonce = '#385909'; 
    const beigeClair = theme.palette.beige?.clair;

    // Log item fields for debugging
    console.log('CheckoutCard item:', item);
    // Log item fields for debugging
    console.log('Product details:');
    console.log('Name:', item.product.name);
    console.log('Price:', item.product.price);
    console.log('Unit:', item.product.unit);
    console.log('In Stock:', item.product.quantity);
    

    // State for quantity (initial value should come from cart data)
    const [quantity, setQuantity] = useState(item.quantity || 1); // Start with cart quantity

   // Handlers for quantity increase and decrease
    const handleQuantityIncrease = async () => {
        const newQuantity = Math.min(quantity + 1, item.product.quantity); // Max quantity is stock
        console.log(`Increasing quantity: Current=${quantity}, New=${newQuantity}`);
        if (newQuantity !== quantity) {
            setQuantity(newQuantity); // Update local state immediately
            try {
                await onQuantityChange(item.product._id, newQuantity); // Notify parent to update API
                console.log(`Quantity successfully updated to ${newQuantity} for product ID: ${item.product._id}`);
            } catch (error) {
                console.error(`Error updating quantity for product ID ${item.product._id}:`, error);
            }
        }
    };

    const handleQuantityDecrease = async () => {
        const newQuantity = Math.max(quantity - 1, 1); // Min quantity is 1
        console.log(`Decreasing quantity: Current=${quantity}, New=${newQuantity}`);
        if (newQuantity !== quantity) {
            setQuantity(newQuantity); // Update local state immediately
            try {
                await onQuantityChange(item.product._id, newQuantity); // Notify parent to update API
                console.log(`Quantity successfully updated to ${newQuantity} for product ID: ${item.product._id}`);
            } catch (error) {
                console.error(`Error updating quantity for product ID ${item.product._id}:`, error);
            }
        }
    };
    

    // Handle delete product
    const handleDelete = async () => {
        if (!onDelete) {
            console.warn("Delete handler is not defined");
            return;
        }
    
        // Optional confirmation prompt
        const confirmDelete = window.confirm(
            `Êtes-vous sûr de vouloir retirer ${item.product.name || "ce produit"} du panier ?`
        );
    
        if (!confirmDelete) {
            console.log("Delete action canceled by the user");
            return;
        }
    
        try {
            console.log(`Attempting to delete product ID: ${item.product._id} from the cart`);
            
            // Optional: Disable delete button or show a loading spinner here
            await onDelete(item.product._id); // Invoke the passed delete handler
            console.log(`Successfully deleted product ID: ${item.product._id}`);
        } catch (error) {
            console.error(`Error deleting product ID ${item.product._id}`, error);
            alert("An error occurred while deleting the product. Please try again.");
        }
    };
    

    return (
        <Box
            sx={{
                backgroundColor: 'transparent',
                display: 'flex',
                flexDirection: 'row',
                ...sx 
            }}
        >
            {/* Image Box */}
            <Box
                component="img"
                src={item.product.image}
                alt={item.product.name}
                sx={{
                    width: '150px', // Increased width for the image
                    height: '150px',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'scale(1.05)',
                        borderRadius: '0.5rem'
                    },
                    borderRadius: '0.5rem',
                    objectFit: 'cover',
                    marginRight: '1rem' // Space between image and text
                }}
            />

            {/* Product Data */}
            <Box sx={{ flex: 1, marginLeft: '1rem' }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '0.5rem'
                    }}
                >
                    <Typography
                        variant="body1"
                        sx={{ 
                            color: beigeClair,
                            backgroundColor: vertFonce,
                            padding: '0px 8px',
                            borderRadius: '0.5rem'
                        }}
                    >
                        Local 
                    </Typography>
                    <Box
                        component="a"
                        href="https://www.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ ml: 2 }}
                        className="fi fi-fr"
                    />
                    <Typography
                        variant="body1"
                        sx={{ 
                            color: vertFonce,
                            marginLeft: "0.5rem",
                        }}
                    >
                        France
                    </Typography>
                </Box>

                <Typography
                    variant="h6"
                    sx={{ color: vertFonce, fontWeight: 'bold', padding: '5px 0' }}
                >
                    {item.product.name}
                </Typography>

                <Grid container spacing={1}>
                    <Grid item xs={12} container direction="column" alignItems="flex-start">
                        <Typography
                            variant="body1"
                            sx={{ color: vertFonce, padding: '5px 0' }}
                        >
                          Prix unitaire: {item.product.price} €
                        </Typography>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item xs={12}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        height: '100%',
                                        width: '100%',
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                        sx={{ color: vertFonce, padding: '5px 0' }}
                                    >
                                        Quantité: {quantity} {item.product.unit}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                        <Typography
                            variant="body1"
                            sx={{ color: vertFonce, padding: '5px 0' }}
                        >
                            Total: {(item.product.price * quantity).toFixed(2)} €
                        </Typography>
                </Grid>
            </Box>
        </Box>
    );
};

CheckoutCard.propTypes = {
    item: PropTypes.object.isRequired,
    sx: PropTypes.object,
};

export default CheckoutCard;
