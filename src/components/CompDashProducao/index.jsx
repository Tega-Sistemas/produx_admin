import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { formatMinutesToHours, roundToDecimalPlaces } from '../../utils/utils';

export default function Dashboard({ tpFiltro, filtroId, title }) {
  const theme = useTheme();
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/Api/data/dadosproducao?Tpbusca=${tpFiltro}&Filtroid=${filtroId || 0}`)
      .then(response => response.json())
      .then(data => {
        console.log('Dados recebidos da API:', data);
        setChartData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar os dados da API:', error);
        setLoading(false);
      });
  }, [tpFiltro, filtroId]);

  return (
    <TableContainer component={Paper} style={{ backgroundColor: theme.palette.background.default }}>
      <Typography variant="h5" style={{ fontSize: '36px', marginTop: '1rem' }} align='center'>
        <strong>RESUMO DE PRODUÇÃO</strong>
      </Typography>
      <Typography variant="h6" style={{ fontSize: '30px', marginTop: '1rem' }} align='center'>
        <strong>{title}</strong>
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: theme.palette.text.primary, fontSize: '24px' }}>Descrição</TableCell>
              <TableCell style={{ color: theme.palette.text.primary, fontSize: '24px' }}>Valor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell style={{ color: theme.palette.text.primary, fontSize: '24px' }}>Meta dia</TableCell>
              <TableCell style={{ color: theme.palette.text.primary, fontSize: '24px' }}><strong>{roundToDecimalPlaces(chartData.MetaDia, 2)}</strong></TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ color: theme.palette.text.primary, fontSize: '24px' }}>Produção atual</TableCell>
              <TableCell style={{ color: theme.palette.text.primary, fontSize: '24px' }}><strong>{roundToDecimalPlaces(chartData.ProducaoAtual, 2)} {chartData.UnidadeMedida}</strong></TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ backgroundColor: chartData.MetaDiariaAtingida > 100 ? 'green' : chartData.MetaDiariaAtingida > 50 ? '#E7BB28FF' : 'red', color: 'white', fontSize: '24px' }}>
                % Meta diária atingida
              </TableCell>
              <TableCell style={{ backgroundColor: chartData.MetaDiariaAtingida > 100 ? 'green' : chartData.MetaDiariaAtingida > 50 ? '#E7BB28FF' : 'red', color: 'white', fontSize: '24px' }}>
                <strong>{chartData.MetaDiariaAtingida}%</strong>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ color: theme.palette.text.primary, fontSize: '24px' }}>% Faltante da Meta Diária</TableCell>
              <TableCell style={{ color: theme.palette.text.primary, fontSize: '24px' }}><strong>{chartData.FaltanteMetaDiaria}%</strong></TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ color: theme.palette.text.primary, fontSize: '24px' }}>Média/Hora</TableCell>
              <TableCell style={{ color: theme.palette.text.primary, fontSize: '24px' }}><strong>{chartData.MediaProdHora}</strong></TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ color: theme.palette.text.primary, fontSize: '24px' }}>Horas total de trabalho</TableCell>
              <TableCell style={{ color: theme.palette.text.primary, fontSize: '24px' }}>
                <strong>
                  {formatMinutesToHours(chartData.MinutosTrabalhoTotal)}
                </strong>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
}