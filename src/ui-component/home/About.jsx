import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';

import aboutImage from 'assets/images/pommes-de-terre-142540.jpg';

const AboutSection = () => {
  return (
    <Container sx={{ py: 10 }}>
      <Box py={4}>
        <Typography
          variant="h4"
          component="h1"
          color="white"
          gutterBottom
          sx={{ backgroundColor: 'primary.main', display: 'inline-block', padding: 1, paddingX: 3 }}
        >
          Accueil
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <img
              src={aboutImage}
              alt="Soccer player"
              style={{ width: '100%', height: 'auto' }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography
              variant="h1"
              component="h2"
              gutterBottom
              sx={{
                borderBottom: '2px solid',
                borderColor: 'primary.main',
                display: 'inline-block',
                paddingY: 1,
                paddingRight: 3
              }}
            >
              Shappy
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontSize: '18px' }}>
              Les fruits et légumes sont essentiels pour une alimentation saine et équilibrée. Ils regorgent de vitamines, de minéraux et d&apos;antioxydants, qui aident à renforcer le système immunitaire et à prévenir diverses maladies. De plus, leur variété de couleurs et de textures apporte non seulement des bienfaits nutritionnels, mais aussi une esthétique attrayante dans nos assiettes. Que ce soit des fruits juteux comme les oranges et les fraises, ou des légumes croquants comme les carottes et les brocolis, chaque aliment a ses propres atouts. Consommer une gamme diversifiée de fruits et légumes est un excellent moyen d&apos;assurer un apport complet en nutriments.
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontSize: '18px' }}>
              En plus de leurs bienfaits pour la santé, les fruits et légumes jouent un rôle crucial dans la durabilité environnementale.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AboutSection;
