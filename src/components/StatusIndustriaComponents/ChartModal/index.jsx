import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FullScreenLoader from '../../../components/FullScreenLoader';
import ChartGrid from '../ChartGrid';
import { useStyles } from '../common/styles';

const ChartModal = ({ open, setOpen, onClose, equipmentId, date, equipmentDescription }) => {
    const classes = useStyles();
    const [chartData, setChartData] = useState(null);
    const [modalLoading, setModalLoading] = useState(false);

    useEffect(() => {
        if (!equipmentId || !date) return;

        const fetchChartData = async () => {
            setModalLoading(true);
            try {
                const response = await fetch(
                    `/api/Api/data/equipamentodiadata?Equipamentoid=${equipmentId}&Date=${date}`
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

        fetchChartData();
    }, [equipmentId, date]);

    return (
        <Modal open={open} onClose={onClose} className={classes.modal}>
            <Box className={classes.modalContent} style={{ position: 'relative' }}>
                <IconButton
                    onClick={() => setOpen(null)}
                    style={{
                        position: 'absolute',
                        top: '10px', // Distância do topo do modal
                        right: '10px', // Distância da borda direita do modal
                        zIndex: 10,
                        backgroundColor: '#3A3A3AFF',
                        color: '#fff',
                    }}
                >
                    <CloseIcon />
                </IconButton>

                {modalLoading ? (
                    <FullScreenLoader />
                ) : chartData ? (
                    <>
                        <Typography variant="h6" gutterBottom color="text.primary">
                            Gráficos de {equipmentDescription}
                        </Typography>
                        <div className={classes.chartContainer}>
                            <ChartGrid data={chartData} />
                        </div>
                    </>
                ) : (
                    <Typography variant="body1" color="text.primary">
                        Erro ao carregar dados.
                    </Typography>
                )}
            </Box>
        </Modal>
    );
};

export default ChartModal;