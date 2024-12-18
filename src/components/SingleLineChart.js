import React from 'react';
import ReactECharts from 'echarts-for-react';

const SingleLineChart = ({ data }) => {
  // Получаем данные транзакций
  const transactions = data?.transactions || [];

  // Извлекаем даты и значения для графика
  const allDates = transactions.map((t) => t.date);
  const allValues = transactions.map((t) => t.amount);

  // Настройки графика
  const options = {
    grid: {
      top: 0,
      bottom: 0, // Увеличиваем отступ снизу, чтобы градиент уходил глубже
      left: 20,
      right: 20,
    },
    xAxis: {
      type: 'category',
      data: allDates,
      show: false, // Скрываем ось X
      boundaryGap: false,
    },
    yAxis: {
      type: 'value',
      show: false, // Скрываем ось Y
    },
    series: [
      {
        name: 'Данные',
        type: 'line',
        data: allValues,
        smooth: true, // Сглаживание линии
        lineStyle: {
          color: '#5BC662', // Зеленая линия
          width: 3,
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1.5, // Растягиваем градиент ниже, значение больше 1
            colorStops: [
              { offset: 0, color: 'rgba(91, 198, 98, 0.8)' }, // Яркий зеленый вверху
              { offset: 1, color: 'rgba(91, 198, 98, 0.05)' }, // Прозрачный внизу
            ],
          },
        },
        showSymbol: false, // Убираем точки
      },
    ],
  };

  return <ReactECharts option={options} style={{ height: '70px', width: '100%' }} />;
};

export default SingleLineChart;
