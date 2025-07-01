import React from 'react';
import './index.css';
import { useTheme } from '@mui/material/styles';

const Footer = () => {
    const theme = useTheme();

    return (
        <div className="footer" style={{ backgroundColor: theme.palette.primary.main, position: 'fixed', bottom: 0, left: 0, width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
            <img src={"/TegaSistemas.png"} alt="Tega Sistemas" />
        </div>
    );
};

export default Footer;