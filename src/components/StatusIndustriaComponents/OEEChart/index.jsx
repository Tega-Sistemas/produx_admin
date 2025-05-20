import React from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { baseChartConfig } from '../common/styles';

const OEEChart = ({ data }) => {
    const oeeOption = {
        ...baseChartConfig,
        title: { text: 'OEE', textStyle: { color: '#ffffff' } },
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
                data: [{ value: parseFloat(data.OEE).toFixed(2) }],
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#ab47bc' },
                        { offset: 1, color: '#7b1fa2' },
                    ]),
                },
            },
        ],
    };

    return <ReactECharts option={oeeOption} style={{ height: '300px', width: '100%' }} />;
};

export default OEEChart;