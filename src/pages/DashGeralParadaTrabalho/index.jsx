import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import DashboardParadas from '../../components/CompDashGeralParadaTrabalho';
import DashboardProd from '../../components/CompDashProducao';
import DashboardProdGeral from '../../components/CompDashProducaoGeral';
import FullScreenLoader from '../../components/FullScreenLoader';
import Error from '../../components/Error';
import { Button } from '@mui/material';
import './fade.css';
import './index.css';

export default function App() {
    const [configObj, setConfigObj] = useState([]);
    const [params, setParams] = useState({ data: null });
    const [isRunning, setIsRunning] = useState(true);
    const [timeLeft, setTimeLeft] = useState(10000);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(true);
    const [fadeIn, setFadeIn] = useState(true);
    const [updateKey, setUpdateKey] = useState(0);

    const handlePause = () => {
        setIsRunning(!isRunning);
        if (isRunning) {
            setTimeLeft(10000);
        }
    };

    const handleNext = () => {
        if (configObj.length > 0) {
            setFadeIn(false); // Inicia fade-out
            setTimeout(() => {
                setCurrentIndex(prevIndex => {
                    const nextIndex = (prevIndex + 1) % configObj.length;
                    setParams(prev => ({ ...prev, data: configObj[nextIndex] }));
                    setTitle(configObj[nextIndex].ConfigDashIndustriaDesc);
                    setFadeIn(true); // Ativa fade-in após a troca
                    setUpdateKey(prevKey => prevKey + 1);
                    return nextIndex;
                });
            }, 300);
            setTimeLeft(10000);
        }
    };

    const handlePrevious = () => {
        if (configObj.length > 0) {
            setFadeIn(false);
            setTimeout(() => {
                setCurrentIndex(prevIndex => {
                    const newIndex = (prevIndex - 1 + configObj.length) % configObj.length;
                    setParams(prev => ({ ...prev, data: configObj[newIndex] }));
                    setTitle(configObj[newIndex].ConfigDashIndustriaDesc);
                    setFadeIn(true);
                    setUpdateKey(prevKey => prevKey + 1);
                    return newIndex;
                });
            }, 300);
            setTimeLeft(10000);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetch('/api/Api/data/configdashindustria')
            .then(response => response.json())
            .then(data => {
                console.log(data.configdashindustria)
                setConfigObj(data.configdashindustria || []);
                setCurrentIndex(0);
                if (data.configdashindustria.length > 0) {
                    setParams(prev => ({ ...prev, data: data.configdashindustria[0] }));
                    setTitle(data.configdashindustria[0].ConfigDashIndustriaDesc);
                }
                setTimeout(() => setLoading(false), 300);
            })
            .catch(error => {
                //colocar uma notificação com o erro
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        let interval;

        if (isRunning && timeLeft > 0 && configObj.length > 0) {
            interval = setInterval(() => {
                setTimeLeft(prevTime => {
                    if (prevTime - 1000 <= 0) {
                        handleNext();
                        return 10000;
                    }
                    return prevTime - 1000;
                });
            }, 1000);
        } else if (!isRunning) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isRunning, timeLeft, handleNext]);

    const renderDashboard = () => {
        console.log('params.data.ConfigDashIndustriaTpDash: ', params.data.ConfigDashIndustriaTpDash);

        switch (params.data.ConfigDashIndustriaTpDash) {
            case 'I':
                return <DashboardProd key={currentIndex} tpFiltro={params.data.ConfigDashIndustriaTpFiltro} filtroId={params.data.ConfigDashIndustriaFilterId} title={title.toUpperCase()} />;
            case 'G':
                return <DashboardProdGeral key={currentIndex} tpFiltro={params.data.ConfigDashIndustriaTpFiltro} filtroId={params.data.ConfigDashIndustriaFilterId} title={title.toUpperCase()} />;
            default:
                return <DashboardParadas key={currentIndex} tpFiltro={params.data.ConfigDashIndustriaTpFiltro} filtroId={params.data.ConfigDashIndustriaFilterId} title={title.toUpperCase()} />;
        }
    };

    if (loading) {
        return <FullScreenLoader />;
    }

    if (!loading && configObj.length === 0) {
        return <Error title="Não foi encontrada configuração para o dashboard" message="Verifique as configurações em" />;
    }

    return (

        <div key={updateKey} style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', position: 'relative' }}>
            <CSSTransition in={fadeIn} timeout={800} classNames="fade" unmountOnExit>
                {renderDashboard()}
            </CSSTransition>

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px', position: 'fixed', bottom: '4.2rem', left: '50%', transform: 'translateX(-50%)' }}>
                <Button variant="contained" color="info" onClick={handlePrevious}>Anterior</Button>
                <Button variant="contained" color={isRunning ? "error" : "success"} onClick={handlePause}>
                    {isRunning ? "Pausar" : "Continuar"}
                </Button>
                <Button variant="contained" color="info" onClick={handleNext}>Próximo</Button>
            </div>

            <div className="timer">
                {Math.ceil(timeLeft / 1000)} segundos
            </div>
        </div>
    );
}
