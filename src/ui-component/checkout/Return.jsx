import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Typography, Box } from '@mui/material';
import axiosInstance from 'api/axiosInstance';

const Return = () => {
    const [status, setStatus] = useState(null);
    const [customerEmail, setCustomerEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSessionStatus = async () => {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const sessionId = urlParams.get('session_id');

            if (!sessionId) {
                navigate('/'); // Rediriger si aucun session_id n'est présent
                return;
            }

            try {
                const response = await axiosInstance.get(`/cart/stripe/session-status?session_id=${sessionId}`);
                setStatus(response.data.status);
                setCustomerEmail(response.data.customer_email);
            } catch (error) {
                console.error("Erreur lors de la récupération du statut de la session:", error);
                setStatus('error');
            }
        };

        fetchSessionStatus();
    }, [navigate]);

    if (status === 'open') {
        return <Typography>Votre paiement est en attente...</Typography>;
    }

    if (status === 'complete') {
        return (
            <Box textAlign="center">
                <Typography variant="h4">Merci pour votre achat !</Typography>
                <Typography>Un email de confirmation a été envoyé à {customerEmail}.</Typography>
            </Box>
        );
    }

    if (status === 'error') {
        return <Typography>Une erreur est survenue lors de la vérification de votre paiement.</Typography>;
    }

    return <CircularProgress />;
};

export default Return;