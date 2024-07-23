// Produits.js
import React, { useState } from 'react';
import { Box, Typography, Grid, Container, Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Carousel from 'react-material-ui-carousel';
import ProductCard from '../Cards/ProductCard'; 
import Prod1 from 'assets/images/Cerises.png';
import Prod2 from 'assets/images/carottes.png';
import Prod3 from 'assets/images/pdt.png';
import Prod4 from 'assets/images/pommes.png';
import carotte from 'assets/images/Carotte restauratrice.png';

const carouselItems = [
    {
        src: Prod1,
        alt: "Product 1",
        localText: "Local",
        name: "Carottes de Mathieu",
        price: "2,75€",
        weight: "500g",
        pricePerKg: "5,50 €/kg"
    },
    {
        src: Prod2,
        alt: "Product 2",
        localText: "Local",
        name: "Pommes de Pierre",
        price: "3,00€",
        weight: "1kg",
        pricePerKg: "3,00 €/kg"
    },
    {
        src: Prod3,
        alt: "Product 3",
        localText: "Local",
        name: "Pommes de Terre",
        price: "1,50€",
        weight: "1kg",
        pricePerKg: "1,50 €/kg"
    },
    {
        src: Prod4,
        alt: "Product 4",
        localText: "Local",
        name: "Pêches du Verger",
        price: "4,00€",
        weight: "1kg",
        pricePerKg: "4,00 €/kg"
    }
];

const Produits = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const theme = useTheme();
    const isMediumOrSmaller = useMediaQuery(theme.breakpoints.down('md'));

    const handleCarouselChange = (index) => {
        setActiveIndex(index);
    };

    return (
        <Container maxWidth="lg">
            <Grid container justifyContent="center" sx={{marginBottom : '3rem', marginTop : '3rem'}}>
                {isMediumOrSmaller ? (
                    <>
                        <Grid item xs={12} container justifyContent="center">
                            <Box
                                sx={{
                                    width: '100%',
                                    height: 'auto',
                                    zIndex: 1,
                                    position: 'relative'
                                }}
                            >
                                <Carousel
                                    index={activeIndex}
                                    onChange={handleCarouselChange}
                                    indicators={false}
                                    interval={5000}
                                    animation="slide"
                                    swipe={false}
                                    navButtonsAlwaysInvisible
                                >
                                    {carouselItems.map((item, index) => (
                                        <Box
                                            key={index}
                                            component="img"
                                            src={item.src}
                                            alt={item.alt}
                                            sx={{
                                                width: '100%',
                                                height: 'auto',
                                                transition: 'transform 0.3s ease-in-out',
                                                '&:hover': {
                                                    transform: 'scale(1.05)',
                                                    borderRadius: '1rem'
                                                },
                                                borderRadius: '1rem'
                                            }}                                            
                                        />
                                    ))}
                                </Carousel>
                                <ProductCard item={carouselItems[activeIndex]} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} container direction="column" justifyContent="center" alignItems="center" sx={{ textAlign: 'center', mt: 4 }}>
                            <Typography variant="h1" gutterBottom>
                                Je suis restaurateur
                            </Typography>
                            <Typography paragraph>
                                Shappy, la plateforme qui facilite la connexion entre les producteurs et les restaurateurs!
                            </Typography>
                            <Typography paragraph>
                                Trouvez facilement des fruits et légumes frais et locaux parmi les offres des producteurs sur Shappy.
                            </Typography>
                            <Typography paragraph>
                                Simplifiez votre processus d'approvisionnement en trouvant facilement les ingrédients de qualité dont vous avez besoin pour votre restaurant sur Shappy.
                            </Typography>
                            <Box display="flex" alignItems="center" flexDirection="row" justifyContent="center" sx={{ mt: 2 }}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        marginRight: '1rem',
                                        borderRadius: '10px',
                                        backgroundColor: theme.palette.orange.main,
                                        color: theme.palette.beige.clair,
                                        paddingRight: '30px',
                                        paddingLeft: '30px'
                                    }}
                                >
                                    Je commence mon marché
                                </Button>
                                <Box
                                    component="img"
                                    src={carotte}
                                    alt="Product"
                                    sx={{ 
                                        height: { xs: '60px', sm: '80px' }, 
                                        width: 'auto', 
                                        maxWidth: '100px' 
                                    }}
                                />
                            </Box>
                        </Grid>
                    </>
                ) : (
                    <>
                        <Grid item xs={8} container>
                            <Grid item xs={4}>
                                <Box
                                    sx={{
                                        position: 'relative',
                                        top: '1rem',
                                        left: '3rem',
                                        width: '90%',
                                        height: 'auto',
                                        zIndex: 1
                                    }}
                                >
                                    <Carousel
                                        index={activeIndex}
                                        onChange={handleCarouselChange}
                                        indicators={false}
                                        interval={5000}
                                        animation="slide"
                                        swipe={false}
                                        navButtonsAlwaysInvisible
                                    >
                                        {carouselItems.map((item, index) => (
                                            <Box
                                                key={index}
                                                component="img"
                                                src={item.src}
                                                alt={item.alt}
                                                sx={{
                                                    width: '100%',
                                                    height: 'auto',
                                                    transition: 'transform 0.3s ease-in-out',
                                                    '&:hover': {
                                                        transform: 'scale(1.05)',
                                                        borderRadius: '1rem'
                                                    },
                                                    borderRadius: '1rem 1rem 0 0'
                                                }}
                                            />
                                        ))}
                                    </Carousel>
                                    <ProductCard item={carouselItems[activeIndex]} />
                                </Box>
                            </Grid>
                            <Grid item xs={7}>
                                <Carousel
                                    index={activeIndex}
                                    onChange={handleCarouselChange}
                                    indicators={false}
                                    interval={5000}
                                    animation="slide"
                                    swipe={false}
                                    navButtonsAlwaysInvisible
                                >
                                    {carouselItems.map((item, index) => (
                                        <Box
                                            key={index}
                                            component="img"
                                            src={item.src}
                                            alt={item.alt}
                                            sx={{
                                                width: '100%',
                                                height: 'auto',
                                                transition: 'transform 0.3s ease-in-out',
                                                '&:hover': {
                                                    transform: 'scale(1.05)',
                                                    borderRadius: '1rem'
                                                },
                                                borderRadius: '1rem'
                                            }}
                                            
                                        />
                                    ))}
                                </Carousel>
                            </Grid>
                        </Grid>
                        <Grid item xs={4} container direction="column" justifyContent="center" alignItems="flex-start">
                            <Typography variant="h1" gutterBottom>
                                Je suis restaurateur
                            </Typography>
                            <Typography paragraph>
                                Shappy, la plateforme qui facilite la connexion entre les producteurs et les restaurateurs!
                            </Typography>
                            <Typography paragraph>
                                Trouvez facilement des fruits et légumes frais et locaux parmi les offres des producteurs sur Shappy.
                            </Typography>
                            <Typography paragraph>
                                Simplifiez votre processus d'approvisionnement en trouvant facilement les ingrédients de qualité dont vous avez besoin pour votre restaurant sur Shappy.
                            </Typography>
                            <Box display="flex" alignItems="center">
                                <Button
                                    variant="contained"
                                    sx={{
                                        marginTop: '2rem',
                                        borderRadius: '10px',
                                        backgroundColor: theme.palette.orange.main,
                                        color: theme.palette.beige.clair,
                                        paddingRight: '30px',
                                        paddingLeft: '30px'
                                    }}
                                >
                                    Je commence mon marché
                                </Button>
                                <Box
                                    component="img"
                                    src={carotte}
                                    alt="Product"
                                    sx={{ height: 'auto', width: 'auto' }}
                                />
                            </Box>
                        </Grid>
                    </>
                )}
            </Grid>
        </Container>
    );
};

export default Produits;

