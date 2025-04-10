import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import formatMinutesToHours from '../../utils/utils';
import FullScreenLoader from '../../components/FullScreenLoader';

export default function Dashboard({ tpFiltro, filtroId, title }) {
  const theme = useTheme();
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/Api/data/dadosproducao?Tpbusca=${tpFiltro}&Filtroid=${filtroId || 0}`)
      .then(response => response.json())
      .then(data => {
        setChartData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar os dados da API:', error);
        setLoading(false);
      });
  }, [tpFiltro, filtroId]);

  if (loading) {
    return <FullScreenLoader />;
}

  return (
    <TableContainer component={Paper} style={{ backgroundColor: theme.palette.background.default, position: 'relative' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: '20px' }}>
        {/* Imagem posicionada absolutamente à esquerda */}
        <img
          src="/LogoEmpresa.png"
          alt="Logo Empresa"
          style={{ position: 'absolute', left: '20px', top: '20px', width: '20rem' }}
        />
        {/* Conteúdo centralizado */}
        <div style={{ textAlign: 'center' }}>
          <Typography variant="h4" style={{ fontSize: '36px' }}>
            DAILY MANUFACTURING PRODUCTIVITY REPORT
          </Typography>
          <Typography variant="h6" style={{ fontSize: '30px', marginTop: '1rem' }}>
            <strong>{title}</strong>
          </Typography>
        </div>

        {/* Restante do conteúdo */}
        <Typography align="center" style={{ fontSize: '24px', marginTop: '1rem' }}>
          HORA ATUAL: {new Date().toLocaleTimeString()}
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Typography align="center" style={{ fontSize: '24px' }}>
              HORAS TRABALHADAS: {formatMinutesToHours(chartData.MinutosTrabalhoTotal)}
            </Typography>
            <Table style={{ marginTop: '2rem' }}>
              <TableHead>
                <TableRow>
                  <TableCell align="center" style={{ color: theme.palette.text.primary, fontSize: '32px', border: '1px solid white', padding: '16px' }}>META DIA</TableCell>
                  <TableCell align="center" style={{ color: theme.palette.text.primary, fontSize: '32px', border: '1px solid white', padding: '16px' }}>PRODUÇÃO ATUAL</TableCell>
                  <TableCell align="center" style={{ color: theme.palette.text.primary, fontSize: '32px', border: '1px solid white', padding: '16px' }}>% META DIÁRIA ATINGIDA</TableCell>
                  <TableCell align="center" style={{ color: theme.palette.text.primary, fontSize: '32px', border: '1px solid white', padding: '16px' }}>% FALTANTE DA META DIÁRIA</TableCell>
                  <TableCell align="center" style={{ color: theme.palette.text.primary, fontSize: '32px', border: '1px solid white', padding: '16px' }}>MÉDIA/HORA</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center" style={{ color: theme.palette.text.primary, fontSize: '32px', border: '1px solid white', padding: '16px' }}>
                    <strong>{chartData.MetaDia}</strong>
                  </TableCell>
                  <TableCell align="center" style={{ color: theme.palette.text.primary, fontSize: '32px', border: '1px solid white', padding: '16px' }}>
                    <strong>{chartData.ProducaoAtual}</strong>
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      backgroundColor: chartData.MetaDiariaAtingida > 100 ? 'green' : chartData.MetaDiariaAtingida > 50 ? '#E7BB28FF' : 'red',
                      color: 'white',
                      fontSize: '32px',
                      border: '1px solid white',
                      padding: '16px'
                    }}
                  >
                    <strong>{chartData.MetaDiariaAtingida}%</strong>
                  </TableCell>
                  <TableCell align="center" style={{ color: theme.palette.text.primary, fontSize: '32px', border: '1px solid white', padding: '16px' }}>
                    <strong>{chartData.FaltanteMetaDiaria}%</strong>
                  </TableCell>
                  <TableCell align="center" style={{ color: theme.palette.text.primary, fontSize: '32px', border: '1px solid white', padding: '16px' }}>
                    <strong>{chartData.MediaProdHora}</strong>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </>
        )}
      </div>
    </TableContainer>
  );
}