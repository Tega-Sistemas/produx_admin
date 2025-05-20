import React from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { baseChartConfig } from '../common/styles';

const EfficiencyChart = ({ data }) => {
    const efficiencyOption = {
        ...baseChartConfig,
        title: { text: 'Eficiência', textStyle: { color: '#ffffff' } },
        series: [
            {
                type: 'gauge',
                min: 0,
                max: 100,
                progress: { show: true, width: 18 },
                axisLine: {
                    lineStyle: {
                        width: 18,
                        color: [
                            [0.3, '#ef5350'],
                            [0.7, '#ffca28'],
                            [1, '#66bb6a'],
                        ],
                    },
                },
                axisTick: { show: false },
                splitLine: { show: false },
                axisLabel: { distance: 15, color: '#ffffff', fontSize: 12 },
                anchor: {
                    show: true,
                    size: 20,
                    itemStyle: { color: '#ffffff', borderColor: '#424242', borderWidth: 2 },
                },
                pointer: { width: 8, length: '70%' },
                title: { show: false },
                detail: {
                    valueAnimation: true,
                    fontSize: 20,
                    color: '#ffffff',
                    offsetCenter: [0, '70%'],
                    formatter: '{value}%',
                },
                data: [{ value: parseFloat(data.Eficiencia).toFixed(2) }],
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#42a5f5' },
                        { offset: 1, color: '#1976d2' },
                    ]),
                },
            },
        ],
    };

    return <ReactECharts option={efficiencyOption} style={{ height: '300px', width: '100%' }} />;
};

export default EfficiencyChart;