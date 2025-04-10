import React from 'react';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';
import './index.css';

const IndicatorCard = ({ value, percentage, label, backgroundColor, color }) => (
    <Card className="indicator-card" style={{ backgroundColor: color }}>
        <CardContent className="card-content">
            <div className="circle-container">
                <CircularProgress
                    variant="determinate"
                    value={100}
                    size={'5rem'}
                    thickness={5}
                    className="circle-background"
                />
                <CircularProgress
                    variant="determinate"
                    value={percentage}
                    size={'5rem'}
                    thickness={5}
                    className="circle-progress"
                    style={{ color: '#FCFCFC' }}
                />
                <Typography
                    variant="h5"
                    component="div"
                    className="value"
                    fontWeight="bold"
                    style={{ textAlign: 'left', fontSize: '1.5rem' }}
                >
                    {value}
                </Typography>
            </div>
            <Typography
                variant="body2"
                className="label"
                fontWeight="bold"
                style={{ fontSize: '1.2rem', textAlign: 'left' }}
            >
                {label}
            </Typography>
        </CardContent>
    </Card>
);

export default IndicatorCard;