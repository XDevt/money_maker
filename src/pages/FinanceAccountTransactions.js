import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import '../styles/FinanceAccountTransactions.css'; // Подключаем стили
import { useSwipeable } from 'react-swipeable';

function FinanceAccountTransactions() {
  const navigate = useNavigate(); // Хук для навигации

  const [date, setDate] = useState(new Date());

  const handleNextMonth = () => {
    setDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + 1);
      return newDate;
    });

  };

  const handlePrevMonth = () => {
    setDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() - 1);
      return newDate;
    });
  };

  const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  const formattedDate = `${monthNames[date.getMonth()]}, ${date.getFullYear()}`;

  const leftTransactions = [
    {
      number: 1,
      day: 'понедельник',
      total_sum: 1200,
      type_day: 1,
      data: [
        { sum: 100532, type: 1, category: 'Категория 14', from_account: 'Карта' },
        { sum: 207780, type: 0, category: 'Категория 218', from_account: 'Наличные' },
        { sum: 1350, type: 1, category: 'Категория 12', from_account: 'Наличные' },
        { sum: 5738, type: 1, category: 'fasfg 12', from_account: 'card' }
      ]
    },
    {
      number: 2,
      day: 'вторник',
      total_sum: 300,
      type_day: 0,
      data: [
      { sum: 100, type: 0, category: 'Категория 3', from_account: 'karta' },
      { sum: 200, type: 0, category: 'Категория 3', from_account: 'card' },
      { sum: 300, type: 0, category: 'Категория 3', from_account: 'card' },
      { sum: 300, type: 1, category: 'Категория 3', from_account: 'card' },
      { sum: 200, type: 1, category: 'Категория 3', from_account: 'card' },
      { sum: 100, type: 1, category: 'Категория 3', from_account: 'card' }
      ]
    }
  ];


  const handlers = useSwipeable({
    onSwipedLeft: handleNextMonth, // Свайп влево переключает на следующий месяц
    onSwipedRight: handlePrevMonth, // Свайп вправо переключает на предыдущий месяц
    preventDefaultTouchmoveEvent: true, // Предотвращаем стандартные события touchmove
    trackMouse: true, // Отслеживаем также свайпы мышью (для тестирования на десктопе)
  });

  const [incomePercentage, setIncomePercentage] = useState(0);
  const [expensePercentage, setExpensePercentage] = useState(0);

  useEffect(() => {
    const calculatePercentages = () => {
      const allTransactions = leftTransactions.flatMap((day) => day.data);

      const totalSum = allTransactions.reduce((sum, transaction) => sum + transaction.sum, 0);
      const incomeSum = allTransactions
        .filter((transaction) => transaction.type === 1)
        .reduce((sum, transaction) => sum + transaction.sum, 0);
      const expenseSum = allTransactions
        .filter((transaction) => transaction.type === 0)
        .reduce((sum, transaction) => sum + transaction.sum, 0);

      setIncomePercentage(((incomeSum / totalSum) * 100).toFixed(2));
      setExpensePercentage(((expenseSum / totalSum) * 100).toFixed(2));
    };

    calculatePercentages();
  }, []);

  return (
    <div {...handlers} className="finance-account-transactions-page">
      <div className="finance-account-transactions-header">
          <img
            src="/static/images/create_fin_account/close_button.svg"
            alt="Your Image"
            className="finance-account-transactions-top-left-image"
            onClick={() => navigate('/wallet-main')}
          />
          <p className="finance-account-transactions-text">Операции</p>
      </div>

      <div className="transaction-summary-container">
        <div
                  className="wallet-account-icon"
                  style={{ backgroundColor: '#4A90E2' }} // Задаем цвет квадратика
                >
            <img
              src="/static/images/wallet_images/money1.svg"
              alt="Money Icon"
              className="transaction-summary-image"
            />
        </div>
        <div className="transaction-summary-text">
          <p>Карта</p>
          <p className="small-text">Всего операций: 29</p>
        </div>
        <p className="transaction-summary-amount">+189000 Р</p>
      </div>

      <div className="finance-account-transactions-bottom-container-with-line">
              <img
                src="/static/images/transactions_images/left-line.svg"
                alt="Left Photo"
                className="finance-account-transactions-bottom-left-photo"
                onClick={handlePrevMonth}  // Назначаем функцию на левую стрелку
                style={{ cursor: 'pointer' }}  // Указатель на стрелке при наведении
              />
              <p className="finance-account-transactions-bottom-container-text">{formattedDate}</p>
              <img
                src="/static/images/transactions_images/right-line.svg"
                alt="Right Photo"
                className="finance-account-transactions-bottom-right-photo"
                onClick={handleNextMonth}  // Назначаем функцию на правую стрелку
                style={{ cursor: 'pointer' }}  // Указатель на стрелке при наведении
              />
      </div>
      <div className="finance-account-transactions-page-percentage">
          <span>Доходы:</span>
          <span className="income-percentage">{incomePercentage}%</span>
          <span style={{ marginLeft: '20px' }}>Расходы:</span>
          <span className="expense-percentage">{expensePercentage}%</span>
        </div>

      <div className="finance-account-transactions-page-scroll-container">
          {leftTransactions.map((day, dayIndex) => (
            <div className="transactions-page-day-container" key={dayIndex}>
              <div className="transactions-page-day-header">
                  <div className="day-left">
                    <p className="day-number">{day.number}</p>
                  </div>
                  <div className="day-center">
                    <p className="formatted-date">{formattedDate}</p>
                    <p className="day-name">{day.day}</p>
                  </div>
                  <div className="day-right">
                    <p
                      className="day-total"
                      style={{ color: day.type_day === 1 ? '#5BC662' : '#DC4E4E' }}
                    >
                      {day.total_sum}₽
                    </p>
                  </div>
                </div>


              <div className="transactions-page-list">
                {day.data.map((transaction, transactionIndex) => (
                  <div className="transactions-page-item" key={transactionIndex}>
                    <div
                          className="wallet-account-icon"
                          style={{ backgroundColor: '#4A90E2' }} // Задаем цвет квадратика
                        >
                      <img src="/static/images/wallet_images/money1.svg" alt="Icon" />
                    </div>
                    <div className="transactions-page-item-details">
                      <p className="transactions-page-item-category">{transaction.category}</p>
                      <p className="transactions-page-item-account">{transaction.from_account}</p>
                    </div>
                    <div className="wallet-account-balance">
                      <span
                        className="wallet-account-main-amount"
                        style={{ color: transaction.type === 1 ? '#5BC662' : '#DC4E4E' }}>
                        {Math.floor(transaction.sum).toLocaleString()}
                      </span>
                      <span
                        className="wallet-account-cents"
                        style={{ color: transaction.type === 1 ? '#5BC662' : '#DC4E4E' }}>
                        ,{(transaction.sum % 1).toFixed(2).slice(2)} ₽
                      </span>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>



    </div>
  );
}

export default FinanceAccountTransactions;