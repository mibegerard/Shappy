import React from 'react';
import { Grid, Container, Typography } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import ArticleCard from '../Cards/ArticleCard';
import firstImage from 'assets/images/16.png';
import secondImage from 'assets/images/imagesd.png';
import thirdImage from 'assets/images/Compost.png';

const Article = () => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const articles = [
    {
      imageUrl: firstImage,
      title: 'Les fruits & légumes de saison',
      date: 'Aout 2023',
      description: 'Lorem ipsum dolor sit amet. Aut eius exercitationem qui voluptatem voluptas et molestiae sunt nam vitae animi!Duis aute irure dolor in reprehenderit occaecat cupidatat.',
      buttonText: "Lire l'article",
      tags: ['Actualité', 'Le saviez-vous ?'],
      onButtonClick: () => alert('Article 1 clicked'),
    },
    {
      imageUrl: secondImage,
      title: 'Les JO de Paris commencent',
      date: 'Juin 2023',
      description: 'Lorem ipsum dolor sit amet. Aut eius exercitationem qui voluptatem voluptas et molestiae sunt nam vitae animi!Duis aute irure dolor in reprehenderit occaecat cupidatat.',
      buttonText: 'Lire l\'article',
      tags: ['Sport & Santé', 'Bien-être'],
      onButtonClick: () => alert('Article 2 clicked'),
    },
    {
      imageUrl: thirdImage,
      title: 'Comment bien composter ?',
      date: 'Mai 2023',
      description: 'Lorem ipsum dolor sit amet. Aut eius exercitationem qui voluptatem voluptas et molestiae sunt nam vitae animi!Duis aute irure dolor in reprehenderit occaecat cupidatat.',
      buttonText: "Lire l'article",
      tags: ['Conseils anti-gaspi', 'Écologie'],
      onButtonClick: () => alert('Article 3 clicked'),
    },
  ];

return (
    <Container sx={{ marginTop: '6rem', marginBottom: '6rem' }}>
        <Typography 
            variant="h1" 
            sx={{ textAlign: 'center', marginBottom: '6rem', marginTop: '2rem', color: '#385909', letterSpacing: '1px', fontSize: '2.5rem', fontWeight: 700 }}
        >
            Découvrez notre Blog fruité
        </Typography>
        <Grid container spacing={4} justifyContent="center">
            {articles.map((article, index) => (
                <Grid
                    item
                    xs={12}
                    sm={isSmallScreen ? 12 : 4}
                    key={index}
                >
                    <ArticleCard article={article} />
                </Grid>
            ))}
        </Grid>
        <Grid container justifyContent="center" sx={{ marginTop: '4rem' }}>
            <button
                style={{
                    backgroundColor: '#385909',
                    borderRadius: '10px',
                    color: '#fff',
                    padding: '10px 20px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                }}
                onClick={() => alert('Voir tous nos articles clicked')}
            >
                Voir tous nos articles
            </button>
        </Grid>
    </Container>
);
};

export default Article;