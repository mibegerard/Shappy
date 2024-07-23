import React from 'react';
import { Box, Typography, Button, Grid, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import group4 from 'assets/images/Group 36.png';
import group3 from 'assets/images/Group 37.png';
import group2 from 'assets/images/Group 38.png';
import group1 from 'assets/images/Group 39.png';

const Description = () => {
    const theme = useTheme();

    return (
        <Box sx={{ backgroundColor: theme.palette.beige.clair, paddingTop: '3rem', paddingBottom: '3rem' }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h1" sx={{ paddingTop: '1rem', paddingBottom: '4rem', color: theme.palette.text.primary }}>
                        Nos avantages juteux
                    </Typography>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={6} sm={4} md={3}>
                            <img src={group1} alt="Group 2" style={{ width: 'auto', height: 'auto'}} />
                        </Grid>
                        <Grid item xs={6} sm={4} md={3}>
                            <img src={group2} alt="Group 2" style={{ width: 'auto', height: 'auto'}} />
                        </Grid>
                        <Grid item xs={6} sm={4} md={3}>
                            <img src={group3} alt="Group 3" style={{ width: 'auto', height: 'auto'}} />
                        </Grid>
                        <Grid item xs={6} sm={4} md={3}>
                            <img src={group4} alt="Group 4" style={{ width: 'auto', height: 'auto'}} />
                        </Grid>
                    </Grid>
                    <Button
                        variant="contained"
                        sx={{
                            marginTop: '2rem',
                            borderRadius: '15px',
                            backgroundColor: theme.palette.orange.main, 
                            color: theme.palette.beige.clair, 
                            paddingRight: '30px', paddingLeft: '30px'
                        }}
                    >
                        Je m'inscris
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default Description;
