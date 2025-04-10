import React from 'react';
import { useTheme } from '@mui/material';

const FullScreenLoader = () => {
    const theme = useTheme();
    const logoSrc = '/Produx.png';

    return (
        <div
            className="loading-container"
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 9999,
            }}
        >
            <img
                src={logoSrc}
                alt="Logo"
                style={{ width: '150px', marginBottom: '20px' }}
            />
            <div
                style={{
                    width: '80%',
                    height: '4px',
                    backgroundColor: '#555',
                    overflow: 'hidden',
                    position: 'relative',
                }}
            >
                <div
                    style={{
                        width: '30%',
                        height: '100%',
                        backgroundColor: theme.palette.primary.main,
                        position: 'absolute',
                        animation: 'loading-bar 1.5s infinite',
                    }}
                />
            </div>
            <style>
                {`
                    @keyframes loading-bar {
                        0% { left: -30%; }
                        50% { left: 50%; }
                        100% { left: 100%; }
                    }
                `}
            </style>
        </div>
    );
};

export default FullScreenLoader;