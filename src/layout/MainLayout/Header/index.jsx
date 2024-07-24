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
import AgricultureIcon from '@mui/icons-material/Agriculture';
import { Link } from 'react-router-dom';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';

const menuItems = [
    { name: 'Je suis Producteur', link: '/', icon: <AgricultureIcon color="primary" /> },
    { name: 'Se Connecter', link: '/', icon: <HomeIcon color="primary" /> }
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

const Header = (props) => {
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
                width: '30vw', // 30% of the screen width
                maxWidth: 300, // Maximum width
            }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
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
                                                    backgroundColor: item.name === 'Se Connecter' ? 'transparent' : '#F5F5DC',
                                                    padding: '0.5rem 1rem',
                                                    marginRight: '1rem',
                                                    borderRadius: '10px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Typography variant="h6" sx={{ color: item.name === 'Se Connecter' ? '#FFF4E2' : '#FC8A1A' }}>
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
