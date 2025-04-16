import React, { useEffect, useState } from 'react';
import { Typography, Grid2, CardHeader, CardContent, Card as MuiCard, useTheme, styled } from '@mui/material';
import FullScreenLoader from '../../components/FullScreenLoader';
import { makeStyles } from '@mui/styles';
import './index.css';

const StyledCard = styled(MuiCard)(({ theme, statuscolor }) => ({
    backgroundColor: statuscolor,
    width: '100%',
    minHeight: '160px',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box', // Garante que padding/margin não aumentem a largura
    marginBottom: theme.spacing(0.5),
    '& .MuiCardHeader-root': {
        backgroundColor: statuscolor,
        color: theme.palette.getContrastText(statuscolor),
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
        padding: theme.spacing(1), // Reduzido para celular
        boxSizing: 'border-box', // Evita overflow pelo padding
        overflowX: 'hidden', // Garante que não haja rolagem horizontal
    },
}));

function StatusIndustria() {
    const classes = useStyles();
    const theme = useTheme();
    const [stations, setStations] = useState([]);
    const [loading, setLoading] = useState(true);

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
            } finally {
                setLoading(false);
            }
        };

        setLoading(true);
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

    if (loading) {
        return (
            <>
                <h1>Loading...</h1>
                <FullScreenLoader />
            </>
        );
    }

    return (
        <div className='container' style={{ width: '100%', overflowX: 'hidden' }}>
            <Grid2
                container
                className={classes.cardsContainer}
                spacing={1}
            >
                {stations.map((station, index) => (
                    <Grid2
                        key={index}
                        size={{
                            xs: 12, // 1 item por linha no celular
                            sm: 6,  // 2 itens por linha no tablet
                            md: 3,  // 4 itens por linha em tela média
                            lg: 2.4 // 5 itens por linha em tela grande
                        }}
                    >
                        <Card data={station} getStatusColor={getStatusColor} />
                    </Grid2>
                ))}
            </Grid2>
        </div>
    );
}

function Card({ data, getStatusColor }) {
    const statusColor = getStatusColor(data.ControleSituacao);

    return (
        <StyledCard statuscolor={statusColor}>
            <CardHeader
                title={
                    <Typography
                        variant="h6"
                        noWrap
                        title={data.EquipamentoDescricao}
                        style={{
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            wordBreak: 'break-word',
                        }}
                    >
                        {data.EquipamentoDescricao}
                    </Typography>
                }
            />
            <CardContent>
                <Typography
                    variant="body2"
                    title={`Data: ${new Date(data.ControleSituacaoDtAlteracao).toLocaleString()}`}
                    style={{
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        wordBreak: 'break-word',
                    }}
                >
                    Data: {new Date(data.ControleSituacaoDtAlteracao).toLocaleString()}
                </Typography>
                {data.ControleSituacao === 'CG' ? (
                    <Typography
                        variant="body2"
                        title={`Qte. Produzida: ${data.QtdeProduzido} / Peças minuto: ${data.QtdeProduzido}`}
                        style={{
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            wordBreak: 'break-word',
                        }}
                    >
                        Qte. Produzida: {data.QtdeProduzido} / Peças minuto: {data.QtdeProduzido}
                    </Typography>
                ) : (
                    <Typography
                        variant="body2"
                        title={`Motivo: ${data.MotivoParadaDescricao}`}
                        style={{
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            wordBreak: 'break-word',
                        }}
                    >
                        Motivo: {data.MotivoParadaDescricao}
                    </Typography>
                )}
            </CardContent>
        </StyledCard>
    );
}

export default StatusIndustria;