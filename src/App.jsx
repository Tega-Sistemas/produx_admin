import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AppBarComponent from './components/AppBar';
import Footer from './components/Footer'

import HomePage from './pages/home';
import DashGeralParadaTrabalho from './pages/DashGeralParadaTrabalho';
import StatusIndustria from './pages/StatusIndustria';
import DashLinhaPintura from './pages/DashLinhaPintura';

import './App.css';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#041A56',
      main_loading_mask: 'rgb(4 26 86 / 25%)',
    },
    color_pallet: {
      success: "#00A65A",
      success_light: "#90AFA1FF",
      warning: "#F39C12",
      warning_light: "#E9CD9FFF",
      danger: "#DD4B39",
      danger_light: "#D89E95FF",
      info: "#3C8DBC",
      info_light: "#A2C2D6FF",
    },
    background: {
      default: '#313338',
    },
  },
});

function App() {
  const [isMaximized, setIsMaximized] = useState(false);

  const toggleMaximize = () => {
    if (!isMaximized) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsMaximized(!isMaximized);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsMaximized(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBarComponent isMaximized={isMaximized} toggleMaximize={toggleMaximize} />
        <div id='appContainer' style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 5rem)' }}>
          <div id='masterPage' style={{ flex: '1', padding: '16px' }}> {/* Added padding here */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboardprod" element={<DashGeralParadaTrabalho />} />
              <Route path="/statusindustria" element={<StatusIndustria />} />
              <Route path="/dashpintura" element={<DashLinhaPintura />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
