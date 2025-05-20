import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import FullScreenLoader from '../../../components/FullScreenLoader';
import ChartGrid from '../ChartGrid';
import { useStyles } from '../common/styles';
import html2canvas from 'html2canvas';
import { CameraAlt, Close } from '@mui/icons-material';

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

    const handleCapture = async () => {
        const modalContent = document.getElementById('modal-content-to-capture');
        // Esconde os botões
        const buttons = modalContent.querySelectorAll('.modal-action-btn');
        buttons.forEach(btn => btn.style.display = 'none');

        // Captura a imagem
        const canvas = await html2canvas(modalContent);
        const imgData = canvas.toDataURL('image/png');

        // Mostra os botões novamente
        buttons.forEach(btn => btn.style.display = '');

        // Cria um link temporário para download
        const link = document.createElement('a');
        link.href = imgData;
        const now = new Date();
        const timestamp = `${now.getDate()}_${now.getMonth() + 1}_${now.getFullYear()}_${now.getHours()}_${now.getMinutes()}_${now.getSeconds()}`;
        link.download = `grafico_${equipmentId}_${timestamp}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Modal open={open} onClose={onClose} className={classes.modal}>
            <Box
                id="modal-content-to-capture"
                className={classes.modalContent}
                style={{ position: 'relative' }}
            >
                <IconButton
                    className="modal-action-btn"
                    onClick={() => setOpen(null)}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        zIndex: 10,
                        backgroundColor: '#3A3A3AFF',
                        color: '#fff',
                    }}
                >
                    <Close />
                </IconButton>

                <IconButton
                    className="modal-action-btn"
                    onClick={handleCapture}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '60px',
                        zIndex: 10,
                        backgroundColor: '#3A3A3AFF',
                        color: '#fff',
                    }}
                >
                    <CameraAlt />
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