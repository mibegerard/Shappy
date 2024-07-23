import React from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { useTheme } from '@mui/material/styles';

const ProducteurCard = ({ name, city, ratingNumber, picture, link }) => {
    const theme = useTheme();
    const vertFonce = theme.palette.vert?.fonce;
    const vertClaire = theme.palette.vert?.claire;
    const beige40 = theme.palette.beige?.['40'];

    return (
        <Card sx={{ borderRadius: '10px', boxShadow: 3 }}>
            <CardContent>
                <Typography 
                    variant="h2" 
                    sx={{ 
                        color: vertFonce, 
                        fontSize: '1.5rem', 
                        fontWeight: 'bold',
                        width: '100%',
                        display: 'block',
                        marginBottom: '5px'
                    }}
                >
                    {name}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0px' }}>
                    <Typography 
                        variant="body1" 
                        sx={{ 
                            fontSize: '15px' 
                        }}
                    >
                        {city}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {[...Array(5)].map((_, index) => (
                            index < ratingNumber ? (
                                <StarIcon key={index} sx={{ color: vertFonce, fontSize: '15px' }} />
                            ) : (
                                <StarBorderIcon key={index} sx={{ color: vertClaire, fontSize: '15px' }} />
                            )
                        ))}
                    </Box>
                </Box>
            </CardContent>
            <Box sx={{ position: 'relative'}}>
                <CardMedia
                    component="img"
                    height="300"
                    image={picture}
                    sx={{ borderRadius: '10px' }} 
                    alt={name}
                />
                <CardActions sx={{ 
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '100%',
                    justifyContent: 'center',
                    padding: '10px'
                }}>
                    <Button 
                        variant="contained" 
                        href={link}
                        sx={{ 
                            backgroundColor: theme.palette.beige?.main,
                            borderRadius: '10px',
                            color: vertFonce,
                            '&:hover': {
                                backgroundColor: vertFonce,
                                color: beige40
                            }
                        }}
                    >
                        Voir les produits
                    </Button>
                </CardActions>
            </Box>
        </Card>
    );
};

export default ProducteurCard;
