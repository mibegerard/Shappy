import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useTheme } from '@mui/material/styles';

const ProductCard = ({ item }) => {
    const theme = useTheme();
    const vertFonce = theme.palette.vert?.fonce;
    const beigeClair = theme.palette.beige?.clair;
    const vertFonce60 = theme.palette.vert?.fonce60;

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
                    backgroundColor: vertFonce,
                    padding: '0px 15px',
                    borderRadius: '1rem',
                    display: 'inline-block',
                }}
            >
                <Typography
                    variant="body1"
                    sx={{ color: beigeClair }}
                >
                    {item.localText}
                </Typography>
            </Box>
            <Typography
                variant="h6"
                sx={{ color: vertFonce, fontWeight: 'bold', marginBottom: '1rem' }}
            >
                {item.name}
            </Typography>
            <Grid container spacing={1}>
                <Grid item xs={10} container direction="column" alignItems="flex-start">
                    <Typography
                        variant="h6"
                        sx={{ color: vertFonce }}
                    >
                        {item.price}
                    </Typography>
                    <Grid container alignItems="center">
                        <Grid item xs={2}>
                            <Typography
                                variant="body2"
                                sx={{ color: vertFonce }}
                            >
                                {item.weight}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} container justifyContent="flex-end">
                            <Typography
                                variant="body2"
                                sx={{ color: vertFonce60 }}
                            >
                                {item.pricePerKg}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'flex-end',
                                    height: '100%',
                                    paddingLeft: '6rem'
                                }}
                            >
                                <AddCircleIcon
                                    sx={{
                                        fontSize: 40,
                                        color: vertFonce
                                    }}
                                />
                            </Box>
                        </Grid>
                    </Grid>
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
        price: PropTypes.string.isRequired,
        weight: PropTypes.string.isRequired,
        pricePerKg: PropTypes.string.isRequired
    }).isRequired
};

export default ProductCard;
