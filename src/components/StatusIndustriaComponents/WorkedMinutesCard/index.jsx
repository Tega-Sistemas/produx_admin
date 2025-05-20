import React from 'react';
import { Typography, Box, LinearProgress } from '@mui/material';
import { WorkedMinutesCard } from '../common/styles';
import { convertCentennialMinutesToHours } from '../../../utils/utils';

const WorkedMinutesCardComponent = ({ minutes, turnMinutes }) => {
    const percentage = ((minutes / turnMinutes) * 100).toFixed(2);

    return (
        <WorkedMinutesCard>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: '500' }}>
                Horas Trabalhadas
            </Typography>
            <Typography variant="h4" sx={{ mb: 2 }}>
                {convertCentennialMinutesToHours(minutes)}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
                {percentage}% do turno ({convertCentennialMinutesToHours(turnMinutes)})
            </Typography>
            <Box sx={{ width: '80%', maxWidth: '300px' }}>
                <LinearProgress
                    variant="determinate"
                    value={Math.min(percentage, 100)}
                    sx={{
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: '#424242',
                        '& .MuiLinearProgress-bar': {
                            background: 'linear-gradient(90deg, #26c6da, #0097a7)',
                        },
                    }}
                />
            </Box>
        </WorkedMinutesCard>
    );
};

export default WorkedMinutesCardComponent;