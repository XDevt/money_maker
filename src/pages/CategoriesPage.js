import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CategoriesPage.css';
import { useSwipeable } from 'react-swipeable';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const initialTransactions = [
    {
      number: 1,
      day: 'понедельник',
      total_sum: 1200,
      type_day: 1,
      data: [
        { sum: 100, type: 1, category: 'Категория 1', from_account: 'Карта' },
        { sum: 200, type: 0, category: 'Категория 2', from_account: 'Наличные' },
        { sum: 1300, type: 1, category: 'Категория 1', from_account: 'Наличные' }
      ]
    },
    {
      number: 2,
      day: 'вторник',
      total_sum: 300,
      type_day: 0,
      data: [
      { sum: 100, type: 0, category: 'Категория 3', from_account: 'Карта' },
      { sum: 200, type: 0, category: 'Категория 3', from_account: 'Карта' },
      { sum: 300, type: 0, category: 'Категория 3', from_account: 'Карта' },
      { sum: 300, type: 1, category: 'Категория 3', from_account: 'Карта' },
      { sum: 200, type: 1, category: 'Категория 3', from_account: 'Карта' },
      { sum: 100, type: 1, category: 'Категория 3', from_account: 'Карта' }
      ]
    }
  ];

function CategoriesPage() {
  const navigate = useNavigate();

  const [selectedCategoriesType, setSelectedCategoriesType] = useState('expense');
  const [modalVisible, setModalVisible] = useState(false);  // Управление видимостью модального окна
  const [selectedAccount, setSelectedAccount] = useState(null);  // Данные для выбранного аккаунта

  const handleCategoriesTypeClick = (categoriesType) => {
    setSelectedCategoriesType(categoriesType);
  };

  const handleAccountClick = (account) => {
      setSelectedAccount(account);
      setModalVisible(true);

      setTimeout(() => {
        const modalContent = document.querySelector('.modal-content');
        if (modalContent) {
          modalContent.classList.add('visible'); // Trigger opening animation
        }
      }, 10); // A short delay to allow the DOM to update before adding the class
    };

  const closeModal = () => {
      const modal = document.querySelector('.modal-content');
      const overlay = document.querySelector('.modal-overlay');

      modal.classList.remove('visible');
      modal.classList.add('hidden');

      overlay.classList.remove('visible');
      overlay.classList.add('hidden');

      setTimeout(() => {
        setModalVisible(false); // Скрываем модальное окно после завершения анимации
      }, 300); // Совпадает с длительностью анимации закрытия
    };

  const expenseCategories = [
    { name: 'Еда', amount: 1265.56 , color: "blue", month_total: 10000},
    { name: 'Магазин', amount: 2789.00, color: "red", month_total: 15000},
    { name: 'Курение', amount: 391.00, color: "green", month_total: 1000},
    { name: 'Кофейня', amount: 4570.50, color: "yellow", month_total: 9000},
    { name: 'Транспорт', amount: 1296.12, color: "white", month_total: 5000 },
    { name: 'Медицина', amount: 456.45, color: "gold", month_total: 3500 },
    { name: 'Туризм', amount: 0.00,  color: "yellow", month_total: 0},
    { name: 'Связь', amount: 220.94, color: "yellow", month_total: 500 },
    { name: 'Покупки', amount: 14567.38, color: "yellow", month_total: 25000 },
    { name: 'Спорт', amount: 5600.00, color: "yellow", month_total: 7000 },
  ];

  const incomeCategories = [
    { name: 'Счет 1', amount: 5000, month_total: 7000},
    { name: 'Счет 2', amount: 1200, month_total: 7000 },
  ];

  const [TransactionValue, setTransactionValue] = useState("0");
  const [firstNumber, setFirstNumber] = useState(null); // Первое число
  const [operation, setOperation] = useState(null); // Текущая операция
  const [isDecimal, setIsDecimal] = useState(false);
  const [shouldBlink, setShouldBlink] = useState(false); // Контролируем мерцание

  const MAX_DECIMAL_PLACES = 10; // Ограничение на количество знаков после запятой

  // Функция для округления числа до 10 знаков после запятой, без лишних нулей
  function roundToMaxDecimals(value) {
    const roundedValue = parseFloat(value).toFixed(MAX_DECIMAL_PLACES);
    return parseFloat(roundedValue); // Убираем лишние нули после запятой
  }

  function handleButtonClick(number) {
      setShouldBlink(false); // Останавливаем мерцание при вводе числа
      if (TransactionValue.length >= 19) {
        return;
      }

      // Проверяем, является ли текущее значение нулем или начальным значением
      if (TransactionValue === "0" || TransactionValue === 0) {
        setTransactionValue(number.toString()); // Заменяем ноль на введенное число
      } else if (isDecimal) {
        // Если входим в дробную часть, проверяем количество знаков
        const decimalPart = TransactionValue.split('.')[1] || "";
        if (decimalPart.length < MAX_DECIMAL_PLACES) {
          setTransactionValue(TransactionValue + number.toString()); // Добавляем цифру в дробную часть
        }
      } else {
        setTransactionValue(TransactionValue + number.toString()); // Добавляем цифру
      }
    }

  function handleDecimalClick() {
    if (!isDecimal) {
      setTransactionValue(TransactionValue + ".");
      setIsDecimal(true);
    }
  }

  function handleBackspace() {
    if (TransactionValue.length > 1) {
      if (TransactionValue.includes(".")) {
        const decimalPart = TransactionValue.split('.')[1];
        if (decimalPart.length === 1) {
          setTransactionValue(TransactionValue.split('.')[0]);
          setIsDecimal(false);
        } else {
          setTransactionValue(TransactionValue.slice(0, -1));
        }
      } else {
        setTransactionValue(TransactionValue.slice(0, -1));
      }
    } else {
      setTransactionValue("0");
      setIsDecimal(false);
    }
  }

  // Обработчик математических операций
  function handleOperationClick(op) {
      if (firstNumber === null) {
        // Если первое число еще не было установлено
        setFirstNumber(parseFloat(TransactionValue)); // Сохраняем первое число
        setTransactionValue("0"); // Обнуляем экран для второго числа
        setIsDecimal(false); // Сбрасываем режим дробного числа
      } else {
        // Если операция уже выбрана, просто меняем её
        setOperation(op);
        if (TransactionValue === "0" || TransactionValue === "0.0") {
          triggerBlink(); // Включаем мерцание один раз, если число равно 0
        } else {
          setTransactionValue("0"); // Сбрасываем второе число, если оно не ноль
          triggerBlink(); // Включаем мерцание
        }
      }
      setOperation(op); // Устанавливаем текущую операцию
      setIsDecimal(false); // Сбрасываем режим дробного числа при смене операции
    }

  function triggerBlink() {
    // Сбрасываем состояние мерцания и устанавливаем его заново
    setShouldBlink(false);
    setTimeout(() => {
      setShouldBlink(true);
    }, 10); // Короткая задержка для сброса анимации
  }

  // Обработчик для кнопки "="
  function handleEqualClick() {
    const secondNumber = parseFloat(TransactionValue);

    if (operation === "/" && secondNumber === 0) {
      alert("Ошибка: деление на 0 недопустимо!");
      setTransactionValue("0");
    } else {
      let result;
      switch (operation) {
        case "/":
          result = firstNumber / secondNumber;
          break;
        case "*":
          result = firstNumber * secondNumber;
          break;
        case "+":
          result = firstNumber + secondNumber;
          break;
        case "-":
          result = firstNumber - secondNumber;
          break;
        default:
          return;
      }
      result = roundToMaxDecimals(result); // Ограничиваем дробную часть до 10 знаков
      setTransactionValue(result.toString());
    }
    setOperation(null); // Сбрасываем операцию после выполнения
    setFirstNumber(null); // Сбрасываем первое число
    setShouldBlink(false); // Останавливаем мерцание
  }

  const displayedCategories =
    selectedCategoriesType === 'expense'
      ? expenseCategories
      : incomeCategories;

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

  const handlers = useSwipeable({
  onSwipedLeft: () => {
    if (modalVisible) {
      closeModal();
    } else {
      handleNextMonth();
    }
  },
  onSwipedRight: () => {
    if (modalVisible) {
      closeModal();
    } else {
      handlePrevMonth();
    }
  },
  preventDefaultTouchmoveEvent: true,
  trackMouse: true,
});

  const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  const formattedDate = `${monthNames[date.getMonth()]}, ${date.getFullYear()}`;





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


  const [incomePercentage, setIncomePercentage] = useState(0);
  const [expensePercentage, setExpensePercentage] = useState(0);

  useEffect(() => {
    const calculatePercentages = () => {
      const allTransactions = initialTransactions.flatMap((day) => day.data);

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

  const getDynamicGradient = (ratio, direction) => {
      console.log(ratio);

      if (ratio <= 0.33) {
        // Меньше 33%: зеленый → желтый или красный → желтый
        return direction === 'income'
          ? `linear-gradient(to top, #DC4E4E, #F8D982)`
          : `linear-gradient(to top, #5BC662, #F8D982)`;
      } else if (ratio <= 0.66) {
        // От 33% до 66%: зеленый → желтый → красный или красный → желтый → зеленый
        return direction === 'income'
          ? `linear-gradient(to top, #DC4E4E 33%, #F8D982 100%)`
          : `linear-gradient(to top, #5BC662 33%, #F8D982 100%)`;
      } else {
        // Больше 66%: полный градиент зеленый → красный или красный → зеленый
        return direction === 'income'
          ? `linear-gradient(to top, #DC4E4E, #F8D982, #5BC662)`
          : `linear-gradient(to top, #5BC662, #F8D982, #DC4E4E)`;
      }
    };


  return (
    <div {...handlers} className="categories-start-page">
      <div className={`modal-overlay ${modalVisible ? 'visible' : ''}`} onClick={closeModal}></div>
      <div className={`modal-content ${modalVisible ? 'visible' : ''}`}>
        <div className="modal-top-containers">
          <div className="container-left" >
            <div
                  className="categories-start-page-icon"
                  style={{ backgroundColor: '#4A90E2' }} // Задаем цвет квадратика
                >
              <img src="/static/images/wallet_images/money1.svg" alt="Icon" /> {/* Иконка слева */}
            </div>
            {selectedAccount && (
              <div className="text-container">
                <span className="small-text">Из счета:</span> {/* Текст "Со счета" */}
                <span className="large-text">Карта</span> {/* Название счета */}
              </div>
            )}
          </div>
          <div className="container-right" >
            <div
                  className="categories-start-page-icon"
                  style={{ backgroundColor: '#4A90E2' }} // Задаем цвет квадратика
                >
              <img src="/static/images/wallet_images/piggy_bank1.svg" alt="Icon" /> {/* Иконка справа */}
            </div>
            {selectedAccount && (
              <div className="text-container">
                <span className="small-text">На категорию:</span> {/* Текст "Со счета" */}
                <span className="large-text">{selectedAccount.name}</span> {/* Сумма */}
              </div>
            )}
          </div>
        </div>

        {/* Добавляем текстовое поле ниже */}
        <div className="modal-input-container">
          <input type="text" placeholder="Введите комментарий..." className="modal-input" />
        </div>

        <div className="modal-text-container">
            <p className={`modal-text ${shouldBlink ? "blink-once" : ""}`}>{TransactionValue} ₽</p>
        </div>

        <div class="grid-container">
          <div class="grid-item-grey" onClick={() => handleOperationClick("*")}>×</div>
          <div class="grid-item" onClick={() => handleButtonClick(7)}>7</div>
          <div class="grid-item" onClick={() => handleButtonClick(8)}>8</div>
          <div class="grid-item" onClick={() => handleButtonClick(9)}>9</div>
          <div className="grid-item" onClick={() => handleBackspace()}>
            <img src="/static/images/create_fin_account/backspace-button.svg" />
          </div>
          <div class="grid-item-grey" onClick={() => handleOperationClick("/")}>÷</div>
          <div class="grid-item" onClick={() => handleButtonClick(4)}>4</div>
          <div class="grid-item" onClick={() => handleButtonClick(5)}>5</div>
          <div class="grid-item" onClick={() => handleButtonClick(6)}>6</div>
          <div class="grid-item">
            <img src="/static/images/create_fin_account/calendar_frame.svg" />
          </div>

          <div class="grid-item-grey" onClick={() => handleOperationClick("+")}>+</div>
          <div class="grid-item" onClick={() => handleButtonClick(1)}>1</div>
          <div class="grid-item" onClick={() => handleButtonClick(2)}>2</div>
          <div class="grid-item" onClick={() => handleButtonClick(3)}>3</div>
          <div className="grid-item tall-item" onClick={operation ? handleEqualClick : null}>
            {operation ? "=" : <img src="/static/images/create_fin_account/save_change_button.svg" />}
          </div>
          <div class="grid-item-grey" onClick={() => handleOperationClick("-")}>−</div>
          <div class="grid-item">₽</div>
          <div class="grid-item" onClick={() => handleButtonClick(0)}>0</div>
          <div class="grid-item" onClick={() => handleDecimalClick()}>,</div>
        </div>
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
                        <img src="/static/images/transactions_images/calendar_diapazon.svg" alt="Image" className="two-container-center-image"/>
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

      <div className="transactions-page-top-container">
        <img src="/static/images/categories_images/statistic.svg" alt="Profile" className="categories-page-top-left-image" onClick={() => navigate('/categories-statistic-page')}/>
        <img src="/static/images/categories_images/pencil.svg" alt="Profile Right" className="categories-page-top-right-image" onClick={() => navigate('/edit-categories-page')}/>
        <p className="transactions-page-balance-text">Общий баланс</p>
        <p className="transactions-page-balance-amount">22.400₽</p>
      </div>

      <div className="transactions-page-bottom-container-with-line">
              <img
                src="/static/images/transactions_images/left-line.svg"
                alt="Left Photo"
                className="transactions-page-bottom-left-photo"
                onClick={handlePrevMonth}  // Назначаем функцию на левую стрелку
                style={{ cursor: 'pointer' }}  // Указатель на стрелке при наведении
              />
              <p className="transactions-page-bottom-container-text" onClick={openFirstModal} style={{ cursor: 'pointer' }}>{formattedDate}</p>
              <img
                src="/static/images/transactions_images/right-line.svg"
                alt="Right Photo"
                className="transactions-page-bottom-right-photo"
                onClick={handleNextMonth}  // Назначаем функцию на правую стрелку
                style={{ cursor: 'pointer' }}  // Указатель на стрелке при наведении
              />
        </div>
        <div className="transactions-page-percentage">
          <span>Доходы:</span>
          <span className="income-percentage">{incomePercentage}%</span>
          <span style={{ marginLeft: '20px' }}>Расходы:</span>
          <span className="expense-percentage">{expensePercentage}%</span>
        </div>

      <div className="categories-page-rectangle">
        <div
          className="categories-page-inner-rectangle"
          style={{
            backgroundColor: selectedCategoriesType === 'expense' ? 'rgba(18, 18, 18, 100)' : 'transparent'
          }}
          onClick={() => handleCategoriesTypeClick('expense')} >
          <p
              className="categories-page-rectangle-text"
              style={{
                color: selectedCategoriesType === 'expense' ? '#DC4E4E' : '#545454'
              }}
            >
              Расходы
            </p>
            <p
              className="categories-page-rectangle-expense-number"
              style={{
                color: selectedCategoriesType === 'expense' ? '#DC4E4E' : '#545454'
              }}
            >
              15.000₽
            </p>
        </div>
        <div
          className="categories-page-inner-rectangle"
          style={{
            backgroundColor: selectedCategoriesType === 'income' ? 'rgba(18, 18, 18, 100)' : 'transparent'
          }}
          onClick={() => handleCategoriesTypeClick('income')} >
          <p
              className="categories-page-rectangle-text"
              style={{
                color: selectedCategoriesType === 'income' ? '#5BC662' : '#545454'
              }}
            >
              Доходы
            </p>
            <p
              className="categories-page-rectangle-income-number"
              style={{
                color: selectedCategoriesType === 'income' ? '#5BC662' : '#545454'
              }}
            >
              25.000₽
            </p>
        </div>
      </div>

      <div className="categories-page-scrollable-area">
        <div className="categories-page-account-row">
          {displayedCategories.map((account, index) => (
            <div
              key={index}
              className="categories-page-account-item"
              onClick={() => handleAccountClick(account)}
            >
            {account.month_total > 0 && (
              <div className="categories-gradient-container">
                <div
                  className="categories-gradient-fill"
                  style={{
                    height: `${(account.amount / account.month_total) * 100}%`, // Высота пропорционально соотношению
                    background: getDynamicGradient(
                      account.amount / account.month_total,
                      selectedCategoriesType // Передаём тип (доходы или расходы)
                    ),
                  }}
                ></div>
              </div>
            )}

              <div
                  className="categories-account-icon"
                  style={{
                    backgroundColor: '#4A90E2', // Цвет квадратика
                    marginLeft: Number(account.month_total) === 0 ? '14px' : '7px', // Сдвиг влево на 5px, если month_total = 0
                  }}
                >
                  <img
                    src="/static/images/wallet_images/money1.svg"
                    alt="Account Icon"
                    className="categories-page-account-icon"
                  />
                </div>

              <div className="categories-page-account-info">
                <span className="categories-page-account-name">{account.name}</span>
                <span className="categories-page-account-amount">{Math.floor(account.amount).toLocaleString()},{(account.amount % 1).toFixed(2).slice(2)} ₽</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="wallet-main-page-bottom-container">
        <img src="/static/images/lower_buttons/wallet_accounts_inactive.svg" alt="Image 1" className="wallet-main-page-bottom-image" onClick={() => navigate('/wallet-main')}/>
        <img src="/static/images/lower_buttons/transactions_inactive.svg" alt="Image 2" className="wallet-main-page-bottom-image" onClick={() => navigate('/transaction-main')}/>
        <img src="/static/images/lower_buttons/category_active.svg" alt="Image 3" className="wallet-main-page-bottom-image" />
        <img src="/static/images/lower_buttons/investment_inactive.svg" alt="Image 4" className="wallet-main-page-bottom-image" onClick={() => navigate('/invest-managment-main')}/>
        <img src="/static/images/lower_buttons/personal_account_inactive.svg" alt="Image 5" className="wallet-main-page-bottom-image" onClick={() => navigate('/personal-account-main')}/>
      </div>
    </div>
  );
}

export default CategoriesPage;
