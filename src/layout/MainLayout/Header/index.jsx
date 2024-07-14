import React, { useState } from 'react';
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
import { Link } from 'react-router-dom';
import fondora from 'assets/images/fond-orange.png'; // Import the background image

const menuItems = [
    { name: 'Je suis Producteur', link: '/', icon: <HomeIcon color="primary" /> }
];

const Header = () => {
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const drawerContent = (
        <Box
            sx={{
                width: 150
            }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List color="white">
                {menuItems.map((item, index) => (
                    <ListItem button key={item.name + index}>
                        <ListItemText>
                            <Link
                                to={item.link}
                                style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}
                            >
                                {item.icon}
                                <Typography variant="h6" sx={{ marginLeft: '10px', color: '#FC8A1A' }}>
                                    {item.name}
                                </Typography>
                            </Link>
                        </ListItemText>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <>
            <AppBar position="static" sx={{ backgroundImage: `url(${fondora})`, backgroundSize: 'cover' }}>
                <Container maxWidth="lg">
                    <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Button component={Link} to="/" sx={{ p: 0 }}>
                                <img
                                    src={logoSrc}
                                    alt="Logo"
                                    style={{
                                        maxHeight: '30px',
                                        width: 'auto',
                                        height: '30px'
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
                                            component={Link}
                                            to={item.link}
                                            sx={{
                                                textDecoration: 'none',
                                                backgroundColor: '#F5F5DC',
                                                padding: '0.5rem 1rem',
                                                marginRight: '1rem',
                                                borderRadius: '10px',
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}                                            
                                        >
                                            <Typography variant="h6" sx={{ color: '#FC8A1A' }}>
                                                {item.name}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                                <Button sx={{ color: 'white' }} size="large" component="a" href="#">
                                    Se connecter
                                </Button>
                            </Box>
                        ) : (
                            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                                <MenuIcon />
                            </IconButton>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>
            {!isLargeScreen && (
                <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                    {drawerContent}
                </Drawer>
            )}
        </>
    );
};

export default Header;
