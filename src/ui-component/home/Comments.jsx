import React from 'react';
import { Grid, Container, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CommentCard from '../Cards/CommentCard';

const commentData = [
    {
        name: 'Sophie Dubois',
        role: 'Restauratrice',
        rankingNumber: 5,
        comment: 'Shappy est une révolution pour moi ! C’est un gain de temps énorme et les produits sont de très bonne qualité !',
    },
    {
        name: 'Martin Matin',
        role: 'Producteur',
        rankingNumber: 5,
        comment: 'Je suis ravi de pouvoir mettre mes produits invendus sur ce site ! La plateforme est pratique et intuitive je recommande !',
    },
    {
        name: 'Elisabeth Mirro',
        role: 'Restauratrice',
        rankingNumber: 4,
        comment: 'Shappy est une révolution pour moi ! C’est un gain de temps énorme et les produits sont de très bonne qualité !',
    },
];

const Comments = () => {
    const theme = useTheme();
    const vertFonce = theme.palette.vert?.fonce

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: theme.spacing(2),
            maxWidth: '1200px',
            margin: '0 auto',
        },
        title: {
            color: vertFonce,
            marginBottom: theme.spacing(4),
            textAlign: 'center',
        },
        gridContainer: {
            marginTop: theme.spacing(2),
            justifyContent: 'center',
        },
        gridItem: {
            width: '100%',
            maxWidth: '400px',
        },
    };

    return (
        <Container sx={styles.container}>
            <Typography variant="h1" sx={styles.title}>
                Témoignages
            </Typography>
            <Grid container spacing={4} sx={styles.gridContainer}>
                {commentData.map((comment, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={4} key={index} sx={styles.gridItem}>
                        <CommentCard {...comment} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Comments;
