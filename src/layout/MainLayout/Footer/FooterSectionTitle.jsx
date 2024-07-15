import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box } from '@mui/material';

const FooterSectionTitle = ({ title }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mb: 2,
      }}
    >
      <Typography component="h1" variant="h3" sx={{ color: '#FC8A1A', fontWeight: '700', fontSize: '1.6rem' }}>
        {title}
      </Typography>
    </Box>
  );
};

FooterSectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default FooterSectionTitle;
