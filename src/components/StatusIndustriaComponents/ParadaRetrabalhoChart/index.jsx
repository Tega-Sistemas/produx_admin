import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { baseChartConfig } from '../common/styles';

const ParadaRetrabalhoChart = ({ data }) => {
    // Ensure data is parsed as floats
    const percParadas = parseFloat(data.PercParadas);
    const percRetrabalho = parseFloat(data.PercRetrabalho);
    const percProducao = parseFloat(data.PercProducao);

    const pieChartOption = {
        ...baseChartConfig,
        title: {
            text: 'Paradas e Retrabalho',
            left: 'center',
            textStyle: { color: '#ffffff' }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c}% ({d}%)'
        },
        legend: {
            orient: 'horizontal',
            left: 'left',
            data: ['Paradas', 'Retrabalho', 'Produção'],
            textStyle: { color: '#ffffff', fontSize: 12 },
            top: 40,
        },
        series: [
            {
                name: 'Percentual', // Series name
                type: 'pie', // Set chart type to pie
                radius: '50%', // Set the radius of the pie chart
                center: ['50%', '60%'], // Center the pie chart
                data: [
                    {
                        value: percParadas.toFixed(2), // Downtime value
                        name: 'Paradas',
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: '#ef5350' },
                                { offset: 1, color: '#d32f2f' },
                            ]),
                        },
                    },
                    {
                        value: percRetrabalho.toFixed(2),
                        name: 'Retrabalho',
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: '#ffee58' },
                                { offset: 1, color: '#fbc02d' },
                            ]),
                        },
                    },
                    {
                        value: percProducao.toFixed(2),
                        name: 'Prod.',
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: '#17AA50FF' },
                                { offset: 1, color: '#12883FFF' },
                            ]),
                        },
                    },
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                label: {
                    show: true,
                    formatter: '{b}: {d}%',
                    color: '#ffffff',
                    fontSize: 12
                },
                labelLine: {
                    show: true,
                    length: 10, // Length of the label line
                    lineStyle: {
                        color: '#ffffff' // Color of the label line
                    }
                }
            }
        ]
    };

    return <ReactECharts option={pieChartOption} style={{ height: '300px', width: '100%' }} />;
};

export default ParadaRetrabalhoChart;