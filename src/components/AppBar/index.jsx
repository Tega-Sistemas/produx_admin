import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import './index.css';

const AppBarComponent = ({ isMaximized, toggleMaximize }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [animatingButton, setAnimatingButton] = useState(null);
  const [URL, setURL] = useState('');

  useEffect(() => {

    const fetchData = async () => {
      try {
        fetch('/api/Api/data/urldashpintura')
          .then(response => response.json())
          .then(data => {
            console.log(data.URL);
            setURL(data.URL);
          })
          .catch(error => {
            console.error('Erro ao buscar os dados da API:', error);

          }).finally(() => {
            // setLoading(false);
          });

      } catch (error) {

      }
    }

    // setLoading(true);
    fetchData();
  }, []);

  const handleMenuClick = (event) => {
    setAnimatingButton('profile');
    setTimeout(() => {
      setAnchorEl(event.currentTarget);
      setAnimatingButton(null);
    }, 100);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setAnimatingButton(mobileOpen ? 'close' : 'menu');
    setTimeout(() => {
      setMobileOpen(!mobileOpen);
      setAnimatingButton(null);
    }, 100);
  };

  const handleNavClick = (label) => {
    setAnimatingButton(label);
    setTimeout(() => setAnimatingButton(null), 300);
  };

  const handleMaximizeClick = () => {
    setAnimatingButton('maximize');
    setTimeout(() => {
      toggleMaximize();
      setAnimatingButton(null);
    }, 100);
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Dashboard', path: '/dashboardprod' },
    { label: 'Status da Industria', path: '/statusindustria' },
    { label: 'Status do Lote', path: '/statusloteprod' },
  ];

  if (URL) {
    navItems.push({ label: 'Dash (Linha UV)', path: '/dashpintura' });
  }

  const drawer = (
    <Box sx={{ textAlign: 'center', bgcolor: theme.palette.background.paper, height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
        <IconButton
          onClick={handleDrawerToggle}
          sx={{ color: theme.palette.text.primary }}
          className={animatingButton === 'close' ? 'rotate' : ''}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.label}
            component={Link}
            to={item.path}
            onClick={() => {
              handleDrawerToggle();
              handleNavClick(item.label);
            }}
            sx={{ color: theme.palette.text.primary }}
            className={animatingButton === item.label ? 'scale' : ''}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {!isMaximized && (
        <AppBar
          position="static"
          className="appbar"
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          }}
        >
          <Toolbar>
            <img
              src="/Produx.png"
              alt="Logo"
              style={{ marginRight: 16, maxWidth: isMobile ? '10rem' : '15rem' }}
            />
            {isMobile ? (
              <>
                <Box sx={{ flexGrow: 1 }} />
                <IconButton
                  color="inherit"
                  edge="start"
                  onClick={handleDrawerToggle}
                  className={animatingButton === 'menu' ? 'rotate' : ''}
                >
                  <MenuIcon />
                </IconButton>
              </>
            ) : (
              <>
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    color="inherit"
                    component={Link}
                    to={item.path}
                    onClick={() => handleNavClick(item.label)}
                    sx={{ color: theme.palette.primary.contrastText }}
                    className={animatingButton === item.label ? 'scale' : ''}
                  >
                    {item.label}
                  </Button>
                ))}
                <Box sx={{ flexGrow: 1 }} />
              </>
            )}
            <Box>
              {!isMobile && (
                <Button
                  color="inherit"
                  onClick={handleMaximizeClick}
                  sx={{ color: theme.palette.primary.contrastText }}
                  className={animatingButton === 'maximize' ? 'rotate' : ''}
                >
                  <FullscreenIcon />
                </Button>
              )}
              <Button
                color="inherit"
                onClick={handleMenuClick}
                sx={{ color: theme.palette.primary.contrastText }}
                className={animatingButton === 'profile' ? 'rotate' : ''}
              >
                <AccountCircleIcon />
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                  sx: {
                    bgcolor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                  },
                }}
              >
                <MenuItem onClick={handleClose}>Configurações</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
      )}
      {isMaximized && (
        <Box
          sx={{
            position: 'absolute',
            top: 10,
            left: 10,
            right: 10,
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box sx={{ marginLeft: 'auto' }}>
            <Button
              sx={{
                color: theme.palette.primary.contrastText,
                bgcolor: theme.palette.primary.main,
                ':hover': { bgcolor: theme.palette.primary.dark },
              }}
              onClick={handleMaximizeClick}
              className={animatingButton === 'maximize' ? 'rotate' : ''}
            >
              <FullscreenExitIcon />
            </Button>
          </Box>
        </Box>
      )}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { width: '250px' } }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default AppBarComponent;