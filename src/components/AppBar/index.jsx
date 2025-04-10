import React, { useState } from 'react';
import { AppBar, Toolbar, Button, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import './index.css';

const AppBarComponent = ({ isMaximized, toggleMaximize }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {!isMaximized && (
        <AppBar position="static" className='appbar' style={{ backgroundColor: theme.palette.primary.main }}>
          <Toolbar>
            <img src={`${process.env.PUBLIC_URL}/Produx.png`} alt="Logo" style={{ marginRight: 16, maxWidth: '15rem' }} />
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/dashboardprod">Dashboard</Button>
            <Button color="inherit" component={Link} to="/statusindustria">Status da Industria</Button>
            <Button color="inherit" component={Link} to="/dashpintura">Dash (Linha UV)</Button>
            <div style={{ marginLeft: 'auto' }}>
              <Button color="inherit" onClick={toggleMaximize}>
                <FullscreenIcon />
              </Button>
              <Button color="inherit" onClick={handleMenuClick}>
                <AccountCircleIcon />
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Configurações</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      )}
      {isMaximized && (
        <div style={{ position: 'absolute', top: 10, left: 10, right: 10, zIndex: 1000, display: 'flex', alignItems: 'center' }}>
          {/* <img src={`${process.env.PUBLIC_URL}/LogoEmpresa.png`} alt="Logo Empresa" style={{ height: '5rem' }} /> */}
          <div style={{ marginLeft: 'auto' }}>
            <Button color="inherit" onClick={toggleMaximize}>
              <FullscreenExitIcon />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default AppBarComponent;