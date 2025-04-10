import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Alert, Paper } from '@mui/material';

const Error = ({ title, message }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: (theme) => theme.palette.background.default,
        padding: 3,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          maxWidth: '90%',
          width: 580,
          textAlign: 'center',
          backgroundColor: (theme) => theme.palette.background.paper,
        }}
      >
        {/* Adicionando a imagem com fundo vermelho escuro */}
        <Box
          sx={{
            width: 140,
            height: 140,
            borderRadius: '50%',
            backgroundColor: (theme) => theme.palette.error.dark,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 3,
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'scale(1.15)',
              boxShadow: (theme) => theme.shadows[6],
            },
          }}
        >
          <Box
            component="img"
            src="/errorRobot.svg"
            alt="Error Robot"
            sx={{
              width: 120,
              height: 120,
              borderRadius: '50%',
            }}
          />
        </Box>
        <Alert severity="error" sx={{ mb: 3 }}>
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
        </Alert>
        <Typography variant="body1" color="textSecondary" sx={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
          {message}
        </Typography>
      </Paper>
    </Box>
  );
};

Error.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default Error;