import React, { useState } from 'react';
import {
    Grid,
    Container,
    Typography,
    Button,
    Box,
    Card,
    CardContent,
    CardActions,
    List,
    ListItem,
    ListItemIcon,
    useTheme,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Abonnement = () => {
    const [selectedType, setSelectedType] = useState('restaurateur');
    const theme = useTheme();

    const prices = {
        restaurateur: { freemium: 8, basic: 29, premium: 69 },
        producteur: { freemium: 12, basic: 39, premium: 89 },
    };

    // Déterminer la couleur de fond dynamique pour la carte "Basic"
    const basicCardBgColor = selectedType === 'restaurateur' ? theme.palette.primary.main : '#9ACF5D';

    return (
        <Box
            sx={{
                minHeight: '100vh',
                py: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: 12 }}>
                    <Typography variant="h1" gutterBottom margin={7}>
                        JE DÉCOUVRE LES ABONNEMENTS SHAPPY
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0, mt: 3 }}>
                        <Button
                            variant={selectedType === 'restaurateur' ? 'contained' : 'outlined'}
                            sx={{
                                backgroundColor: selectedType === 'restaurateur' ? '#FC8A1A' : 'white',
                                color: selectedType === 'restaurateur' ? 'white' : 'primary.main',
                                borderColor: 'transparent',
                                '&:hover': {
                                    backgroundColor: selectedType === 'restaurateur' ? 'primary.main' : '#fff',
                                },
                            }}
                            onClick={() => setSelectedType('restaurateur')}
                        >
                            <Typography variant="h3" sx={{ color: selectedType === 'restaurateur' ? 'white' : 'primary.main' }}>
                                RESTAURATEUR
                            </Typography>
                        </Button>
                        <Button
                            variant={selectedType === 'producteur' ? 'contained' : 'outlined'}
                            sx={{
                                backgroundColor: selectedType === 'producteur' ? '#385909' : 'white',
                                color: selectedType === 'producteur' ? 'white' : '#385909',
                                border: 'none',
                                '&:hover': {
                                    backgroundColor: selectedType === 'producteur' ? '#385909' : '#ffffff',
                                },
                            }}
                            onClick={() => setSelectedType('producteur')}
                        >
                            <Typography variant="h3" sx={{ color: selectedType === 'producteur' ? 'white' : '#385909' }}>
                                PRODUCTEUR
                            </Typography>
                        </Button>
                    </Box>
                </Box>

                <Grid container spacing={0}>
                    {/* Freemium Card */}
                    <Grid item xs={12} md={4}>
                        <Card sx={{ boxShadow: 3, borderRadius: 3, bgcolor: 'white' }}>
                            <CardContent>
                                <Typography component="span" variant="h1" sx={{ fontSize: '50px', color: '#9ACF5D' }}>
                                    {prices[selectedType].freemium}€
                                </Typography>
                                <Typography component="span" sx={{ fontSize: '20px', marginLeft: '4px', color: '#9ACF5D' }}>
                                    /mois
                                </Typography>
                                <Typography variant="h1" gutterBottom sx={{ color: '#9ACF5D' }}>
                                    FREEMIUM
                                </Typography>
                                <Typography variant="body1" gutterBottom sx={{ color: '#9ACF5D' }}>
                                    Accès aux fonctionnalités <br /> gratuites de la plateforme
                                </Typography>
                                <List>
                                    <ListItem>
                                        <ListItemIcon>
                                            <CheckCircleIcon fontSize="small" sx={{ bgcolor: 'rgba(255, 202, 157, 0.3)', borderRadius: '50%' }} />
                                        </ListItemIcon>
                                        Accès à l'intégralité de la plateforme en ligne
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <CheckCircleIcon fontSize="small" sx={{ bgcolor: 'rgba(255, 202, 157, 0.3)', borderRadius: '50%' }} />
                                        </ListItemIcon>
                                        Consultation et publication des produits
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <CheckCircleIcon fontSize="small" sx={{ bgcolor: 'rgba(255, 202, 157, 0.3)', borderRadius: '50%' }} />
                                        </ListItemIcon>
                                        Notifications sur les nouvelles offres/commandes
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <CheckCircleIcon fontSize="small" sx={{ bgcolor: 'rgba(255, 202, 157, 0.3)', borderRadius: '50%' }} />
                                        </ListItemIcon>
                                        Possibilité d'accéder au service clients par mail
                                    </ListItem>
                                </List>
                            </CardContent>
                            <CardActions>
                                <Button fullWidth variant="contained" sx={{ bgcolor: '#9ACF5D', color: 'white' }}>
                                    <Typography variant="h3" sx={{ color: 'white' }}>S'INSCRIRE</Typography>
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>

                    {/* Basic Card */}
                    <Grid item xs={12} md={4}>
                        <Card
                            sx={{
                                boxShadow: 6,
                                transform: 'translateY(-20px)',
                                bgcolor: basicCardBgColor,
                                color: 'white',
                                borderRadius: 3,
                            }}
                        >
                            <CardContent>
                                <Typography component="span" variant="h1" sx={{ fontSize: '50px', color: 'white' }}>
                                    {prices[selectedType].basic}€
                                </Typography>
                                <Typography component="span" sx={{ fontSize: '20px', marginLeft: '4px', color: 'white' }}>
                                    /mois
                                </Typography>
                                <Typography variant="h1" gutterBottom sx={{ color: 'white' }}>
                                    BASIC
                                </Typography>
                                <Typography variant="body1" gutterBottom sx={{ color: '#fff' }}>
                                    Accès aux fonctionnalités <br /> basic de la plateforme
                                </Typography>
                                <List>
                                    <ListItem>
                                        <ListItemIcon>
                                            <CheckCircleIcon fontSize="small" sx={{ bgcolor: 'rgba(255, 202, 157, 0.3)', borderRadius: '50%' }} />
                                        </ListItemIcon>
                                        Accès à toutes les fonctionnalités freemium
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <CheckCircleIcon fontSize="small" sx={{ bgcolor: 'rgba(255, 202, 157, 0.3)', borderRadius: '50%' }} />
                                        </ListItemIcon>
                                        Accès aux Commandes prioritaires
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <CheckCircleIcon fontSize="small" sx={{ bgcolor: 'rgba(255, 202, 157, 0.3)', borderRadius: '50%' }} />
                                        </ListItemIcon>
                                        Réduction de 10% sur les frais de livraison
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <CheckCircleIcon fontSize="small" sx={{ bgcolor: 'rgba(255, 202, 157, 0.3)', borderRadius: '50%' }} />
                                        </ListItemIcon>
                                        Commandes prioritaires sur les produits les + demandés
                                    </ListItem>
                                </List>
                            </CardContent>
                            <CardActions>
                                <Button fullWidth variant="outlined" color="inherit" sx={{ color: 'primary.main', bgcolor: 'white' }}>
                                    <Typography variant="h3" sx={{ color: 'primary.main' }}>EN SAVOIR PLUS</Typography>
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>

                    {/* Premium Card */}
                    <Grid item xs={12} md={4}>
                        <Card sx={{ boxShadow: 3, borderRadius: 3, bgcolor: 'white' }}>
                            <CardContent>
                                <Typography component="span" variant="h1" sx={{ fontSize: '50px', color: '#714182' }}>
                                    {prices[selectedType].premium}€
                                </Typography>
                                <Typography component="span" sx={{ fontSize: '20px', marginLeft: '4px', color: '#714182' }}>
                                    /mois
                                </Typography>
                                <Typography variant="h1" gutterBottom sx={{ color: '#714182' }}>
                                    PREMIUM
                                </Typography>
                                <Typography variant="body1" gutterBottom sx={{ color: '#714182' }}>
                                    Accès aux fonctionnalités <br /> Premium de la plateforme
                                </Typography>
                                <List>
                                    <ListItem>
                                        <ListItemIcon>
                                            <CheckCircleIcon fontSize="small" sx={{ color: '#714182' }} />
                                        </ListItemIcon>
                                        <Typography component="span" sx={{ color: 'rgba(113, 65, 130, 0.6)' }}>
                                            Accès aux fonctionnalités Premium de la plateforme
                                        </Typography>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <CheckCircleIcon fontSize="small" sx={{ color: '#714182' }} />
                                        </ListItemIcon>
                                        <Typography component="span" sx={{ color: 'rgba(113, 65, 130, 0.6)' }}>
                                            Livraison gratuite et priorisation des commandes
                                        </Typography>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <CheckCircleIcon fontSize="small" sx={{ color: '#714182' }} />
                                        </ListItemIcon>
                                        <Typography component="span" sx={{ color: 'rgba(113, 65, 130, 0.6)' }}>
                                            Accès à des produits exclusifs de la plateforme
                                        </Typography>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <CheckCircleIcon fontSize="small" sx={{ color: '#714182' }} />
                                        </ListItemIcon>
                                        <Typography component="span" sx={{ color: 'rgba(113, 65, 130, 0.6)' }}>
                                            Statistiques de consommation et rapport sur les économies
                                        </Typography>
                                    </ListItem>
                                </List>
                            </CardContent>
                            <CardActions>
                                <Button fullWidth variant="outlined" color="inherit" sx={{ color: 'primary.main', bgcolor: '#714182' }}>
                                    <Typography variant="h3" sx={{ color: 'white' }}>EN SAVOIR PLUS</Typography>
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Abonnement;