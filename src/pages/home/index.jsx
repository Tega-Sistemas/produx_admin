import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material';
//import FullScreenLoader from '../../components/FullScreenLoader';
import IndicatorCard from '../../components/IndicatorCard';
import GridApontamentos from '../../components/GridApontamentosAbertos';

const HomePage = () => {
    const theme = useTheme();

    const [data, setData] = useState({});
    const [totalEquipamentos, setTotalEquipamentos] = useState({});
    const [percentages, setPercentages] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/Api/data/statusgeralindustria');
                const result = await response.json();
                setData(result);
                setTotalEquipamentos(parseInt(result.TotalEquipamentos) || 0);
                setPercentages({
                    "Amarelo": (parseInt(data.Amarelo) / totalEquipamentos) * 100 || 0,
                    "NaoOperado": (parseInt(data.NaoOperado) / totalEquipamentos) * 100 || 0,
                    "Trabalhando": (parseInt(data.Trabalhando) / totalEquipamentos) * 100 || 0,
                    "Vermelho": (parseInt(data.Vermelho) / totalEquipamentos) * 100 || 0,
                });
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // if (loading) {
    //     //return <FullScreenLoader />;
    // }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '20px', marginBottom: '20px' }}>
            <div className="cards-container">
                <IndicatorCard value={data.Trabalhando} percentage={percentages.Trabalhando} label="Verde" backgroundColor={theme.palette.color_pallet.success_light} color={theme.palette.color_pallet.success} />
                <IndicatorCard value={data.Amarelo} percentage={percentages.Amarelo} label="Amarelo" backgroundColor={theme.palette.color_pallet.warning_light} color={theme.palette.color_pallet.warning} />
                <IndicatorCard value={data.Vermelho} percentage={percentages.Vermelho} label="Vermelho" backgroundColor={theme.palette.color_pallet.danger_light} color={theme.palette.color_pallet.danger} />
                <IndicatorCard value={data.NaoOperado} percentage={percentages.NaoOperado} label="Não Operados" backgroundColor={theme.palette.color_pallet.info_light} color={theme.palette.color_pallet.info} />
            </div>
            <div style={{ flexGrow: 1 }}>
                <GridApontamentos />
            </div>
        </div>
    );
};

export default HomePage;