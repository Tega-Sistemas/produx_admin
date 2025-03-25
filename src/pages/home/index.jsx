import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, CircularProgress, useTheme } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    const theme = useTheme();
    // const navigate = useNavigate();
    
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/Api/data/statusgeralindustria');
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData();
    }, []);
    
    const totalEquipamentos = parseInt(data.TotalEquipamentos) || 0;
    const percentages = {
        "Amarelo": (parseInt(data.Amarelo) / totalEquipamentos) * 100 || 0,
        "NaoOperado": (parseInt(data.NaoOperado) / totalEquipamentos) * 100 || 0,
        "Trabalhando": (parseInt(data.Trabalhando) / totalEquipamentos) * 100 || 0,
        "Vermelho": (parseInt(data.Vermelho) / totalEquipamentos) * 100 || 0,
    };

    const IndicatorCard = ({ value, percentage, label, backgroundColor, color }) => (
        // onClick={handleCardClick}
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
                    <Typography variant="h5" component="div" className="value" fontWeight='bold' style={{ textAlign: 'left', fontSize: '1.5rem' }}>
                        {value}
                    </Typography>
                </div>
                <Typography variant="body2" className="label" fontWeight='bold' style={{fontSize:'1.2rem', textAlign:'left'}}>
                    {label}
                </Typography>
            </CardContent>
        </Card>
    );

    return (
        <div className="cards-container" style={{ width: '100%', height: '100px' }}>
            <IndicatorCard value={data.Trabalhando} percentage={percentages.Trabalhando} label="Verde" backgroundColor={theme.palette.color_pallet.success_light} color={theme.palette.color_pallet.success} />
            <IndicatorCard value={data.Amarelo} percentage={percentages.Amarelo} label="Amarelo" backgroundColor={theme.palette.color_pallet.warning_light} color={theme.palette.color_pallet.warning} />
            <IndicatorCard value={data.Vermelho} percentage={percentages.Vermelho} label="Vermelho" backgroundColor={theme.palette.color_pallet.danger_light} color={theme.palette.color_pallet.danger} />
            <IndicatorCard value={data.NaoOperado} percentage={percentages.NaoOperado} label="Não Operados" backgroundColor={theme.palette.color_pallet.info_light} color={theme.palette.color_pallet.info} />
        </div>
    );
};

export default HomePage;