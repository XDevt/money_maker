import React, { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import '../styles/WalletViewPage.css';

ChartJS.register(ArcElement, Tooltip, Legend);

function WalletViewPage() {
  const navigate = useNavigate();
  const [animationClass, setAnimationClass] = useState('visible');
  const [isSheetsActive, setIsSheetsActive] = useState(false);
  const [isOverviewActive, setIsOverviewActive] = useState(true);

  const handlers = useSwipeable({
      onSwipedRight: () => {
        setAnimationClass('hidden-right'); // добавляем класс для анимации ухода вправо
        setIsSheetsActive(true);   // «Счета» получает активное состояние
        setIsOverviewActive(false);
        setTimeout(() => navigate('/wallet-main'), 200); // задержка для завершения анимации
      },
      preventDefaultTouchmoveEvent: true,
      trackMouse: true,
    });

  const handlePageSwitch = () => {
     setAnimationClass('hidden-right'); // добавляем класс для анимации ухода вправо
     setIsSheetsActive(true);   // «Счета» получает активное состояние
     setIsOverviewActive(false);
     setTimeout(() => navigate('/wallet-main'), 200); // задержка для завершения анимации
   };

  // Данные по счетам
  const financialAccounts = [
    { name: 'Карта', amount: 2400, color: "#4A90E2" },
    { name: 'Наличные', amount: 4600, color: '#50E3C2' },
    { name: 'Карта 2', amount: 2000, color: '#F5A623' },
    { name: 'Карта 3', amount: 2000, color: 'red' },
  ];

  const backgroundColorsFinancialAccounts = financialAccounts.map(account => account.color);
  const hoverBackgroundColorsFinancialAccounts = financialAccounts.map(account => account.color);

  const savingsAccounts = [
    { name: 'Счет 1', amount: 130, color: "gold" },
    { name: 'Счет 2', amount: 450, color: "pink" },
  ];

  const backgroundColorsSavingAccounts = savingsAccounts.map(account => account.color);
  const hoverBackgroundColorsSavingAccounts = savingsAccounts.map(account => account.color);

  const financialTotal = financialAccounts.reduce((acc, account) => acc + account.amount, 0);
  const savingsTotal = savingsAccounts.reduce((acc, account) => acc + account.amount, 0);
  const totalAmount = financialTotal + savingsTotal;

  const financialPercentage = ((financialTotal / totalAmount) * 100).toFixed(2);
  const savingsPercentage = ((savingsTotal / totalAmount) * 100).toFixed(2);

  const data = {
    labels: ['Финансовые счета', 'Сберегательные счета'],
    datasets: [
      {
        data: [financialTotal, savingsTotal],
        backgroundColor: ['blue', 'gold'],
        hoverBackgroundColor: ['blue', 'gold'],
        borderWidth: 10,
        borderColor: '#2c2c2c',
      },
    ],
  };

  const secondCircleData = {
    labels: financialAccounts.map(account => account.name),
    datasets: [
      {
        data: financialAccounts.map(account => account.amount),
        backgroundColor: backgroundColorsFinancialAccounts,
        hoverBackgroundColor: hoverBackgroundColorsFinancialAccounts,
        borderWidth: 10,
        borderColor: '#2c2c2c',
      },
    ],
  };

  const thirdCircleData = {
    labels: savingsAccounts.map(account => account.name),
    datasets: [
      {
        data: savingsAccounts.map(account => account.amount),
        backgroundColor: backgroundColorsSavingAccounts,
        hoverBackgroundColor: hoverBackgroundColorsSavingAccounts,
        borderWidth: 10,
        borderColor: '#2c2c2c',
      },
    ],
  };

  const options = {
    cutout: '65%',
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  // Используем useEffect для добавления ограничения на скролл
  useEffect(() => {
    const scrollArea = document.querySelector('.wallet-view-scrollable-area');

    const handleScroll = () => {
      const scrollTop = scrollArea.scrollTop;
      const maxScrollTop = scrollArea.scrollHeight - scrollArea.clientHeight;

      if (scrollTop > maxScrollTop) {
        scrollArea.scrollTop = maxScrollTop;
      } else if (scrollTop < 0) {
        scrollArea.scrollTop = 0;
      }
    };

    scrollArea.addEventListener('scroll', handleScroll);

    // Очищаем событие при размонтировании компонента
    return () => {
      scrollArea.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="wallet-view-page">
      <div className="wallet-view-top-container">
        <img src="/static/images/wallet_images/plus_button.svg" alt="Profile Right" className="top-right-image" onClick={() => navigate('/add-new-finance-wallet')}/>
        <p>Общий баланс</p>
        <p className="balance-amount">{totalAmount}₽</p>
      </div>

      <div className="wallet-view-color-containers">
        <div
          className={`wallet_half-container wallet_red-container ${!isSheetsActive ? 'active' : ''}`}
          onClick={handlePageSwitch}
        >
          <span className="wallet_container-text">Счета</span>
        </div>
        <div
          className={`wallet_half-container wallet_blue-container ${isOverviewActive ? 'active' : ''}`}>
          <span className="wallet_container-text">Обзор</span>
        </div>
      </div>


      <div {...handlers} className={`wallet-view-scrollable-area ${animationClass}`}>
        <div className="wallet-view-chart-title">Всего</div>
        <div className="wallet-view-chart-container">
          <Doughnut data={data} options={options} />
          <div className="wallet-view-center-amount">{totalAmount}₽</div>
        </div>

        <div className="wallet-view-chart-title2">Финансовые счета</div>
        <div className="wallet-view-chart-container">
          <Doughnut data={secondCircleData} options={options} />
          <div className="wallet-view-center-amount">{financialTotal}₽</div>
        </div>

        <div className="wallet-view-chart-title3">Сберегательные счета</div>
          <div className="wallet-view-chart-container">
            <Doughnut data={thirdCircleData} options={options} />
          <div className="wallet-view-center-amount">{savingsTotal}₽</div>
        </div>
      </div>

      <div className="bottom-container">
        <img src="/static/images/lower_buttons/wallet_accounts_active.svg" alt="Image 1" className="bottom-image" />
        <img src="/static/images/lower_buttons/transactions_inactive.svg" alt="Image 2" className="bottom-image" onClick={() => navigate('/transaction-main')}/>
        <img src="/static/images/lower_buttons/category_inactive.svg" alt="Image 3" className="bottom-image" onClick={() => navigate('/categories-main')}/>
        <img src="/static/images/lower_buttons/investment_inactive.svg" alt="Image 4" className="bottom-image" onClick={() => navigate('/invest-managment-main')}/>
        <img src="/static/images/lower_buttons/personal_account_inactive.svg" alt="Image 5" className="bottom-image" onClick={() => navigate('/personal-account-main')}/>
      </div>
    </div>
  );
}

export default WalletViewPage;
