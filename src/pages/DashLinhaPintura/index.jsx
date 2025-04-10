// import { FullscreenLoader } from '../../components/FullscreenLoader';
import React, { useEffect, useState } from 'react';

const DashLinhaPintura = () => {

    // const [url, setURL] = useState('');
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {

    //     const fetchData = async () => {
    //         try {
    //             fetch('/api/Api/data/apontamentosabertos')
    //                 .then(response => response.json())
    //                 .then(data => {
    //                     setURL(data.url);
    //                 })
    //                 .catch(error => {
    //                     console.error('Erro ao buscar os dados da API:', error);

    //                 }).finally(() => {
    //                     setLoading(false);
    //                 });

    //         } catch (error) {

    //         }
    //     }

    //     setLoading(true);
    //     fetchData();
    //     setLoading(false);
    // }, []);

    // if (loading) {
    //     return (<FullscreenLoader />);
    // }

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <iframe
                src="http://192.168.100.70:8501"
                style={{ width: '100%', height: '100%', border: 'none' }}
                title="DashLinhaPintura"
            />
        </div>
    );
};

export default DashLinhaPintura;