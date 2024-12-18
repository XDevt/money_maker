import React from 'react';
import ReactECharts from 'echarts-for-react';

const MyChart = ({ selectedData, type }) => {
  const chartData = selectedData.transactions.map((item) => ({
    date: item.date,
    amount: item.amount,
  }));

  // Получаем максимальное значение для динамического диапазона оси Y
  const maxAmount = Math.max(...chartData.map((item) => item.amount));
  const roundedMaxValue = Math.ceil(maxAmount / 10000) * 10000;

  // Определяем цвет для splitLine в зависимости от типа
  const splitLineColor = type === 'expense' ? '#DC4E4E' : '#5BC662';

  // Настройки графика
  const options = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(18, 18, 18, 100)',
      borderColor: '#aaa',
      borderWidth: 1,
      textStyle: {
        color: '#fff',
        fontSize: 14,
      },
      formatter: (params) => {
        const item = params[0]; // params может быть массивом
        return `
          <div style="text-align: left;">
            <span style="color:${item.color}">• </span>${item.value.toLocaleString()} ₽
          </div>
        `;
      },
    },
    grid: {
      left: '10px',
      right: '10px',
      top: '20px',
      bottom: '10px', // Минимальный отступ снизу
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: chartData.map((item) => item.date),
      axisLine: {
        lineStyle: {
          color: '#fff',
        },
      },
      axisTick: {
        alignWithLabel: true,
      },
      axisLabel: {
        fontSize: 12, // Уменьшаем размер текста оси X
      },
    },
    yAxis: {
      type: 'value',
      max: roundedMaxValue, // Устанавливаем динамический максимум
      axisLine: {
        lineStyle: {
          color: '#fff',
        },
      },
      axisLabel: {
        formatter: '{value} ₽',
      },
      splitLine: {
        lineStyle: {
          type: 'dashed', // Пунктирные линии
          color: "rgba(84, 84, 84, 0.8)", // Динамический цвет
        },
      },
    },
    series: [
      {
        name: 'Сумма',
        type: 'bar',
        data: chartData.map((item) => item.amount),
        itemStyle: {
          color: splitLineColor,
          borderRadius: [10, 10, 0, 0], // Закругление только верхних углов
        },
        barWidth: '20px', // Фиксируем ширину столбцов
      },
    ],
  };

  return <ReactECharts option={options} style={{ height: '100%', width: '100%' }} />;
};

export default MyChart;
