import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CategoriesStatisticPage.css'; // Подключаем стили
import { Doughnut } from 'react-chartjs-2'; // Импортируем круглый график
import { useSwipeable } from 'react-swipeable';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import MyChart from '../components/MyChart.js';
import GradientLineChart from '../components/linearChart.js';
import SingleLineChart from '../components/SingleLineChart.js';

function AddNewFinanceAccount() {



  const navigate = useNavigate(); // Хук для навигации

  const [selectedCategoriesType, setSelectedCategoriesType] = useState('income');
  const [activeContainer, setActiveContainer] = useState('left');

  const handleCategoriesTypeClick = (categoriesType) => {
    setSelectedCategoriesType(categoriesType);
  };

  let IncomeSumData = {
        sum: 12000,
        color: "green",
        average_day_color: "white",
        average_day_value: 2277.7,
        average_week_color: "white",
        average_week_value: 14300.45,
        total_expense_value: 143000,
        transactions: [
            { date: '3', amount: 4500 },
            { date: '6', amount: 18000 },
            { date: '9', amount: 4000 },
            { date: '14', amount: 12000 },
            { date: '17', amount: 67000 },
            { date: '22', amount: 1000 },
            { date: '31', amount: 5700 },
      ]
  }

  let expenseSumData = {
        sum: 14000,
        color: "red",
        average_day_color: "white",
        average_day_value: 1956.2,
        average_week_color: "white",
        average_week_value: 6512.7,
        total_expense_value: 56700,
        transactions: [
            { date: '1', amount: 1000 },
            { date: '5', amount: 8000 },
            { date: '7', amount: 4000 },
            { date: '10', amount: 12000 },
            { date: '15', amount: 9000 },
            { date: '18', amount: 6000 },
            { date: '23', amount: 3000 },
      ]
  }

  let TotalSumData = {
        sum: 2000,
        color: "red",
        average_day_color: "red",
        average_day_value: 1436.2,
        average_week_color: "green",
        average_week_value: 6357.2,
        transactions: [
            { date: '100', amount: 1000000000 },
            { date: '100', amount: 1000000000 },
            { date: '100', amount: 1000000000 },
            { date: '100', amount: 1000000000 },
            { date: '100', amount: 1000000000 },
            { date: '100', amount: 1000000000 },
            { date: '100', amount: 1000000000 },
      ]
  }

  const selectedData = selectedCategoriesType === 'income'
      ? IncomeSumData
      : selectedCategoriesType === 'expense'
      ? expenseSumData
      : TotalSumData;

  const ExpenseValueData = [31714.24, 12195, 9579, 3558, 2950];
  const ExpenseColorData = ['#32cd32', '#8a2be2', '#3cb371', '#1e90ff', '#ff8c00'];
  const ExpenseLabelsData = ['Покупки', 'Еда', 'Здоровье', 'Транспорт', 'Курение'];

  const ExpenseCategories = [
      {
        name: 'Покупки',
        amount: '31 714.24 ₽',
        percentage: 52,
        color: '#32cd32', // Цвет для прогресс-бара
      },
      {
        name: 'Еда',
        amount: '12 195 ₽',
        percentage: 20,
        color: '#8a2be2',
      },
      {
        name: 'Здоровье',
        amount: '9 579 ₽',
        percentage: 15,
        color: '#3cb371',
      },
      {
        name: 'Транспорт',
        amount: '3 558 ₽',
        percentage: 5,
        color: '#1e90ff',
      },
      {
        name: 'Курение',
        amount: '2 950 ₽',
        percentage: 4,
        color: '#ff8c00',
      },
    ];

  const IncomeValueData = [279299, 156195];
  const IncomeColorData = ['#32cd32', '#8a2be2'];
  const IncomeLabelsData = ['Свои проекты', 'Проекты BBS'];

  const IncomeCategories = [
      {
        name: 'Свои проекты',
        amount: '279 299 ₽',
        percentage: 64,
        color: '#32cd32', // Цвет для прогресс-бара
      },
      {
        name: 'Проекты BBS',
        amount: '156 195 ₽',
        percentage: 36,
        color: '#8a2be2',
      }
    ];

  const CircleGraphicTransactionsData = selectedCategoriesType === 'income'
      ? IncomeCategories
      : ExpenseCategories


  // Добавляем данные и опции для кругового графика
  const doughnutData = {
    labels: selectedCategoriesType === 'income' ? IncomeLabelsData : ExpenseLabelsData,
    datasets: [
      {
        data: selectedCategoriesType === 'income' ? IncomeValueData : ExpenseValueData, // Пример данных, можно динамически менять
        backgroundColor: selectedCategoriesType === 'income' ? IncomeColorData : ExpenseColorData,
        hoverBackgroundColor: selectedCategoriesType === 'income' ? IncomeColorData : ExpenseColorData,
        borderWidth: 10,
        borderColor: 'rgba(18, 18, 18, 1)',
      },
    ],
  };

  const doughnutOptions = {
    cutout: '65%',
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const [date, setDate] = useState(new Date());

  // Функция для перехода на следующий месяц
  const handleNextMonth = () => {
    setDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + 1);
      return newDate;
    });
  };

  // Функция для перехода на предыдущий месяц
  const handlePrevMonth = () => {
    setDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() - 1);
      return newDate;
    });
  };

  const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  const formattedDate = `${monthNames[date.getMonth()]}, ${date.getFullYear()}`;

  const handlers = useSwipeable({
    onSwipedLeft: handleNextMonth, // Свайп влево переключает на следующий месяц
    onSwipedRight: handlePrevMonth, // Свайп вправо переключает на предыдущий месяц
    preventDefaultTouchmoveEvent: true, // Предотвращаем стандартные события touchmove
    trackMouse: true, // Отслеживаем также свайпы мышью (для тестирования на десктопе)
  });





  const [showCalendarModal, setShowCalendarModal] = useState(false);

  const openCalendarModal = () => setShowCalendarModal(true);

  const closeCalendarModal = () => {
    console.log("Выбранная дата:", date); // Вывод выбранной даты в консоль
    setShowCalendarModal(false);
  };




  const [showFirstModal, setShowFirstModal] = useState(false);

  const openFirstModal = () => setShowFirstModal(true);
  const closeFirstModal = () => setShowFirstModal(false);

  const [showFromDateModal, setShowFromDateModal] = useState(false);
  const [showToDateModal, setShowToDateModal] = useState(false);

  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());

  const openFromCalendarModal = () => setShowFromDateModal(true);

  const closeFromCalendarModal = () => {
    setShowFromDateModal(false);
    setShowToDateModal(true);
  };

  const closeAllDateCalendarModal = () => {
    setShowFromDateModal(false);
    setShowToDateModal(false);
  };

  const closeToCalendarModal = () => {
    console.log("FROM: ", dateFrom, "TO: ", dateTo); // Вывод выбранной даты в консоль
    setShowToDateModal(false);
    setShowFirstModal(false);
  };

  return (
    <div {...handlers} className="categories-statistic-page-container">
      <div className="categories-statistic-header">
        <img
          src="/static/images/create_fin_account/close_button.svg"
          alt="Your Image"
          className="categories-statistic-page-top-left-image"
          onClick={() => navigate('/categories-main')}
        />
        <p className="categories-statistic-title">Аналитика</p>
      </div>



      <div className="categories-statistic-page-bottom-container-with-line">
        <img src="/static/images/transactions_images/left-line.svg" alt="Left Photo" className="categories-statistic-page-bottom-left-photo" onClick={handlePrevMonth} style={{ cursor: 'pointer' }}/>
        <p className="categories-statistic-page-bottom-container-text" onClick={openFirstModal} style={{ cursor: 'pointer' }}>{formattedDate}</p>
        <img src="/static/images/transactions_images/right-line.svg" alt="Right Photo" className="categories-statistic-page-bottom-right-photo" onClick={handleNextMonth} style={{ cursor: 'pointer' }}/>
      </div>

      <div className="categories-statistic-page-rectangle">
        <div
          className="categories-statistic-page-inner-rectangle"
          style={{
            backgroundColor: selectedCategoriesType === 'expense' ? 'rgba(18, 18, 18, 100)' : 'transparent'
          }}
          onClick={() => handleCategoriesTypeClick('expense')} >
          <p
              className="categories-statistic-page-rectangle-text"
              style={{
                color: selectedCategoriesType === 'expense' ? '#DC4E4E' : '#545454'
              }}
            >
              Расходы
            </p>
        </div>
        <div
          className="categories-statistic-page-inner-rectangle"
          style={{
            backgroundColor: selectedCategoriesType === 'income' ? 'rgba(18, 18, 18, 100)' : 'transparent'
          }}
          onClick={() => handleCategoriesTypeClick('income')} >
          <p
              className="categories-statistic-page-rectangle-text"
              style={{
                color: selectedCategoriesType === 'income' ? '#5BC662' : '#545454'
              }}
            >
              Доходы
            </p>
        </div>
      </div>

      <div className="statistic-page-scrollable-area">
          {(selectedCategoriesType === 'income' || selectedCategoriesType === 'expense') && (
              <div className="statistic-page-doughnut-chart-container">
                <Doughnut data={doughnutData} options={doughnutOptions} />
                {/* Here start the cards */}
              </div>
            )}

          <div className="account-container">
            {CircleGraphicTransactionsData.map((category, index) => (
              <div key={index} className="statistic-page-category-item">
                <div
                  className="statistic-page-category-account-icon"
                  style={{ backgroundColor: category.color || '#4A90E2' }} // Задаем цвет квадратика
                >
                    <img src="/static/images/wallet_images/money1.svg" alt="Account Icon" />
                </div>
                <div className="statistic-page-category-details">
                  <div className="statistic-page-category-header">
                    <p className="statistic-page-category-name">{category.name}</p>
                    <p className="statistic-page-category-amount">{category.amount}</p>
                  </div>
                  <div className="statistic-page-progress-bar-container">
                    <div
                      className="statistic-page-progress-bar"
                      style={{
                        width: `${category.percentage}%`,
                        backgroundColor: category.color,
                      }}
                    />
                  </div>
                </div>
                <div className="statistic-page-category-percentage">
                  <p>{category.percentage}%</p>
                </div>
              </div>
            ))}
          </div>




          <div className="statistic-page-chart-container">
            <MyChart selectedData={selectedData} type={selectedCategoriesType} />
          </div>

          <div className="statistic-page-container">
              {/* Левый контейнер */}
              <div className="statistic-page-left-box">
                <p className="statistic-page-box-header">Сумма расходов:</p>
                <p className="statistic-page-box-value" style={{ color: selectedData.total_expense_color }}>
                  {Math.floor(selectedData.total_expense_value).toLocaleString()},{(selectedData.total_expense_value % 1).toFixed(2).slice(2)} ₽
                </p>
              </div>

              {/* Правый контейнер */}
              <div className="statistic-page-right-box">
                <p className="statistic-page-box-header">Среднее за день:</p>
                <p className="statistic-page-box-value" style={{ color: selectedData.average_day_color }}>
                  {Math.floor(selectedData.average_day_value).toLocaleString()},{(selectedData.average_day_value % 1).toFixed(2).slice(2)} ₽
                </p>
              </div>
          </div>

          <div className="statistic-page-new-wrapper">
              <p className="comparison-title">Сравнение расходов</p> {/* Добавляем заголовок */}
              <div className="statistic-page-new-container">
                {/* Левый контейнер */}
                <div
                  className={`statistic-page-new-left-box ${activeContainer === 'left' ? 'active' : ''}`}
                  onClick={() => setActiveContainer('left')}
                >
                  <p className="statistic-page-new-box-header">1-23 окт.</p>
                  <p className="statistic-page-new-box-value">
                    {Math.floor(45000).toLocaleString()},{(45000 % 1).toFixed(2).slice(2)} ₽
                  </p>
                </div>

                {/* Правый контейнер */}
                <div
                  className={`statistic-page-new-right-box ${activeContainer === 'right' ? 'active' : ''}`}
                  onClick={() => setActiveContainer('right')}
                >
                  <p className="statistic-page-new-box-header">1-23 сент.</p>
                  <p className="statistic-page-new-box-value">
                    {Math.floor(12300).toLocaleString()},{(12300 % 1).toFixed(2).slice(2)} ₽
                  </p>
                </div>
              </div>
            </div>


            <div className="statistic-page-bottom-new-container">
              <GradientLineChart
                activeContainer={activeContainer}
                IncomeSumData={IncomeSumData}
                expenseSumData={expenseSumData}
              />
            </div>

            <div className="additional-container">
              <div className="inner-container">
                <div
                  className="wallet-account-icon"
                  style={{ backgroundColor: '#5BC662' }} // Задаем цвет квадратика
                >
                    <img
                      src="static/images/categories_images/Frame.svg"
                      alt="Left"
                      className="inner-container-left-image"
                    />
                </div>
                <div className="inner-container-text">
                  Общий расход в октябре чем в сентябре <b>меньше на 52 028 ₽ (79%)</b>
                </div>
              </div>
            </div>

            <div className="statistic-page-new-wrapper">
              <p className="comparison-title">Динамика баланса</p>
              <div className="balance-container">
                <div className="balance-text">
                  <p className="balance-value">110 000₽</p>
                  <p className="balance-comparison">-50 000₽ <span className="balance-percentage">50%</span> за 12 дней</p>
                </div>
                <button className="balance-button">Счета</button>
              </div>
            </div>


            <div className="statistic-page-single-container">

              <SingleLineChart
                data={IncomeSumData} // Или передать expenseSumData
              />
              <div className="gradient-container">
                {/* Градиент ниже графика */}
              </div>
            </div>




            <div className="spacer-element"></div>
      </div>


      {showFirstModal && (
          <div className="transactions-page-date-modal-window" onClick={closeFirstModal}>
            <div className="transactions-page-date-modal-window-content" onClick={(e) => e.stopPropagation()}>
              <p>Выберите временной интервал</p>

              {/* Первый контейнер во всю ширину */}
              <div className="full-width-container">
                <div className="content-center">
                    <img src="/static/images/transactions_images/calendar_all_the_time.svg" alt="Image" className="center-image" />
                    <p>За все время</p>
                </div>
              </div>

              {/* Два контейнера в ряд */}
              <div className="two-container-row">
                <div className="half-width-container" onClick={openFromCalendarModal} style={{ cursor: 'pointer' }}>
                    <div className="two-container-content-center">
                        <img src="/static/images/transactions_images/calendar_diapazon.svg" alt="Image" className="two-container-center-image" />
                        <p>Диапазон дат</p>
                    </div>
                </div>
                <div className="half-width-container" onClick={openCalendarModal} style={{ cursor: 'pointer' }}>
                <div className="two-container-content-center">
                        <img src="/static/images/transactions_images/calendar-select_day.svg" alt="Image" className="two-container-center-image" />
                        <p>Выберите день</p>
                    </div>
                </div>
              </div>

              {/* Три контейнера в ряд */}
              <div className="three-container-row">
                <div className="third-width-container">
                    <div className="content-center">
                        <img src="/static/images/transactions_images/calendar_365_days.svg" alt="Image" className="center-image" />
                        <p>За год</p>
                    </div>
                </div>
                <div className="third-width-container">
                    <div className="content-center">
                        <img src="/static/images/transactions_images/calendar_30_days.svg" alt="Image" className="center-image" />
                        <p>За месяц</p>
                    </div>
                </div>
                <div className="third-width-container">
                    <div className="content-center">
                        <img src="/static/images/transactions_images/calendar_7_days.svg" alt="Image" className="center-image" />
                        <p>За неделю</p>
                    </div>
                </div>
              </div>

              {/* Второй контейнер во всю ширину */}
              <div className="full-width-container">
                <div className="content-center">
                    <img src="/static/images/transactions_images/calendar_1_day.svg" alt="Image" className="center-image" />
                    <p>За сегодня</p>
                </div>
              </div>

              <button onClick={closeFirstModal}>Закрыть</button>
            </div>
          </div>
        )}

        {showCalendarModal && (
        <div className="calendar-modal-overlay" onClick={closeCalendarModal}>
          <div className="calendar-modal-content" onClick={(e) => e.stopPropagation()}>
          <p className="calendar-modal-title">Выберите день</p> {/* Добавляем заголовок */}
            <div className="calendar-container">
                <Calendar
                  onChange={setDate}
                  value={date}
                  maxDetail="month"
                  minDetail="month"
                  showNeighboringMonth={false}
                />
            </div>
            <button onClick={closeCalendarModal} className="modal-close-button">Закрыть</button>
          </div>
        </div>
      )}

      {showFromDateModal && (
        <div className="calendar-modal-overlay" onClick={closeAllDateCalendarModal}>
          <div className="calendar-modal-content" onClick={(e) => e.stopPropagation()}>
          <p className="calendar-modal-title">Выберите день</p> {/* Добавляем заголовок */}
            <div className="calendar-container">
                <Calendar
                  onChange={setDateFrom}
                  value={dateFrom}
                  maxDetail="month"
                  minDetail="month"
                  showNeighboringMonth={false}
                />
            </div>
            <button onClick={closeFromCalendarModal} className="modal-close-button">Готово</button>
            <button onClick={closeAllDateCalendarModal} className="modal-close-button">Закрыть</button>
          </div>
        </div>
      )}

        {showToDateModal && (
        <div className="calendar-modal-overlay" onClick={closeAllDateCalendarModal}>
          <div className="calendar-modal-content" onClick={(e) => e.stopPropagation()}>
          <p className="calendar-modal-title">Выберите день</p> {/* Добавляем заголовок */}
            <div className="calendar-container">
                <Calendar
                  onChange={setDateTo}
                  value={dateTo}
                  maxDetail="month"
                  minDetail="month"
                  showNeighboringMonth={false}
                />
            </div>
            <button onClick={closeToCalendarModal} className="modal-close-button">Готово</button>
            <button onClick={closeAllDateCalendarModal} className="modal-close-button">Закрыть</button>
          </div>
        </div>
      )}

    </div>
  );
}

export default AddNewFinanceAccount;
