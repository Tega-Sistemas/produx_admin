import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, Button, Grid, CardHeader, CardContent, Card as MuiCard, useTheme, styled } from '@mui/material';
import { makeStyles } from '@mui/styles';
import './index.css';

const StyledCard = styled(MuiCard)(({ theme, statuscolor }) => ({
    backgroundColor: statuscolor,
    width: '100%',
    minHeight: '150px', // Minimum height to ensure consistency
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(2),
    '& .MuiCardHeader-root': {
        backgroundColor: statuscolor,
        color: theme.palette.getContrastText(statuscolor), // Ensures readable text
        padding: theme.spacing(1.5),
    },
    '& .MuiCardContent-root': {
        flexGrow: 1,
        padding: theme.spacing(2),
        color: theme.palette.getContrastText(statuscolor),
    },
}));

const useStyles = makeStyles((theme) => ({
    cardsContainer: {
        width: '100%',
        padding: theme.spacing(2),
    },
}));

function StatusIndustria() {
    const classes = useStyles();
    const theme = useTheme();
    const [stations, setStations] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/Api/data/statusindustria');
                const data = await response.json();

                const sortedData = data.SituacaoEstacoes.sort((a, b) => {
                    return new Date(b.ControleSituacaoDtAlteracao) - new Date(a.ControleSituacaoDtAlteracao);
                });

                setStations(sortedData);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData();

        const intervalId = setInterval(fetchData, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'CY':
                return theme.palette.color_pallet.warning;
            case 'CR':
                return theme.palette.color_pallet.danger;
            case 'CG':
                return theme.palette.color_pallet.success;
            default:
                return theme.palette.color_pallet.info;
        }
    };

    return (
        <div className='container'>
            <Grid
                container
                className={classes.cardsContainer}
                spacing={2}
                justifyContent="center"
            >
                {stations.map((station, index) => (
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        xl={2.4}
                        key={index}
                    >
                        <Card data={station} getStatusColor={getStatusColor} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

function Card({ data, getStatusColor }) {
    const statusColor = getStatusColor(data.ControleSituacao);

    return (
        <StyledCard statuscolor={statusColor}>
            <CardHeader
                title={data.EquipamentoDescricao}
                titleTypographyProps={{ variant: 'h6' }}
            />
            <CardContent>
                <Typography variant="body2">
                    Data: {new Date(data.ControleSituacaoDtAlteracao).toLocaleString()}
                </Typography>
                {data.ControleSituacao === 'CG' ? (
                    <Typography variant="body2">
                        Qte. Produzida: {data.QtdeProduzido} / Peças minuto: {data.QtdeProduzido}
                    </Typography>
                ) : (
                    <Typography variant="body2">
                        Motivo: {data.MotivoParadaDescricao}
                    </Typography>
                )}
            </CardContent>
        </StyledCard>
    );
}

export default StatusIndustria;