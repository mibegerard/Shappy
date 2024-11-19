import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useTheme } from '@mui/material/styles';
import 'flag-icons/css/flag-icons.min.css';

const ProductCard = ({ item }) => {
    const theme = useTheme();
    const vertFonce = theme.palette.vert?.fonce;
    const beigeClair = theme.palette.beige?.clair;

    return (
        <Box
            sx={{
                backgroundColor: 'white',
                padding: '1rem',
                marginTop: '-5px',
                textAlign: 'left',
                borderRadius: '0 0 1rem 1rem',
                width: '100%'
            }}
        >

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
                    component="a"
                    href="https://www.google.com"
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
                        {item.price}
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
                                    En stock: {item.stock}
                                </Typography>

                                <AddCircleIcon
                                    sx={{
                                        fontSize: 40,
                                        color: vertFonce,
                                    }}
                                />
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
    }).isRequired
};



export default ProductCard;
