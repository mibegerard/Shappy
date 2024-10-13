import React, { useState } from 'react';
import {
    Box,
    Button,
    Container,
    Typography,
    Divider,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TableContainer,
    Paper,
    Avatar
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import { toast } from 'react-toastify';

const ProductReview = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { formData } = location.state || {};
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!formData) {
            toast.error('No form data available');
            return;
        }
    
        // Append the "€" symbol to the price
        const data = new FormData();
        for (const key in formData) {
            if (key === 'price') {
                data.append(key, `${formData[key]} €`); // Append "€" to the price
            } else {
                data.append(key, formData[key]);
            }
        }
    
        setIsSubmitting(true); // Start submitting
        try {
            const response = await axiosInstance.post('/product/create', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            toast.success("Le produit a été créé avec succès");
            navigate('/');
        } catch (error) {
            const errorMessage = error?.response?.data?.error || error.message || 'Une erreur est survenue';
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false); // Stop submitting
        }
    };    

    return (
        <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
            <Typography variant="h2" gutterBottom sx={{ color: '#385909', textAlign: 'Center', wordSpacing: '1px' }}>
                Les détails de Votre Produit
            </Typography>
            <Divider sx={{ my: 5, borderColor: '#385909' }} />

            {formData ? (
                <>
                    {/* Product Details in Table */}
                    <TableContainer component={Paper} sx={{ borderRadius: '12px', boxShadow: 3, mb: 4 }}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', width: '40%', color: '#385909' }}>Nom</TableCell>
                                    <TableCell sx={{ fontStyle: 'italic', color: '#385909' }}>{formData.name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#385909' }}>Description</TableCell>
                                    <TableCell sx={{ fontStyle: 'italic', color: '#385909' }}>{formData.description}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#385909' }}>Prix</TableCell>
                                    <TableCell sx={{ fontStyle: 'italic', color: '#385909' }}>{formData.price} €</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#385909' }}>Catégorie</TableCell>
                                    <TableCell sx={{ fontStyle: 'italic', color: '#385909' }}>{formData.category}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#385909' }}>Quantité</TableCell>
                                    <TableCell sx={{ fontStyle: 'italic', color: '#385909' }}>{formData.quantity}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#385909' }}>Unité</TableCell>
                                    <TableCell sx={{ fontStyle: 'italic', color: '#385909' }}>{formData.unit}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#385909' }}>Image</TableCell>
                                    <TableCell>
                                        {formData.image ? (
                                            <Avatar
                                                src={URL.createObjectURL(formData.image)}
                                                alt={formData.name}
                                                variant="rounded"
                                                sx={{ width: 100, height: 100, borderRadius: '8px', boxShadow: 2 }}
                                            />
                                        ) : (
                                            <Typography sx={{ color: '#385909' }}>Aucune image sélectionnée</Typography>
                                        )}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Action Buttons */}
                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate('/je-depose-mon-potager')}
                            sx={{ backgroundColor: '#9ACF5D' }}
                        >
                            Modifier
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            sx={{ backgroundColor: '#385909' }}
                        >
                            {isSubmitting ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                'Valider le Produit'
                            )}
                        </Button>
                    </Box>
                </>
            ) : (
                <Typography variant="body1" sx={{ color: '#385909' }}>Aucune donnée disponible pour l'examen.</Typography>
            )}
        </Container>
    );
};

export default ProductReview;
