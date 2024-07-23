import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

const CommentCard = ({ name, role, rankingNumber, comment }) => {
    const theme = useTheme();
    const vertFonce = theme.palette.vert?.fonce;
    const vertClaire = theme.palette.vert?.claire; 

    const styles = {
        cardContainer: {
            backgroundColor: '#FFFFFF', 
            color: vertFonce,
            padding: '2rem',
            borderRadius: '1.5rem', 
            boxShadow: theme.shadows[3], 
            marginBottom: '2rem',
            width: '100%',
            maxWidth: '400px'
        },
        cardName: {
            color: vertFonce,
            fontSize: '20px',
            fontWeight: 'bold'
        },
        cardRole: {
            color: vertFonce,
            fontWeight: 'bold',
        },
        cardStars: {
            color: vertFonce,
            fontSize: '15px' 
        },
        cardStarsBorder: {
            color: vertClaire,
            fontSize: '15px'
        },
        cardComment: {
            color: vertFonce,
            wordSpacing: '0.3rem'
        }
    };

    return (
        <Box sx={styles.cardContainer}>
            <Typography variant="body1" sx={styles.cardName}>
                {name}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <Typography variant="body1" sx={styles.cardRole}>
                    {role}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {[...Array(5)].map((_, index) => (
                        index < rankingNumber ? (
                            <StarIcon key={index} sx={styles.cardStars} />
                        ) : (
                            <StarBorderIcon key={index} sx={styles.cardStarsBorder} />
                        )
                    ))}
                </Box>
            </Box>
            <Typography variant="body1" sx={styles.cardComment}>
                {comment}
            </Typography>
        </Box>
    );
};

export default CommentCard;
