// Producteur.js
import React from 'react';
import { Container, Grid } from '@mui/material';
import ProducteurCard from '../Cards/ProducteurCard'; 
import pro1 from 'assets/images/producteur1.png';
import pro2 from 'assets/images/Producteur2.png';

const Producteur = () => {
    const producteurs = [
        { name: 'Les Vergers de Picardie', city: 'Paris', ratingNumber: 4, picture: pro1, link: '#' },
        { name: 'Les Vergers de Picardie', city: 'Marseille', ratingNumber: 5, picture: pro2, link: '#' },
        { name: 'Les Vergers de Picardie', city: 'Bordeaux', ratingNumber: 0, picture: pro1, link: '#' }, 
        { name: 'Les Vergers de Picardie', city: 'Angers', ratingNumber: 2, picture: pro2, link: '#' }
    ];

    return (
        <Container>
            <Grid container spacing={4} sx={{ marginTop: '2rem' }} >
                {producteurs.map((producteur, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <ProducteurCard {...producteur} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Producteur;
