import React from 'react';
import ReactECharts from 'echarts-for-react';

const GradientLineChart = ({ activeContainer, IncomeSumData, expenseSumData }) => {
  const incomeTransactions = IncomeSumData?.transactions || []; // Берём данные транзакций из IncomeSumData
  const expenseTransactions = expenseSumData?.transactions || [];

  console.log("incomeTransactions: ", incomeTransactions)
  console.log("expenseTransactions: ", expenseTransactions)



  const allDates = [
    ...new Set([
      ...incomeTransactions.map((t) => t.date),
      ...expenseTransactions.map((t) => t.date),
    ]),
  ].sort((a, b) => a - b);

  const incomeData = allDates.map((date) =>
    incomeTransactions.find((t) => t.date === date)?.amount || 0
  );

  const expenseData = allDates.map((date) =>
    expenseTransactions.find((t) => t.date === date)?.amount || 0
  );

  const incomeLineColor = activeContainer === 'left' ? '#5E73E9' : '#303030';
  const expenseLineColor = activeContainer === 'right' ? '#DC4E4E' : '#303030';

  const incomeLineWidth = activeContainer === 'left' ? 3 : 2;
  const expenseLineWidth = activeContainer === 'right' ? 3 : 2;

  console.log("activeContainer:", activeContainer)

  const incomeGradient = activeContainer === 'left'
    ? { color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          { offset: 0, color: 'rgba(94, 115, 233, 0.5)' },
          { offset: 1, color: 'rgba(94, 115, 233, 0)' },
        ],
      }
    }
    : null;

  console.log('incomeGradient:', incomeGradient);

  const expenseGradient = activeContainer === 'right'
    ? { color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          { offset: 0, color: 'rgba(220, 78, 78, 0.5)' },
          { offset: 1, color: 'rgba(220, 78, 78, 0)' },
        ],
      }
    }
    : null;

  console.log('expenseGradient:', expenseGradient);

const options = {
  animationDurationUpdate: 500, // Плавная смена активного графика
  animationEasingUpdate: 'cubicOut',
  grid: {
    top: 15,
    bottom: 10,
    left: 20, // Фиксированный отступ слева (5px)
    right: 20, // Фиксированный отступ справа (5px)
  },
  xAxis: [
    {
      type: 'category',
      data: incomeTransactions.map((t) => t.date), // Даты доходов
      boundaryGap: false, // Убираем отступы, чтобы график растягивался
      show: false, // Убираем отображение оси X для доходов
    },
    {
      type: 'category',
      data: expenseTransactions.map((t) => t.date), // Даты расходов
      boundaryGap: false, // Убираем отступы, чтобы график растягивался
      show: false, // Убираем отображение оси X для расходов
    },
  ],
  yAxis: [
    {
      type: 'value',
      show: false, // Убираем ось доходов
      splitLine: { show: false }, // Убираем сетку
    },
    {
      type: 'value',
      show: false, // Убираем ось расходов
      splitLine: { show: false }, // Убираем сетку
    },
  ],
  series: [
    {
      name: 'Доходы',
      type: 'line',
      xAxisIndex: 0, // Привязка к первой оси X
      yAxisIndex: 0, // Привязка к первой оси Y
      data: incomeTransactions.map((t) => t.amount), // Только данные доходов
      smooth: true, // Плавные линии
      lineStyle: {
        color: activeContainer === 'left' ? '#5E73E9' : '#303030', // Цвет линии
        width: activeContainer === 'left' ? 3 : 2, // Толщина линии
      },
      areaStyle: activeContainer === 'left'
        ? {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(94, 115, 233, 0.5)' },
                { offset: 1, color: 'rgba(94, 115, 233, 0)' },
              ],
            },
          }
        : null, // Градиент только для активного графика
      showSymbol: false, // Убираем точки на графике
      z: activeContainer === 'left' ? 2 : 1, // Приоритет отображения
    },
    {
      name: 'Расходы',
      type: 'line',
      xAxisIndex: 1, // Привязка ко второй оси X
      yAxisIndex: 1, // Привязка ко второй оси Y
      data: expenseTransactions.map((t) => t.amount), // Только данные расходов
      smooth: true, // Плавные линии
      lineStyle: {
        color: activeContainer === 'right' ? '#DC4E4E' : '#303030', // Цвет линии
        width: activeContainer === 'right' ? 3 : 2, // Толщина линии
      },
      areaStyle: activeContainer === 'right'
        ? {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(220, 78, 78, 0.5)' },
                { offset: 1, color: 'rgba(220, 78, 78, 0)' },
              ],
            },
          }
        : null, // Градиент только для активного графика
      showSymbol: false, // Убираем точки на графике
      z: activeContainer === 'right' ? 2 : 1, // Приоритет отображения
    },
  ],
};


  return <ReactECharts option={options} style={{ height: '120px', width: '100%' }} />;
};

export default GradientLineChart;
