import React from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import 'echarts-liquidfill';
import { baseChartConfig } from '../common/styles';

const ProductionChart = ({ data }) => {
    // Calculate the percentage
    const percentage = (parseFloat(data.ProducaoDia) / (parseFloat(data.MetaEquipamento) || 1));

    // Determine the color based on percentage
    const getColor = (percentage) => {
        if (percentage <= 0.3) {
            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#ef5350' }, // Red for <= 30%
                { offset: 1, color: '#d32f2f' }, // Darker red
            ]);
        } else if (percentage <= 0.7) {
            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#ffca28' }, // Yellow for <= 70%
                { offset: 1, color: '#ffa000' }, // Darker yellow
            ]);
        } else {
            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#66bb6a' }, // Green for > 70%
                { offset: 1, color: '#388e3c' }, // Darker green
            ]);
        }
    };

    const productionOption = {
        ...baseChartConfig,
        title: { text: `Produção do Dia (${data.UnidadeProducao})`, textStyle: { color: '#ffffff' } },
        series: [
            {
                type: 'liquidFill',
                data: [percentage],
                radius: '70%',
                center: ['50%', '50%'],
                color: [getColor(percentage)],
                backgroundStyle: {
                    borderColor: '#ffffff',
                    borderWidth: 1,
                    color: '#212121',
                },
                outline: {
                    show: true,
                    borderDistance: 5,
                    itemStyle: {
                        borderColor: '#424242',
                        borderWidth: 2,
                    },
                },
                label: {
                    fontSize: 20,
                    color: '#ffffff',
                    formatter: () => {
                        const percentageDisplay = (percentage * 100).toFixed(2);
                        return `${parseFloat(data.ProducaoDia).toFixed(2)} / ${parseFloat(data.MetaEquipamento).toFixed(2)}\n${percentageDisplay}%`;
                    },
                },
                waveAnimation: true,
                amplitude: 10,
                animationDuration: 3000,
            },
        ],
    };

    return <ReactECharts option={productionOption} style={{ height: '300px', width: '100%' }} />;
};

export default ProductionChart;