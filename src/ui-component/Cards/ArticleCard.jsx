import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Chip,
  Typography,
  Button,
  Box,
  Stack,
  useTheme
} from '@mui/material';
import PropTypes from 'prop-types';

const ArticleCard = ({ article }) => {
  const theme = useTheme();
  const vertFonce = theme.palette.vert?.fonce;
  const beigeClair = theme.palette.beige?.clair;
  const blue = theme.palette.blue?.main || '#2196F3';

  return (
    <Card
      sx={{
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        backgroundColor: 'transparent',
      }}
    >
      {/* Image with border radius */}
      <CardMedia
        component="img"
        height="200"
        image={article.imageUrl}
        alt={article.title}
        sx={{ borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}
      />

      <CardContent sx={{ px: 2.5, pt: 2, pb: 2.5 }}>
        {/* Tags */}
        <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
          {article.tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              size="small"
              sx={{
                borderRadius: '20px',
                backgroundColor: index === 0 ? vertFonce : '#FC8A1A',
                color: 'white',
                fontSize: '0.7rem',
                height: '24px',
              }}
            />
          ))}
        </Stack>

        {/* Title */}
        <Typography
          variant="h3"
          sx={{
            fontSize: '1.25rem',
            fontWeight: 700,
            mb: 1,
            color: vertFonce,
          }}
        >
          {article.title}
        </Typography>

        {/* Date */}
        <Typography
          variant="caption"
          sx={{
            fontSize: '10px',
            color: '#9ACF5D',
            display: 'block',
            mb: 1,
          }}
        >
          {article.date}
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{
            color: '#385909',
            mb: 2,
            fontSize: '0.875rem',
            lineHeight: 1.5,
          }}
        >
          {article.description}
        </Typography>

        {/* Button */}
        <Button
          variant="contained"
          width= "auto"
          sx={{
            backgroundColor: '#385909',
            borderRadius: '6px',
            py: 1,
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': {
              backgroundColor: '#1976D2',
            },
          }}
          onClick={article.onButtonClick}
        >
          {article.buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};

ArticleCard.propTypes = {
  article: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    date: PropTypes.string.isRequired,
    onButtonClick: PropTypes.func,
  }).isRequired,
};


export default ArticleCard;