import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import formatMinutesToHours from '../../utils/utils'
import { useTheme, Typography } from '@mui/material';

export default function Dashboard({ tpFiltro, filtroId, title }) {

  const theme = useTheme();

  const [chartData, setChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingParadas, setLoadingParadas] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/Api/data/perctrabalhoparada?Tpbusca=${tpFiltro}&Filtroid=${filtroId || 0}`)
      .then(response => response.json())
      .then(data => {
        const formattedData = data.percTrabalhoParada.map(item => ({
          name: item.TpRegistro,
          value: item.Percentual,
          QtdeEquipamentos: item.QtdeEquipamentos,
          Tempo: item.Tempo,
          TempoMedioEquipamento: item.TempoMedioEquipamento
        }));
        setChartData(formattedData);
        setTimeout(() => setLoading(false), 300);
      })
      .catch(error => {
        console.error('Erro ao buscar os dados da API:', error);
        setLoading(false);
      });
  }, [tpFiltro, filtroId]);

  useEffect(() => {
    setLoadingParadas(true);

    const currentDate = new Date().toISOString().split('T')[0];
    fetch(`/api/Api/data/motivosparadas?Tpbusca=${tpFiltro}&Filtroid=${filtroId}&Inicialdt=${currentDate}&Finaldt=${currentDate}`)
      .then(response => response.json())
      .then(data => {
        const totalMinutes = data.motivosparadas.reduce((sum, item) => sum + (Number(item.Minutos) > 0 ? Number(item.Minutos) : 0), 0);

        const barData = data.motivosparadas
          .filter(item => item.Minutos > 0)
          .map(item => ({
            name: item.MotivoParadaDescricao,
            value: totalMinutes > 0 ? parseFloat(((item.Minutos / totalMinutes) * 100).toFixed(2)) : 0,
            minutes: Math.round(item.Minutos)
          }));

        setBarChartData(barData);
        setTimeout(() => setLoadingParadas(false), 300);
      })
      .catch(error => {
        console.error('Erro ao buscar os dados da API:', error);
        setLoadingParadas(false);
      });
  }, [tpFiltro, filtroId]);

  const options = {
    title: {
      text: 'Percentual de Trabalho x Parado',
      left: 'center',
      textStyle: { color: '#fff' }
    },
    tooltip: {
      trigger: 'item',
      formatter: params => {
        const tempo = typeof params.data.Tempo === 'number' ? formatMinutesToHours(params.data.Tempo) : '0h 0m';
        const tempoMedio = typeof params.data.TempoMedioEquipamento === 'number' ? formatMinutesToHours(params.data.TempoMedioEquipamento) : '0h 0m';
        return `
          <b>${params.name}</b><br/>
          Percentual: ${params.value}%<br/>
          Equipamentos: ${params.data.QtdeEquipamentos}<br/>
          Tempo Total: ${tempo}<br/>
          Tempo Médio/Equip: ${tempoMedio}
        `;
      }
    },
    legend: {
      orient: 'horizontal',
      bottom: 0,
      textStyle: { color: '#fff' }
    },
    series: [
      {
        name: 'Trabalho x Parada',
        type: 'pie',
        radius: '70%',
        data: chartData.map(item => ({
          ...item,
          itemStyle: {
            color: item.name === 'Trabalhado' ? '#348C92FF' : '#AC3C3CFF'
          }
        })),
        label: {
          color: '#fff',
          fontSize: 20,
          formatter: '{b}: {d}%',
          position: 'outside',
          overflow: 'break'
        },
        labelLine: {
          show: true,
          length: 10,
          lineDash: []
        }
      }
    ],
    backgroundColor: '#1e1e1e',
    animation: true,
    animationDuration: 1000,
    animationEasing: 'cubicInOut'
  };

  const barOptions = {
    title: {
      text: 'Paradas',
      left: 'center',
      textStyle: { color: '#fff' }
    },
    tooltip: {
      trigger: 'item',
      formatter: params => {
        const tempo = typeof params.data.Tempo === 'number' ? formatMinutesToHours(params.data.Tempo) : '0h 0m';
        const tempoMedio = typeof params.data.TempoMedioEquipamento === 'number' ? formatMinutesToHours(params.data.TempoMedioEquipamento) : '0h 0m';
        return `
          <b>${params.name}</b><br/>
          Percentual: ${params.value}%<br/>
          Equipamentos: ${params.data.QtdeEquipamentos}<br/>
          Tempo Total: ${tempo}<br/>
          Tempo Médio/Equip: ${tempoMedio}
        `;
      }
    },
    grid: {
      top: '15%',
      bottom: '10%',
      left: '15%',
      right: '5%'
    },
    xAxis: {
      type: 'value',
      axisLabel: { color: '#fff' }
    },
    yAxis: {
      type: 'category',
      data: barChartData.map(item => item.name),
      axisLabel: { color: '#fff', padding: 5 },
      nameGap: 15
    },
    series: [{
      name: 'Minutos',
      type: 'bar',
      // data: barChartData.map(item => { ...item }),
      data: barChartData.map(item => ({
        ...item
      })),
      itemStyle: {
        color: '#773492FF'
      },
      barWidth: '20%',
      label: {
        show: true,
        position: 'bottom',
        color: '#fff',
        fontSize: 16,
        formatter: '{c} %.'
      }
    }],
    backgroundColor: '#1e1e1e',
    animation: true,
    animationDuration: 1000,
    animationEasing: 'cubicInOut'
  };

  const loadingOption = {
    text: 'Carregando...',
    color: theme.palette.primary.main,
    textColor: '#FFFFFF',
    maskColor: theme.palette.primary.main_loading_mask,
    zlevel: 0
  };

  function onChartReady(echarts) {
    setTimeout(function () {
      echarts.hideLoading();
    }, 3000);
  }

  const loadingParadasOption = {
    text: 'Carregando...',
    color: theme.palette.primary.main,
    textColor: '#FFFFFFFF',
    maskColor: theme.palette.primary.main_loading_mask,
    zlevel: 0
  };

  function onChartParadasReady(echarts) {
    setTimeout(function () {
      echarts.hideLoading();
    }, 3000);
  }

  return (
    <>
      <Typography variant="h5" style={{ fontSize: '36px', marginTop: '1rem' }} align='center'>
        <strong>RESUMO DE PARADAS {title}</strong>
      </Typography>
      <div style={{ display: 'flex', height: '100%', width: '100%', gap: '1rem' }}>
        <ReactECharts option={options} style={{ height: '100%', flex: 1 }} onChartReady={onChartReady} loadingOption={loadingOption} showLoading={loading} />
        <ReactECharts option={barOptions} style={{ height: '100%', flex: 1 }} onChartReady={onChartParadasReady} loadingOption={loadingParadasOption} showLoading={loadingParadas} />
      </div>
    </>
  );
}
