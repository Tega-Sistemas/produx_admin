import React from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { baseChartConfig } from '../common/styles';

const ParadaRetrabalhoChart = ({ data }) => {
    const downtimeReworkOption = {
        ...baseChartConfig,
        title: { text: 'Paradas e Retrabalho', textStyle: { color: '#ffffff' } },
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
            formatter: (params) => {
                return params.map(p => `${p.seriesName}: ${parseFloat(p.data).toFixed(2)}%`).join('<br/>');
            },
        },
        legend: {
            data: ['Paradas', 'Retrabalho'],
            textStyle: { color: '#ffffff', fontSize: 12 },
            top: 40,
        },
        xAxis: {
            type: 'category',
            data: ['Status'],
            axisLabel: { color: '#ffffff', fontSize: 12 },
            axisLine: { lineStyle: { color: '#ffffff' } },
        },
        yAxis: {
            type: 'value',
            axisLabel: { color: '#ffffff', fontSize: 12, formatter: '{value}%' },
            axisLine: { lineStyle: { color: '#ffffff' } },
            splitLine: { lineStyle: { color: '#424242' } },
        },
        series: [
            {
                name: 'Paradas',
                type: 'bar',
                stack: 'total',
                data: [parseFloat(data.PercParadas).toFixed(2)],
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#ef5350' },
                        { offset: 1, color: '#d32f2f' },
                    ]),
                },
                barWidth: '20%',
            },
            {
                name: 'Retrabalho',
                type: 'bar',
                stack: 'total',
                data: [parseFloat(data.PercRetrabalho).toFixed(2)],
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#ffee58' },
                        { offset: 1, color: '#fbc02d' },
                    ]),
                },
                barWidth: '20%',
            },
        ],
    };

    return <ReactECharts option={downtimeReworkOption} style={{ height: '300px', width: '100%' }} />;
};

export default ParadaRetrabalhoChart;