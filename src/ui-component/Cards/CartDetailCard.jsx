import React from 'react';
import { Grid, Typography, IconButton } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const CartDetailCard = ({ product, onRemove, onProceed }) => {
    // Log product details for debugging
    console.log('CartDetailCard product details:', product);
    console.log('Products Name:', product.product.name);
    console.log('Product Quantity:', product.quantity);
    console.log('Product Unit Price:', product.price);
    console.log('Total Price:', (product.quantity * product.price).toFixed(2));
    
    // Log the onProceed and onRemove handlers to ensure they are triggered correctly
    const handleProceed = () => {
        console.log(`Proceeding with product: ${product.name} (ID: ${product.id})`);
        onProceed(product.id);  // Notify parent component to proceed with the product
    };

    const handleRemove = () => {
        console.log(`Removing product: ${product.name} (ID: ${product.id})`);
        onRemove(product.id);  // Notify parent component to remove the product
    };

    return (
        <Grid container spacing={2} alignItems="center" justifyContent="center" key={product.id}>
            {/* Product Name */}
            <Grid item xs={3} container justifyContent="center">
                <Typography align="center" sx={{ fontWeight: 'bold' }}>
                    {product.product.name}
                </Typography>
            </Grid>

            {/* Product Quantity */}
            <Grid item xs={3} container justifyContent="center">
                <Typography align="center" sx={{ fontWeight: 'bold' }}>
                    {product.quantity}
                </Typography>
            </Grid>

            {/* Product Total Price */}
            <Grid item xs={3} container justifyContent="center">
                <Typography align="center" sx={{ fontWeight: 'bold' }}>
                    {(product.quantity * product.price).toFixed(2)}€
                </Typography>
            </Grid>

            {/* Action Buttons: Proceed & Remove */}
            <Grid item xs={3} container justifyContent="center" alignItems="center">
                <IconButton onClick={handleProceed} sx={{ color: 'primary.main', marginRight: 1 }}>
                    <CheckCircleOutlineIcon />
                </IconButton>
                <IconButton onClick={handleRemove} sx={{ color: 'error.main' }}>
                    <RemoveCircleOutlineIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
};

export default CartDetailCard;
