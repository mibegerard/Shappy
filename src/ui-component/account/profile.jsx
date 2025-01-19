import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Typography, Container, Button } from '@mui/material';
import ProfileCard from '../Cards/ProfileCard'; 
import avocat from 'assets/images/Avocat producteur.png';
import carottes from 'assets/images/Carotte restauratrice1.png';
import { useAuth } from 'context/AuthContext'; 
import { useTheme } from '@mui/material/styles';
import axiosInstance from 'api/axiosInstance';

const Profile = () => {
    const { auth, logout } = useAuth();
    const theme = useTheme();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);

    // Function to get user ID from auth context
    const getUserId = () => auth.user?._id || auth.user?.id;

    // Fetch user data from API
    useEffect(() => {
        const fetchUserData = async () => {
            const userId = getUserId();
            if (!userId) {
                console.error("User ID is missing. Cannot fetch user data.");
                setLoading(false);
                return;
            }

            try {
                console.log('Fetching user data for user ID:', userId);
                const response = await axiosInstance.get(`/auth/me`); // API call to get user data
                console.log('Fetched user data:', response.data); // Log the fetched data
                setUserData(response.data.data); // Set the user data from the response
                setLoading(false); // Data fetching done
            } catch (err) {
                setError('Failed to fetch user data.');
                setLoading(false); // Data fetching done
                console.error('Error fetching user data:', err);
            }
        };

        if (auth.isAuthenticated) {
            fetchUserData(); // Call the function to fetch user data if authenticated
        } else {
            setLoading(false); // If not authenticated, stop loading
            setError('User is not authenticated.');
        }
    }, [auth]); // Re-run the effect when auth state changes

    const handleLogout = async () => {
        try {
          await logout(); // Call the logout function from the context
          console.log('User has been logged out');
          // Redirect to login page or homepage after logout (optional)
          // e.g., navigate('/login');
        } catch (error) {
          console.error('Error during logout:', error);
        }
      };

    // Handle image upload
    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
    
        const userId = getUserId();
        if (!userId) {
            console.error("User ID is missing. Cannot upload profile picture.");
            return;
        }
    
        const formData = new FormData();
        formData.append('profilePicture', file);
        formData.append('role', userData.role);
    
        const endpoint = `${userId}/profile-picture`;
        console.log("Uploading profile picture to endpoint:", endpoint);
        console.log("FormData content:", [...formData.entries()]);
    
        setImageLoading(true);
    
        try {
            const response = await axiosInstance.post(endpoint, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log("Profile picture uploaded successfully:", response.data);
            setUserData(response.data.data); // Update the user data with the new profile picture
        } catch (error) {
            console.error("Error uploading profile picture:", error);
            console.error("Response status:", error.response?.status);
            console.error("Response data:", error.response?.data);
        } finally {
            setImageLoading(false);
        }
    };

    const handleModifyProfile = () => {
        if (!userData) return;
        // Redirect based on role
        if (userData.role === 'restaurateur') {
            navigate(`/edit-profile/restaurateur`);
        } else if (userData.role === 'producteur') {
            navigate(`/edit-profile/producteur`);
        } else {
            console.error('Unknown role. Cannot redirect to profile edit page.');
        }
    };
    

    // Error state rendering
    if (error) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            </Box>
        );
    }

    // Loading state rendering
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    // Determine the user image
    const getUserImage = () => {
        if (userData.profilePicture) {
            return userData.profilePicture;
        }
        return userData.role === "restaurateur" ? carottes : avocat;
    };

    // Method to get the user's description or show a placeholder if none is provided
    const getUserDescription = () => {
        if (userData.description) {
            return userData.description;
        }

        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <hr style={{ width: '100%', margin: '10px 0' }} />
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontSize: '1rem', textAlign: 'center' }}>
                    Entrez une description de vous et/ou de ce que vous faites
                </Typography>
            </Box>
        );
    };


    // Render the ProfileCard with image box
    return (
        <Container sx={{ marginTop: '5rem', marginBottom: '5rem' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '0rem', alignItems: 'flex-start'}}>
                {/* Left Section (Image and Profile Card) */}
                <Box sx={{ width: '60%', display: 'flex', gap: '2rem' }}>
                    {/* Image Box */}
                    <Box
                        sx={{
                            width: '200px',
                            height: '200px',
                            borderRadius: '15px',
                            overflow: 'hidden',
                            boxShadow: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                            cursor: 'pointer',
                        }}
                    >
                        <Box
                            component="img"
                            src={getUserImage()}
                            alt="User Image"
                            sx={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                width: 'auto',
                                height: 'auto',
                            }}
                            onClick={() => document.getElementById('profilePictureInput').click()}
                        />
                        <input
                            type="file"
                            id="profilePictureInput"
                            style={{ display: 'none' }}
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                        {imageLoading && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <CircularProgress />
                            </Box>
                        )}
                    </Box>

                    {/* Profile Card */}
                    {userData && (
                        <Box sx={{ flex: 1 }}>
                            <ProfileCard user={userData} />
                        </Box>
                    )}
                </Box>

                {/* Right Section (Button Box) */}
                <Box sx={{ width: '40%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                    <Button variant="contained" color="primary" onClick={handleModifyProfile}>
                        Modifier mon profil
                    </Button>
                </Box>
            </Box>
            {/* Button Box */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
                <Button variant="contained" color="secondary" onClick={handleLogout}>
                    Me déconnecter
                </Button>
            </Box>
        </Container>
    );
};

export default Profile;
