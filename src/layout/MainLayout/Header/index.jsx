// src/layout/MainLayout/Header/index.jsx
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import logoSrc from 'assets/images/logobelge.png';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import { Link } from 'react-router-dom';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import { useAuth } from '../../../context/AuthContext'; // Ensure this path is correct
import { toast } from 'react-toastify';

const Header = (props) => {
  const { logout, auth } = useAuth(); // Ensure this is used correctly

  const handleLogout = async () => {
    try {
      await logout();
      toast.info('Déconnexion avec succès');
      setTimeout(() => {
        window.location.href = 'http://localhost:3000/';
      }, 1000); // 1-second delay before redirecting
    } catch (error) {
      toast.error('Erreur lors de la déconnexion');
    }
  };
  
  console.log(auth);

  const menuItems = [
    { name: 'Je suis Producteur', link: '/je-suis-producteur', icon: <AgricultureIcon color="primary" /> },
      ...(auth.isAuthenticated
        ? [{ name: 'Se déconnecter', onClick: handleLogout, icon: <HomeIcon color="error" /> }]
        : [{ name: 'Se Connecter', link: '/auth/login', icon: <HomeIcon color="primary" /> }])
  ];

  const HideOnScroll = (props) => {
    const { children } = props;
    const trigger = useScrollTrigger();

    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
  };

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerContent = (
    <Box
      sx={{
        width: '70vw',
        maxWidth: 300,
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItem button key={item.name + index} onClick={item.onClick}>
            <ListItemText>
              {item.link ? (
                <Link
                  to={item.link}
                  style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}
                >
                  {item.icon}
                  <Typography variant="h6" sx={{ marginLeft: '10px', color: '#FC8A1A' }}>
                    {item.name}
                  </Typography>
                </Link>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  {item.icon}
                  <Typography variant="h6" sx={{ marginLeft: '10px', color: '#FC8A1A' }}>
                    {item.name}
                  </Typography>
                </Box>
              )}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <HideOnScroll {...props}>
        <AppBar position="fixed" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
          <Container maxWidth="lg">
            <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button component={Link} to="/" sx={{ p: 0 }}>
                <img
                  src={logoSrc}
                  alt="Logo"
                  style={{
                    width: 'auto',
                    height: window.innerWidth <= 600 
                      ? '20px' // Small screens
                      : window.innerWidth <= 1024
                      ? '25px' // Medium screens
                      : '30px' // Large screens
                  }}
                />

                </Button>
              </Box>
              {isLargeScreen ? (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    {menuItems.map((item, index) => (
                      <Box
                        key={item.name + index}
                        component={item.link ? Link : 'div'}
                        to={item.link}
                        onClick={item.onClick}
                        sx={{
                          textDecoration: 'none',
                          backgroundColor: (item.name === 'Se Connecter' || item.name === 'Se déconnecter') ? 'transparent' : '#F5F5DC',
                          padding: '0.5rem 1rem',
                          marginRight: '1rem',
                          borderRadius: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          cursor: item.link ? 'pointer' : 'default'
                        }}
                      >
                        <Typography variant="h6" sx={{ color: (item.name === 'Se Connecter' || item.name === 'Se déconnecter') ? '#FFF4E2' : '#FC8A1A' }}>
                          {item.name}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              ) : (
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                  <MenuIcon />
                </IconButton>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      {!isLargeScreen && (
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          {drawerContent}
        </Drawer>
      )}
    </>
  );
};

export default Header;
