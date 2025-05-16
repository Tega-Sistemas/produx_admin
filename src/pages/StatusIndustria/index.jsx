import React, { useEffect, useState } from 'react';
import {
    Typography,
    Grid2,
    CardHeader,
    CardContent,
    Card as MuiCard,
    useTheme,
    styled,
    Modal,
    Box,
    LinearProgress,
} from '@mui/material';
import FullScreenLoader from '../../components/FullScreenLoader';
import { makeStyles } from '@mui/styles';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import 'echarts-liquidfill';
import './index.css';

const StyledCard = styled(MuiCard)(({ theme, statuscolor }) => ({
    backgroundColor: statuscolor,
    width: '100%',
    minHeight: '160px',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
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
    cursor: 'pointer',
}));

const WorkedMinutesCard = styled(MuiCard)(({ theme }) => ({
    backgroundColor: '#212121',
    width: '100%',
    minHeight: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[5],
    color: '#ffffff',
}));

const useStyles = makeStyles((theme) => ({
    cardsContainer: {
        width: '100%',
        padding: theme.spacing(1),
        boxSizing: 'border-box',
        overflowX: 'hidden',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContent: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4),
        width: '90%',
        maxWidth: '1200px',
        height: '80vh',
        borderRadius: theme.shape.borderRadius,
        overflowY: 'auto',
        position: 'relative',
    },
    chartContainer: {
        width: '100%',
        height: '100%',
    },
}));

function StatusIndustria() {
    const classes = useStyles();
    const theme = useTheme();
    const [stations, setStations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedStation, setSelectedStation] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [modalLoading, setModalLoading] = useState(false);

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

    const handleCardClick = async (station) => {
        setSelectedStation(station);
        setModalLoading(true);
        try {
            const today = new Date().toISOString().split('T')[0];
            const response = await fetch(
                `/api/Api/data/equipamentodiadata?Equipamentoid=${station.EquipamentoId}&Date=${today}`
            );
            const data = await response.json();
            setChartData(data);
        } catch (error) {
            console.error('Erro ao buscar dados do equipamento:', error);
            setChartData(null);
        } finally {
            setModalLoading(false);
        }
    };

    const handleCloseModal = () => {
        setSelectedStation(null);
        setChartData(null);
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
        <div className="container" style={{ width: '100%', overflowX: 'hidden' }}>
            <Grid2 container className={classes.cardsContainer} spacing={1}>
                {stations.map((station, index) => (
                    <Grid2
                        key={index}
                        size={{
                            xs: 12,
                            sm: 6,
                            md: 3,
                            lg: 2.4,
                        }}
                    >
                        <Card data={station} getStatusColor={getStatusColor} onClick={() => handleCardClick(station)} />
                    </Grid2>
                ))}
            </Grid2>

            <Modal open={!!selectedStation} onClose={handleCloseModal} className={classes.modal}>
                <Box className={classes.modalContent}>
                    {modalLoading ? (
                        <FullScreenLoader />
                    ) : chartData ? (
                        <>
                            <Typography variant="h6" gutterBottom color="text.primary">
                                Gráficos de {selectedStation?.EquipamentoDescricao}
                            </Typography>
                            <div className={classes.chartContainer}>
                                <EChartsComponent data={chartData} />
                            </div>
                        </>
                    ) : (
                        <Typography variant="body1" color="text.primary">
                            Erro ao carregar dados.
                        </Typography>
                    )}
                </Box>
            </Modal>
        </div>
    );
}

function Card({ data, getStatusColor, onClick }) {
    const statusColor = getStatusColor(data.ControleSituacao);

    return (
        <StyledCard statuscolor={statusColor} onClick={onClick}>
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

function WorkedMinutesCardComponent({ minutes }) {
    const percentage = ((minutes / 480) * 100).toFixed(2);

    return (
        <WorkedMinutesCard>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: '500' }}>
                Minutos Trabalhados
            </Typography>
            <Typography variant="h4" sx={{ mb: 2 }}>
                {parseFloat(minutes).toFixed(2)} min
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
                {percentage}% do turno (8h)
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
}

function EChartsComponent({ data }) {
    const theme = useTheme();

    // Base chart configuration for dark theme
    const baseChartConfig = {
        backgroundColor: 'transparent',
        textStyle: {
            color: '#ffffff',
            fontFamily: 'Roboto, sans-serif',
        },
        title: {
            textStyle: {
                color: '#ffffff',
                fontSize: 16,
                fontWeight: '500',
            },
            left: 'center',
            top: 10,
        },
        tooltip: {
            backgroundColor: 'rgba(33, 33, 33, 0.9)',
            textStyle: {
                color: '#ffffff',
                fontSize: 12,
            },
            borderColor: '#ffffff',
            borderWidth: 1,
            confine: true,
            extraCssText: 'z-index: 1005; border-radius: 4px; padding: 8px;',
            formatter: (params) => {
                const value = params.value || params.data?.value || params.data;
                return `${params.seriesName || params.name}: ${parseFloat(value).toFixed(2)}`;
            },
        },
        animation: true,
        animationDuration: 1000,
    };

    // Gauge chart for Efficiency (fixed)
    const efficiencyOption = {
        ...baseChartConfig,
        title: { text: 'Eficiência' },
        series: [
            {
                type: 'gauge',
                min: 0,
                max: 100,
                progress: { show: true, width: 18 },
                axisLine: {
                    lineStyle: {
                        width: 18,
                        color: [
                            [0.3, '#ef5350'], // Red for 0-30%
                            [0.7, '#ffca28'], // Yellow for 30-70%
                            [1, '#66bb6a'],   // Green for 70-100%
                        ],
                    },
                },
                axisTick: { show: false },
                splitLine: { show: false },
                axisLabel: { distance: 15, color: '#ffffff', fontSize: 12 },
                anchor: {
                    show: true,
                    size: 20,
                    itemStyle: { color: '#ffffff', borderColor: '#424242', borderWidth: 2 },
                },
                pointer: { width: 8, length: '70%' },
                title: { show: false },
                detail: {
                    valueAnimation: true,
                    fontSize: 20,
                    color: '#ffffff',
                    offsetCenter: [0, '70%'],
                    formatter: '{value}%',
                },
                data: [{ value: parseFloat(data.Eficiencia).toFixed(2) }],
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#42a5f5' },
                        { offset: 1, color: '#1976d2' },
                    ]),
                },
            },
        ],
    };

    // Gauge chart for OEE
    const oeeOption = {
        ...baseChartConfig,
        title: { text: 'OEE' },
        series: [
            {
                type: 'gauge',
                min: 0,
                max: 100,
                progress: { show: true, width: 18 },
                axisLine: {
                    lineStyle: {
                        width: 18,
                        color: [
                            [0.3, '#ef5350'],
                            [0.7, '#ffca28'],
                            [1, '#66bb6a'],
                        ],
                    },
                },
                axisTick: { show: false },
                splitLine: { show: false },
                axisLabel: { distance: 15, color: '#ffffff', fontSize: 12 },
                anchor: {
                    show: true,
                    size: 20,
                    itemStyle: { color: '#ffffff', borderColor: '#424242', borderWidth: 2 },
                },
                pointer: { width: 8, length: '70%' },
                title: { show: false },
                detail: {
                    valueAnimation: true,
                    fontSize: 20,
                    color: '#ffffff',
                    offsetCenter: [0, '70%'],
                    formatter: '{value}%',
                },
                data: [{ value: parseFloat(data.OEE).toFixed(2) }],
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#ab47bc' },
                        { offset: 1, color: '#7b1fa2' },
                    ]),
                },
            },
        ],
    };

    // Stacked bar chart for Downtime and Rework
    const downtimeReworkOption = {
        ...baseChartConfig,
        title: { text: 'Paradas e Retrabalho' },
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
            formatter: (params) => {
                return params.map(p => `${p.seriesName}: ${parseFloat(p.data).toFixed(2)}%`).join('<br/>');
            },
        },
        legend: {
            data: ['Paradas', 'Retrabalho'],
            textStyle: { color: '#ffffff', fontSize: 12 },
            top: 40,
        },
        xAxis: {
            type: 'category',
            data: ['Status'],
            axisLabel: { color: '#ffffff', fontSize: 12 },
            axisLine: { lineStyle: { color: '#ffffff' } },
        },
        yAxis: {
            type: 'value',
            axisLabel: { color: '#ffffff', fontSize: 12, formatter: '{value}%' },
            axisLine: { lineStyle: { color: '#ffffff' } },
            splitLine: { lineStyle: { color: '#424242' } },
        },
        series: [
            {
                name: 'Paradas',
                type: 'bar',
                stack: 'total',
                data: [parseFloat(data.PercParadas).toFixed(2)],
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#ef5350' },
                        { offset: 1, color: '#d32f2f' },
                    ]),
                },
                barWidth: '20%',
            },
            {
                name: 'Retrabalho',
                type: 'bar',
                stack: 'total',
                data: [parseFloat(data.PercRetrabalho).toFixed(2)],
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#ffee58' },
                        { offset: 1, color: '#fbc02d' },
                    ]),
                },
                barWidth: '20%',
            },
        ],
    };

    // Liquid fill chart for Daily Production and Volumes
    const productionOption = {
        ...baseChartConfig,
        title: { text: 'Produção do Dia' },
        series: [
            {
                type: 'liquidFill',
                data: [
                    parseFloat(data.ProducaoDia) / (parseFloat(data.ProducaoVolumes) || 1),
                ],
                radius: '70%',
                center: ['50%', '50%'],
                color: [
                    new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#66bb6a' },
                        { offset: 1, color: '#388e3c' },
                    ]),
                ],
                backgroundStyle: {
                    borderColor: '#ffffff',
                    borderWidth: 1,
                    color: '#212121',
                },
                outline: {
                    show: true,
                    borderDistance: 5,
                    itemStyle: {
                        borderColor: '#424242',
                        borderWidth: 2,
                    },
                },
                label: {
                    fontSize: 20,
                    color: '#ffffff',
                    formatter: () => {
                        const percentage = (
                            (parseFloat(data.ProducaoDia) / (parseFloat(data.ProducaoVolumes) || 1)) * 100
                        ).toFixed(2);
                        return `${parseFloat(data.ProducaoDia).toFixed(2)} / ${parseFloat(
                            data.ProducaoVolumes
                        ).toFixed(2)}\n${percentage}%`;
                    },
                },
                waveAnimation: true,
                amplitude: 10,
                animationDuration: 2000,
            },
        ],
    };

    return (
        <Grid2
            container
            spacing={2}
            sx={{
                minHeight: '100%',
                padding: '16px',
            }}
        >
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: 'flex', justifyContent: 'center' }}>
                <ReactECharts option={efficiencyOption} style={{ height: '300px', width: '100%' }} />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: 'flex', justifyContent: 'center' }}>
                <ReactECharts option={oeeOption} style={{ height: '300px', width: '100%' }} />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: 'flex', justifyContent: 'center' }}>
                <ReactECharts option={downtimeReworkOption} style={{ height: '300px', width: '100%' }} />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 6 }} sx={{ display: 'flex', justifyContent: 'center' }}>
                <ReactECharts option={productionOption} style={{ height: '300px', width: '100%' }} />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 6 }} sx={{ display: 'flex', justifyContent: 'center' }}>
                <WorkedMinutesCardComponent minutes={parseFloat(data.QtdeMinutos)} />
            </Grid2>
        </Grid2>
    );
}

export default StatusIndustria;