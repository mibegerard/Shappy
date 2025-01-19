import React from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import PropTypes from 'prop-types';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useTheme } from '@mui/material/styles';
import 'flag-icons/css/flag-icons.min.css';

const ProductCard = ({ item, onProductClick }) => {
    const theme = useTheme();
    const vertFonce = theme.palette.vert?.fonce;
    const beigeClair = theme.palette.beige?.clair;

    return (
        <Box
            sx={{
                backgroundColor: 'transparent',
                padding: '1rem',
                borderRadius: '0 0 1rem 1rem',
                width: '100%',
                boxShadow: 1, 
            }}
        >
            {/* Image Box */}
            <Box
                component="img"
                src={item.src}
                alt={item.alt}
                onClick={onProductClick}
                sx={{
                    width: '100%',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'scale(1.05)',
                        borderRadius: '1rem'
                    },
                    borderRadius: '0.5rem',
                    objectFit: 'cover',
                    marginBottom: '1rem'
                }}
            />

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
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
                    {item.localText}
                </Typography>

                <Box
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ ml: 2 }}
                    className="fi fi-fr"
                />
            </Box>

            <Typography
                variant="h6"
                sx={{ color: vertFonce, fontWeight: 'bold' }}
            >
                {item.name}
            </Typography>
            
            <Grid container spacing={1}>
                <Grid item xs={12} container direction="column" alignItems="flex-start">
                    <Typography
                        variant="h6"
                        sx={{ color: vertFonce }}
                    >
                        {typeof item.price === 'number' ? `${item.price.toFixed(2)} €` : item.price}
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
                                    sx={{ color: vertFonce }}
                                >
                                    En stock: {item.stock} {item.unit} 
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <Typography
                        sx={{ color: vertFonce }}
                    >
                        Producteur: {item.producteur}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

ProductCard.propTypes = {
    item: PropTypes.shape({
        src: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
        localText: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        producteur: PropTypes.string.isRequired,
        price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, 
        stock: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        unit: PropTypes.string.isRequired,
    }).isRequired,
    onProductClick: PropTypes.func.isRequired,
};

export default ProductCard;
