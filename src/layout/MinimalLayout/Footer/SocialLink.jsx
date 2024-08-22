import React from 'react'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import { Facebook, LinkedIn, Instagram } from '@mui/icons-material'
import PropTypes from 'prop-types'

export const socialLinks = [
  {
    name: 'Instagram',
    link: '#',
    icon: <Instagram />
  },
  {
    name: 'LinkedIn',
    link: '#',
    icon: <LinkedIn />
  },
  {
    name: 'Facebook',
    link: 'https://dribbble.com/shots/18114471-Coursespace-Online-Course-Landing-Page',
    icon: <Facebook />
  }
];

const SocialLinkItem = ({ item }) => (
  <Box
    component="li"
    sx={{
      display: 'inline-block',
      color: 'white',
      mr: 0.5,
    }}
  >
    <Link
      target="_blank"
      sx={{
        lineHeight: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 36,
        height: 36,
        borderRadius: '50%',
        color: '#385909', // Set the color here
        '&:hover': {
          backgroundColor: 'secondary.main',
        },
        '& svg': { // Apply styles to SVG icons
          width: 22,
          height: 'auto',
        },
      }}
      href={item.link}
    >
      {item.icon}
    </Link>
  </Box>
)

SocialLinkItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
  }).isRequired
}

const SocialLinks = () => {
  return (
    <Box sx={{ ml: -1 }}>
      <Box
        component="ul"
        sx={{
          m: 0,
          p: 0,
          lineHeight: 0,
          borderRadius: 3,
          listStyle: 'none',
        }}
      >
        {socialLinks.map((item) => {
          return <SocialLinkItem key={item.name} item={item} />
        })}
      </Box>
    </Box>
  )
}

export default SocialLinks
