import React, { useEffect, useRef } from 'react';
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
import { Link, useNavigate } from 'react-router-dom'; // Updated import
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import { useAuth } from '../../../context/AuthContext'; 
import { toast } from 'react-toastify';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt'; 
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'; 
import Menu from '@mui/material/Menu';  
import MenuItem from '@mui/material/MenuItem';


const Header = (props) => {
  const { logout, auth } = useAuth(); 
  const navigate = useNavigate();

  // Timer reference to hold setTimeout
  const logoutTimer = useRef(null);

  const handleLogout = async () => {
    try {
      await logout();
      toast.info('Déconnexion avec succès');
      setTimeout(() => {
        console.log("Redirecting to login at:", new Date().toLocaleTimeString()); 
        navigate('/auth/login'); 
      }, 1000); 
    } catch (error) {
      toast.error('Erreur lors de la déconnexion');
    }
  };
  
  // Reset the logout timer on user interaction
  const resetLogoutTimer = () => {
    if (logoutTimer.current) {
      clearTimeout(logoutTimer.current);
    }

    // Log the current time when the timer is reset
    console.log("Logout timer reset at:", new Date().toLocaleTimeString());

    logoutTimer.current = setTimeout(() => {
      console.log("Logging out at:", new Date().toLocaleTimeString()); 
      handleLogout(); 
    }, 3600 * 1000); 
  };


  useEffect(() => {
    resetLogoutTimer(); 

    const events = ['click', 'keypress'];
    
    events.forEach((event) => {
      window.addEventListener(event, resetLogoutTimer);
    });

    return () => {
      
      events.forEach((event) => {
        window.removeEventListener(event, resetLogoutTimer);
      });
      if (logoutTimer.current) {
        clearTimeout(logoutTimer.current);
      }
    };
  }, []);

  console.log(auth);

  const menuItems = [
    // Role-based menu item
    ...(auth.user?.role === 'restaurateur'
      ? [{ name: 'Je Suis Producteur', link: '/je-suis-producteur', icon: <AgricultureIcon color="primary" /> }]
      : auth.user?.role === 'producteur'
      ? [{ name: 'Je Suis Restaurateur', link: '/', icon: <AgricultureIcon color="primary" /> }]
      : []),
  
    // Authentication-based menu item
    ...(auth.isAuthenticated
      ? [{ name: 'Se déconnecter', onClick: handleLogout, icon: <HomeIcon color="error" /> }]
      : [{ name: 'Je Suis Producteur', link: '/je-suis-producteur', icon: <AgricultureIcon color="primary" /> }, { name: 'Se Connecter', link: '/auth/login', icon: <HomeIcon color="primary" /> }]),

      ...(auth.isAuthenticated
        ? [{ 
          icon: <SentimentSatisfiedAltIcon color="secondary" />,
          dropdown: true 
        }] 
        : []),
      
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
      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the drawer
      onKeyDown={(e) => e.stopPropagation()} // Prevent closing when keydown event is triggered inside the drawer
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItem button key={item.name + index} onClick={item.onClick}>
            <ListItemText>
              {item.link ? (
                <Link to={item.link} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
                  {item.icon}
                  <Typography variant="h6" sx={{ marginLeft: '10px', color: '#FC8A1A' }}>
                    {item.name}
                  </Typography>
                </Link>
              ) : item.dropdown ? (
                <PopupState variant="popover" popupId="sentiment-dropdown">
                  {(popupState) => (
                    <React.Fragment>
                      <IconButton {...bindTrigger(popupState)}>
                        <SentimentSatisfiedAltIcon color="secondary" />
                      </IconButton>
                      <Menu
                        {...bindMenu(popupState)}
                        onClose={popupState.close} // Close the dropdown when clicking outside or on a menu item
                      >
                        {auth.user?.role === 'restaurateur' ? (
                          <>
                            <MenuItem
                              onClick={() => {
                                navigate('/cart');
                                popupState.close(); // Close the menu after selecting an item
                              }}
                            >
                              Mon Panier
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                navigate('/mes-commandes');
                                popupState.close();
                              }}
                            >
                              Mes Commandes
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                navigate('/mon-compte');
                                popupState.close();
                              }}
                            >
                              Mon Compte
                            </MenuItem>
                          </>
                        ) : auth.user?.role === 'producteur' ? (
                          <>
                            <MenuItem
                              onClick={() => {
                                navigate('/je-depose-mon-potager');
                                popupState.close(); // Close the menu after selecting an item
                              }}
                            >
                              Ajouter un produit
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                navigate('/mes-produits');
                                popupState.close();
                              }}
                            >
                              Mes Produits
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                navigate('/mon-compte');
                                popupState.close();
                              }}
                            >
                              Mon Compte
                            </MenuItem>
                          </>
                        ) : (
                          // Default case if the role is not restaurateur or producteur
                          <MenuItem onClick={handleLogout}>
                            Se déconnecter
                          </MenuItem>
                        )}
                      </Menu>
                    </React.Fragment>
                  )}
                </PopupState>
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
                <Button 
                  component={Link} 
                  to={(() => {
                    if (!auth.isAuthenticated) {
                      console.log("User is not authenticated. Redirecting to '/'");
                      return "/";
                    }
                    if (auth.user?.role === "restaurateur") {
                      console.log("User is authenticated as 'restaurateur'. Redirecting to '/'");
                      return "/";
                    }
                    if (auth.user?.role === "producteur") {
                      console.log("User is authenticated as 'producteur'. Redirecting to '/je-suis-producteur'");
                      return "/je-suis-producteur";
                    }
                    console.log("Fallback condition met. Redirecting to '/'");
                    return "/";
                  })()}
                  sx={{ 
                    p: 0, 
                    '&:hover': { 
                      backgroundColor: 'transparent' 
                    } 
                  }}
                >
                  <img
                    src={logoSrc}
                    alt="Logo"
                    style={{
                      width: 'auto',
                      height: window.innerWidth <= 600 
                        ? '20px'  // Small screens
                        : window.innerWidth <= 1024
                        ? '25px'  // Medium screens
                        : '30px'  // Large screens
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
                          backgroundColor: (item.icon.type === SentimentSatisfiedAltIcon) ? 'transparent' : (item.name === 'Se Connecter' || item.name === 'Se déconnecter') ? 'transparent' : '#F5F5DC',
                          padding: '0.1rem 1rem',
                          marginRight: '1rem',
                          borderRadius: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          cursor: item.link ? 'pointer' : 'default'
                        }}
                      >
                        {/* Apply transparent background only for SentimentSatisfiedAltIcon */}
                        {item.icon.type === SentimentSatisfiedAltIcon ? (
                          <Box sx={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                            <PopupState variant="popover" popupId="sentiment-dropdown">
                              {(popupState) => (
                                <React.Fragment>
                                  <IconButton {...bindTrigger(popupState)}>
                                    <SentimentSatisfiedAltIcon color="secondary" />
                                  </IconButton>
                                  <Menu {...bindMenu(popupState)} onClose={popupState.close}>
                                    {auth.user?.role === 'restaurateur' ? (
                                      <>
                                        <MenuItem
                                          onClick={() => {
                                            navigate('/cart');
                                            popupState.close(); // Close the menu after selecting an item
                                          }}
                                        >
                                          Mon Panier
                                        </MenuItem>
                                        <MenuItem
                                          onClick={() => {
                                            navigate('/mes-commandes');
                                            popupState.close();
                                          }}
                                        >
                                          Mes Commandes
                                        </MenuItem>
                                        <MenuItem
                                          onClick={() => {
                                            navigate('/mon-compte');
                                            popupState.close();
                                          }}
                                        >
                                          Mon Compte
                                        </MenuItem>
                                      </>
                                    ) : auth.user?.role === 'producteur' ? (
                                      <>
                                        <MenuItem
                                          onClick={() => {
                                            navigate('/je-depose-mon-potager');
                                            popupState.close(); // Close the menu after selecting an item
                                          }}
                                        >
                                          Ajouter un produit
                                        </MenuItem>
                                        <MenuItem
                                          onClick={() => {
                                            navigate('/mes-produits');
                                            popupState.close();
                                          }}
                                        >
                                          Mes Produits
                                        </MenuItem>
                                        <MenuItem
                                          onClick={() => {
                                            navigate('/mon-compte');
                                            popupState.close();
                                          }}
                                        >
                                          Mon Compte
                                        </MenuItem>
                                      </>
                                    ) : (
                                      // Default case if the role is not restaurateur or producteur
                                      <MenuItem onClick={handleLogout}>
                                        Se déconnecter
                                      </MenuItem>
                                    )}
                                  </Menu>
                                </React.Fragment>
                              )}
                            </PopupState>
                          </Box>
                        ) : null} {/* No icon for other cases */}
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
