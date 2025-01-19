import React from 'react';
import { Box, Typography, Grid, Rating } from '@mui/material';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const ProfileCard = ({ user, sx }) => {
    const theme = useTheme();

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', backgroundColor: theme.palette.background.paper, ...sx }}>
            {/* User Info */}
            <Box sx={{ flex: 1 }}>
                <Typography variant="h2" sx={{ color: theme.palette.text.primary, fontWeight: 'light', fontSize: '2rem', marginBottom: '0.5rem' }}> 
                    {user.firstName} {user.lastName}
                </Typography>
                {/* Display restaurant name only if it exists */}
                {user.restaurantName && (
                    <Typography variant="body1" sx={{ color: theme.palette.text.secondary, marginBottom: '0.5rem', fontSize: '1.5rem', fontWeight: '400' }}>
                        {user.restaurantName}
                    </Typography>
                )}
                {/* Location Info: Display only if city or postal code exists */}
                {(user.city || user.postalCode) && (
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', marginLeft: '-0.25rem' }}>
                        <LocationOnIcon sx={{ color: theme.palette.text.secondary, marginRight: '0.25rem' }} />
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontSize: '1.2rem' }}>
                            {user.city}{ user.postalCode && user.city ? ' ' : ''}{user.postalCode}
                        </Typography>
                    </Box>
                )}

                {/* User Description */}
                {user.description && (
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary, marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                        {user.description}
                    </Typography>
                )}

                {/* Stars */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Rating
                        name="user-rating"
                        value={5} // Assuming user has a rating of 5 stars
                        readOnly
                        precision={0.5}
                        size="small"
                        sx={{ color: '#FC8A1A' }}
                    />
                </Box>
            </Box>
        </Box>
    );
};

ProfileCard.propTypes = {
    user: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        city: PropTypes.string,
        postalCode: PropTypes.string,
        restaurantName: PropTypes.string,  // No longer required
        restaurantAddress: PropTypes.string,  // No longer required
        profileImage: PropTypes.string,  // Optional
        description: PropTypes.string,
    }).isRequired,
    sx: PropTypes.object,
};

export default ProfileCard;
