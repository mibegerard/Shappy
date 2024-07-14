import React from 'react'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import { Facebook, LinkedIn, Instagram} from '@mui/icons-material';
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
    icon: <LinkedIn color="white" />
  },
  {
    name: 'Facebook',
    link: 'https://dribbble.com/shots/18114471-Coursespace-Online-Course-Landing-Page',
    icon: <Facebook color="white" />
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
        color: 'inherit',
        '&:hover': {
          backgroundColor: 'secondary.main',
        },
        '& img': {
          fill: 'currentColor',
          width: 22,
          height: 'auto',
        },
      }}
      href={item.link}
    >
      {/* eslint-disable-next-line */}
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
