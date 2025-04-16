import React, { useEffect, useState } from 'react';
import {
    Typography,
    Paper,
    useTheme,
    Grid2,
    Card,
    CardContent,
    useMediaQuery
} from '@mui/material';
import FullScreenLoader from '../../components/FullScreenLoader';
import ItemDetailsModal from '../ItemDetailsModal';

const GridApontamentos = () => {
    const theme = useTheme();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Até 600px
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')); // 600px a 960px

    const fetchData = () => {
        fetch('/api/Api/data/apontamentosabertos')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Erro ao buscar os dados da API:', error))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 5000);
        return () => clearInterval(intervalId);
    }, []);

    const calculateMinutesDifference = (startDate) => {
        const start = new Date(startDate);
        const now = new Date();
        const diffInMs = now - start;
        return Math.floor(diffInMs / (1000 * 60));
    };

    const handleRowClick = (item) => {
        setSelectedItem(item);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedItem(null);
    };

    if (loading) return <FullScreenLoader />;

    const getRowBackgroundColor = (tipo) => {
        switch (tipo) {
            case 'P':
            case 'R':
                return theme.palette.color_pallet.success;
            case 'A':
                return theme.palette.color_pallet.warning;
            default:
                return theme.palette.color_pallet.info;
        }
    };

    const getSecondColumnValue = (item) => {
        return item.OrdemProducaoCodReferencial || item.OrdemProducaoId;
    };

    const getDescription = (item) => {
        if (item.CEPPTipoCEPP === 'P' || item.CEPPTipoCEPP === 'R') {
            return item.OperacoesCEPPDescricao;
        } else if (item.CEPPTipoCEPP === 'A') {
            return item.MotivoParadaDescricao;
        }
        return '-';
    };

    // Layout para Desktop (grade completa)
    const renderGridView = () => (
        <Grid2 container direction="column">
            {/* Cabeçalho */}
            <Grid2
                container
                spacing={0.5} // Reduzido de 1 para 0.5
                sx={{
                    fontWeight: 'bold',
                    borderBottom: `2px solid ${theme.palette.divider}`,
                    backgroundColor: theme.palette.grey[800],
                    color: theme.palette.text.primary,
                    paddingY: 0.5, // Reduzido de 1 para 0.5
                    textAlign: 'center',
                }}
            >
                <Grid2 size={{ xs: 2 }}><Typography variant="subtitle2">ID</Typography></Grid2>
                <Grid2 size={{ xs: 2 }}><Typography variant="subtitle2">Ordem</Typography></Grid2>
                <Grid2 size={{ xs: 2 }}><Typography variant="subtitle2">Descrição</Typography></Grid2>
                <Grid2 size={{ xs: 2 }}><Typography variant="subtitle2">Equipamento</Typography></Grid2>
                <Grid2 size={{ xs: 1 }}><Typography variant="subtitle2">Data Início</Typography></Grid2>
                <Grid2 size={{ xs: 1 }}><Typography variant="subtitle2">Minutos</Typography></Grid2>
                <Grid2 size={{ xs: 1 }}><Typography variant="subtitle2">Qtd. Ordem</Typography></Grid2>
                <Grid2 size={{ xs: 1 }}><Typography variant="subtitle2">Produzido</Typography></Grid2>
            </Grid2>

            {/* Linhas */}
            {data.map((item, index) => (
                <Grid2
                    container
                    spacing={1}
                    key={index}
                    sx={{
                        backgroundColor: getRowBackgroundColor(item.CEPPTipoCEPP),
                        paddingY: 1, // Reduzido de 1 para 0.5
                        borderBottom: index === data.length - 1 ? 'none' : `1px solid ${theme.palette.divider}`,
                        textAlign: 'center',
                        color: theme.palette.getContrastText(getRowBackgroundColor(item.CEPPTipoCEPP)),
                        alignItems: 'center', // Centraliza verticalmente
                        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                        '&:hover': {
                            transform: 'scale(1.01)',
                            boxShadow: `0 4px 8px ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                            border: `1px solid black`,
                            cursor: 'pointer',
                        },
                    }}
                    onClick={() => handleRowClick(item)}
                >
                    <Grid2 size={{ xs: 2 }}>
                        <Typography variant="body2" sx={{ lineHeight: 1.2 }}>{item.CEPPId}</Typography>
                    </Grid2>
                    <Grid2 size={{ xs: 2 }}>
                        <Typography
                            variant="body2"
                            sx={{
                                lineHeight: 1.2,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            {getSecondColumnValue(item)}
                        </Typography>
                    </Grid2>
                    <Grid2 size={{ xs: 2 }}>
                        <Typography
                            variant="body2"
                            sx={{
                                lineHeight: 1.2,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            {getDescription(item)}
                        </Typography>
                    </Grid2>
                    <Grid2 size={{ xs: 2 }}>
                        <Typography
                            variant="body2"
                            sx={{
                                lineHeight: 1.2,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            {item.EquipamentoDescricao}
                        </Typography>
                    </Grid2>
                    <Grid2 size={{ xs: 1 }}>
                        <Typography
                            variant="body2"
                            sx={{
                                lineHeight: 1.2,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            {new Date(item.CEPPDtInicio).toLocaleString()}
                        </Typography>
                    </Grid2>
                    <Grid2 size={{ xs: 1 }}>
                        <Typography variant="body2" sx={{ lineHeight: 1.2 }}>
                            {calculateMinutesDifference(item.CEPPDtInicio)}
                        </Typography>
                    </Grid2>
                    <Grid2 size={{ xs: 1 }}>
                        <Typography variant="body2" sx={{ lineHeight: 1.2 }}>
                            {Math.floor(item.CEPPQtdeOrdem)}
                        </Typography>
                    </Grid2>
                    <Grid2 size={{ xs: 1 }}>
                        <Typography variant="body2" sx={{ lineHeight: 1.2 }}>
                            {item.TotalProduzidoGrid}
                        </Typography>
                    </Grid2>
                </Grid2>
            ))}
        </Grid2>
    );

    // Layout para Tablet (grade compacta)
    const renderTabletView = () => (
        <Grid2 container direction="column">
            {/* Cabeçalho */}
            <Grid2
                container
                spacing={1}
                sx={{
                    fontWeight: 'bold',
                    borderBottom: `2px solid ${theme.palette.divider}`,
                    backgroundColor: theme.palette.grey[800],
                    color: theme.palette.text.primary,
                    paddingY: 1,
                    textAlign: 'center',
                }}
            >
                <Grid2 size={{ xs: 2 }}><Typography variant="subtitle2">ID</Typography></Grid2>
                <Grid2 size={{ xs: 3 }}><Typography variant="subtitle2">Ordem/Descrição</Typography></Grid2>
                <Grid2 size={{ xs: 3 }}><Typography variant="subtitle2">Equipamento</Typography></Grid2>
                <Grid2 size={{ xs: 2 }}><Typography variant="subtitle2">Minutos</Typography></Grid2>
                <Grid2 size={{ xs: 2 }}><Typography variant="subtitle2">Produzido</Typography></Grid2>
            </Grid2>

            {/* Linhas */}
            {data.map((item, index) => (
                <Grid2
                    container
                    spacing={0.5} // Reduzido de 1 para 0.5
                    key={index}
                    sx={{
                        backgroundColor: getRowBackgroundColor(item.CEPPTipoCEPP),
                        paddingY: 0.5, // Reduzido de 1 para 0.5
                        borderBottom: index === data.length - 1 ? 'none' : `1px solid ${theme.palette.divider}`,
                        textAlign: 'center',
                        color: theme.palette.getContrastText(getRowBackgroundColor(item.CEPPTipoCEPP)),
                        alignItems: 'center', // Centraliza verticalmente os itens
                        '&:hover': {
                            transform: 'scale(1.01)',
                            boxShadow: `0 4px 8px ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                            border: `1px solid black`,
                            cursor: 'pointer',
                        },
                    }}
                    onClick={() => handleRowClick(item)}
                >
                    <Grid2 size={{ xs: 2 }}>
                        <Typography variant="body2" sx={{ lineHeight: 1.2 }}>{item.CEPPId}</Typography>
                    </Grid2>
                    <Grid2 size={{ xs: 3 }}>
                        <Typography
                            variant="body2"
                            sx={{
                                lineHeight: 1.2, // Reduz a altura da linha
                                whiteSpace: 'nowrap', // Evita quebras de linha
                                overflow: 'hidden', // Corta texto longo
                                textOverflow: 'ellipsis', // Adiciona "..." em texto cortado
                            }}
                        >
                            {`${getSecondColumnValue(item)} - ${getDescription(item)}`}
                        </Typography>
                    </Grid2>
                    <Grid2 size={{ xs: 3 }}>
                        <Typography
                            variant="body2"
                            sx={{
                                lineHeight: 1.2,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            {item.EquipamentoDescricao}
                        </Typography>
                    </Grid2>
                    <Grid2 size={{ xs: 2 }}>
                        <Typography variant="body2" sx={{ lineHeight: 1.2 }}>
                            {calculateMinutesDifference(item.CEPPDtInicio)}
                        </Typography>
                    </Grid2>
                    <Grid2 size={{ xs: 2 }}>
                        <Typography variant="body2" sx={{ lineHeight: 1.2 }}>
                            {item.TotalProduzidoGrid}
                        </Typography>
                    </Grid2>
                </Grid2>
            ))}
        </Grid2>
    );

    // Layout para Mobile (cartões)
    const renderCardView = () => (
        <Grid2 container spacing={2}>
            {data.map((item, index) => (
                <Grid2 size={{ xs: 12 }} key={index}>
                    <Card
                        sx={{
                            backgroundColor: getRowBackgroundColor(item.CEPPTipoCEPP),
                            color: theme.palette.getContrastText(getRowBackgroundColor(item.CEPPTipoCEPP)),
                            '&:hover': {
                                transform: 'scale(1.02)',
                                boxShadow: `0 4px 8px ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                                cursor: 'pointer',
                            },
                        }}
                        onClick={() => handleRowClick(item)}
                    >
                        <CardContent>
                            <Typography variant="subtitle2">ID: {item.CEPPId}</Typography>
                            <Typography variant="body2">Ordem: {getSecondColumnValue(item)}</Typography>
                            <Typography variant="body2">Descrição: {getDescription(item)}</Typography>
                            <Typography variant="body2">Equipamento: {item.EquipamentoDescricao}</Typography>
                            <Typography variant="body2">Início: {new Date(item.CEPPDtInicio).toLocaleString()}</Typography>
                            <Typography variant="body2">Minutos: {calculateMinutesDifference(item.CEPPDtInicio)}</Typography>
                            <Typography variant="body2">Qtd. Ordem: {Math.floor(item.CEPPQtdeOrdem)}</Typography>
                            <Typography variant="body2">Produzido: {item.TotalProduzidoGrid}</Typography>
                        </CardContent>
                    </Card>
                </Grid2>
            ))}
        </Grid2>
    );

    return (
        <Paper
            elevation={3}
            sx={{
                padding: 2,
                borderRadius: 2,
                backgroundColor: theme.palette.background.paper,
            }}
        >
            <Typography
                variant="h6"
                gutterBottom
                sx={{
                    fontWeight: 'bold',
                    mb: 2,
                    color: theme.palette.text.primary,
                }}
            >
                Apontamentos abertos
            </Typography>

            {isMobile ? renderCardView() : isTablet ? renderTabletView() : renderGridView()}

            <ItemDetailsModal
                open={modalOpen}
                onClose={handleCloseModal}
                item={selectedItem}
            />
        </Paper>
    );
};

export default GridApontamentos;