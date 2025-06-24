import { useEffect, useState } from 'react';
import { Grid2, useTheme } from '@mui/material';
import FullScreenLoader from '../../components/FullScreenLoader';
import Card from '../../components/StatusIndustriaComponents/Card';
import ChartModal from '../../components/StatusIndustriaComponents/ChartModal';
import { useStyles, getStatusColor } from '../../components/StatusIndustriaComponents/common/styles';

function StatusIndustria() {
    const classes = useStyles();
    const theme = useTheme();
    const [stations, setStations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedStation, setSelectedStation] = useState(null);

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

    const handleCardClick = (station) => {
        setSelectedStation(station);
    };

    const handleCloseModal = () => {
        setSelectedStation(null);
    };

    if (loading) {
        return (
            <FullScreenLoader />
        );
    }

    return (
        <div className="container" style={{ width: '100%', overflowX: 'hidden' }}>
            <Grid2 container className={classes.cardsContainer} spacing={1}>
                {stations.map((station, index) => (
                    <Grid2 key={index} size={{ xs: 12, sm: 6, md: 3, lg: 2.4, }} >
                        <Card
                            data={station}
                            getStatusColor={getStatusColor(theme)}
                            onClick={() => handleCardClick(station)}
                        />
                    </Grid2>
                ))}
            </Grid2>

            {selectedStation && (
                <ChartModal
                    open={!!selectedStation}
                    setOpen={setSelectedStation}
                    onClose={handleCloseModal}
                    equipmentId={selectedStation.EquipamentoId}
                    date={new Date().toISOString().split('T')[0]}
                    equipmentDescription={selectedStation.EquipamentoDescricao}
                />
            )}
        </div>
    );
}

export default StatusIndustria;