import FullscreenLoader from '../../components/FullScreenLoader';
import React, { useEffect, useState } from 'react';

const DashLinhaPintura = () => {

    const [url, setURL] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchData = async () => {
            try {
                fetch('/api/Api/data/urldashpintura')
                    .then(response => response.json())
                    .then(data => {
                        setURL(data.URL);
                    })
                    .catch(error => {
                        console.error('Erro ao buscar os dados da API:', error);

                    }).finally(() => {
                        setLoading(false);
                    });

            } catch (error) {

            }
        }

        setLoading(true);
        fetchData();
        setLoading(false);
    }, []);

    if (loading) {
        return (<FullscreenLoader />);
    }

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <iframe
                src={url}
                style={{ width: '100%', height: '100%', border: 'none' }}
                title="Dashboard Linha UV"
            />
        </div>
    );
};

export default DashLinhaPintura;