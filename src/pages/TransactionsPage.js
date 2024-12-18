import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TransactionsPage.css'; // Подключаем стили
import { useSwipeable } from 'react-swipeable';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import FilterModal from "../components/FilterModal";
import CalendarMainFrame from "../components/CalendarMainFrame"


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

function TransactionPage() {
  const navigate = useNavigate(); // Хук для навигации

  const [selectedTransactionsType, setSelectedTransactionsType] = useState('all');

  const handleTransactionsTypeClick = (transactionsType) => {
    setSelectedTransactionsType(transactionsType);
  };

  const [transactions, setTransactions] = useState(initialTransactions);

  const updateTransactions = (newTransactions) => {
    setTransactions(newTransactions);
  };

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

  const rightTransactions = [
    {
      number: 1,
      day: 'понедельник',
      total_sum: 1200,
      type_day: 1,
      data: [
        { sum: 1607, type: 1, category: 'Маракассы', from_account: 'Карта' },
        { sum: 400, type: 1, category: 'суууу ', from_account: 'Наличные' },
      ]
    },
    {
      number: 2,
      day: 'вторник',
      total_sum: 300,
      type_day: 0,
      data: [
      { sum: 800, type: 1, category: 'Категория 2', from_account: 'Карта' },
      { sum: 12400, type: 1, category: 'Категория 2', from_account: 'Карта' },
      { sum: 567400, type: 1, category: 'Категория 2', from_account: 'Карта' },
      { sum: 35600, type: 0, category: 'Категория 2', from_account: 'Карта' },
      { sum: 20760, type: 0, category: 'Категория 2', from_account: 'Карта' },
      { sum: 10990, type: 0, category: 'Категория 2', from_account: 'Карта' }
      ]
    }
  ];

  const income_transactions = [
    {
      number: 2,
      day: 'вторник',
      total_sum: 5000,
      type_day: 1,
      data: [
        { sum: 1000, type: 1, category: 'Зарплата', from_account: 'Банк' }
      ]
    }
  ];

  const expense_transactions = [
    {

      number: 3,
      day: 'среда',
      total_sum: -800,
      type_day: 0,
      data: [
        { sum: -300, type: 0, category: 'Покупки', from_account: 'Кредитная карта' }
      ]
    }
  ];

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

  const displayedTransactions =
    selectedTransactionsType === 'all'
      ? transactions
      : selectedTransactionsType === 'income'
      ? income_transactions
      : expense_transactions;

  const [date, setDate] = useState(new Date());

  // Функция для перехода на следующий месяц
  const handleNextMonth = () => {
    setTransactions(leftTransactions);
    setDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + 1);
      return newDate;
    });

  };

  // Функция для перехода на предыдущий месяц
  const handlePrevMonth = () => {
    setTransactions(rightTransactions);
    setDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() - 1);
      return newDate;
    });
  };

  const handlers = useSwipeable({
  onSwipedLeft: () => {
    if (modalVisible) {
      closeEditTransactionModal();
    } else {
      handleNextMonth();
    }
  },
  onSwipedRight: () => {
    if (modalVisible) {
      closeEditTransactionModal();
    } else {
      handlePrevMonth();
    }
  },
  preventDefaultTouchmoveEvent: true,
  trackMouse: true,
});

  const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  const formattedDate = `${monthNames[date.getMonth()]}, ${date.getFullYear()}`;

  const [showModal, setShowModal] = useState(false);
  const [isHiding, setIsHiding] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const openModal = () => {
  console.log("Image clicked");
  setShowModal(true);
  console.log(showModal); // Проверяем, меняется ли состояние на true
};

  const closeModal = () => {
    setIsHiding(true); // Запускаем анимацию закрытия
  };

  // Сброс состояния после завершения анимации закрытия
  useEffect(() => {
    if (isHiding) {
      const timer = setTimeout(() => {
        setShowModal(false); // Закрываем модальное окно
        setIsHiding(false); // Сбрасываем isHiding, чтобы оно снова открылось нормально
      }, 200); // Длительность таймера соответствует времени анимации

      return () => clearTimeout(timer); // Чистим таймер при размонтировании
    }
  }, [isHiding]);


  // Обработчик изменения значения ввода
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Обработчик нажатия на Enter
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      saveInputData();
    }
  };

  // Функция сохранения данных и закрытия модального окна
  const saveInputData = () => {
    console.log('Сохранённые данные:', inputValue); // Здесь можно добавить логику сохранения
    setInputValue(''); // Очищаем ввод
    closeModal(); // Закрываем модальное окно
  };

  const handleDateChange = (date, dateString) => {
    setDate(dateString);
  };

  const [activeStartDate, setActiveStartDate] = useState(new Date());

  // Определяем текущий месяц и год
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  // Функция для проверки, принадлежит ли дата текущему месяцу и году
  const isInCurrentMonth = (date) => {
    return (
      date.getFullYear() === currentYear &&
      date.getMonth() === currentMonth
    );
  };



  const [showCalendarModal, setShowCalendarModal] = useState(false);

  const openCalendarModal = () => setShowCalendarModal(true);

  const closeCalendarModal = () => {
    console.log("Выбранная дата:", date); // Вывод выбранной даты в консоль
    setShowCalendarModal(false);
  };

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

  const [modalVisible, setModalVisible] = useState(false);  // Управление видимостью модального окна
  const [selectedAccount, setSelectedAccount] = useState(null);  // Данные для выбранного аккаунта
  const [TransactionValue, setTransactionValue] = useState("0");
  const [firstNumber, setFirstNumber] = useState(null); // Первое число
  const [operation, setOperation] = useState(null); // Текущая операция
  const [isDecimal, setIsDecimal] = useState(false);
  const [shouldBlink, setShouldBlink] = useState(false); // Контролируем мерцание
  const [comment, setComment] = useState("");

  const MAX_DECIMAL_PLACES = 10; // Ограничение на количество знаков после запятой

  const handleAccountClick = (account) => {
      console.log(account)
      setSelectedAccount(account);
      setTransactionValue(account.sum)
      setModalVisible(true);
      setComment("") //Замена текста комментария
      setTimeout(() => {
        const modalContent = document.querySelector('.modal-content');
        if (modalContent) {
          modalContent.classList.add('visible'); // Trigger opening animation
        }
      }, 10); // A short delay to allow the DOM to update before adding the class
    };

  const closeEditTransactionModal = () => {
      const modal = document.querySelector('.modal-content');
      const overlay = document.querySelector('.modal-overlay');

      modal.classList.remove('visible');
      modal.classList.add('hidden');

      overlay.classList.remove('visible');
      overlay.classList.add('hidden');

      setTransactionValue(0)

      setTimeout(() => {
        setModalVisible(false); // Скрываем модальное окно после завершения анимации
      }, 300); // Совпадает с длительностью анимации закрытия
    };

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

  useEffect(() => {
  if (modalVisible) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
  return () => {
    document.body.style.overflow = 'auto';
  };
}, [modalVisible]);


  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);

  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  const [isClosing, setIsClosing] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 }); // Координаты модального окна
  const [modalContent, setModalContent] = useState(null);
  const [showFirstModal, setShowFirstModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(""); // Сохраняем выбор пользователя

  const handleSelect = (value) => {
    setSelectedOption(value); // Сохраняем выбранный элемент
    console.log("Выбранный период:", value); // Отладка
  };

  const openFirstModal = (event) =>  {
    const iconRect = event.target.getBoundingClientRect(); // Получаем размеры и позицию иконки
    const windowHeight = window.innerHeight;
    let calculatedY = iconRect.top + 10;
      if (calculatedY + 200 > windowHeight) { // Проверяем, не выходит ли окно за пределы
        calculatedY = iconRect.top - 150;
      }

      setModalPosition({
        x: iconRect.right - 20, // Сдвигаем чуть левее правого края
        y: calculatedY,
      });

      setIsAnimating(true); // Запускаем анимацию появления
      setTimeout(() => {
        setIsAnimating(false); // Завершаем анимацию
      }, 300); // Совпадает с длительностью анимации
    setShowFirstModal(true);

  }
  const closeFirstModal = () => {
    setIsClosing(true); // Устанавливаем флаг закрытия
      setTimeout(() => {
        setShowFirstModal(false);
        setIsClosing(false); // Убираем флаг закрытия
      }, 200); // Совпадает с длительностью анимации


  }

  return (
    <div {...handlers} className="transactions-main-page">
      <div className={`modal-overlay ${modalVisible ? 'visible' : ''}`} onClick={closeEditTransactionModal}></div>
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
                <span className="large-text">{selectedAccount.category}</span> {/* Сумма */}
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



        <div className="transactions-page-top-container">
            <img
              src="/static/images/transactions_images/filter.svg"
              alt="Profile"
              className="transactions-page-top-left-image"
              onClick={handleOpenModal}
            />
            <img
              src="/static/images/transactions_images/search.svg"
              alt="Profile"
              className="transactions-page-top-right-image"
              onClick={openModal}
            />

            <p className="transactions-page-balance-text">Общий баланс</p>
            <p className="transactions-page-balance-amount">22.400₽</p>
        </div>
        <FilterModal isOpen={isModalOpen} onClose={handleCloseModal} />

        {showModal && (
        <div
          className={`transactions-page-modal-overlay ${isHiding ? 'hide' : ''}`}
          onClick={closeModal}
        >
          <div className="transactions-page-modal-content" onClick={(e) => e.stopPropagation()}>
            <input
              type="text"
              placeholder="Введите текст..."
              className="transactions-page-modal-input"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown} // Обработка события клавиатуры
            />
          </div>
        </div>
      )}

        <div className="transactions-page-bottom-container-with-line">
              <img
                src="/static/images/transactions_images/left-line.svg"
                alt="Left Photo"
                className="transactions-page-bottom-left-photo"
                onClick={handlePrevMonth}  // Назначаем функцию на левую стрелку
                style={{ cursor: 'pointer' }}  // Указатель на стрелке при наведении
              />
              <p className="transactions-page-bottom-container-text"onClick={(e) => openFirstModal(e)} style={{ cursor: 'pointer' }}>{formattedDate}</p>
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

        <CalendarMainFrame
          showModal={showFirstModal}
          closeModal={closeFirstModal}
          modalPosition={modalPosition}
          isAnimating={isAnimating}
          isClosing={isClosing}
          onSelect={handleSelect}
        />

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

        <div className="transactions-page-scroll-container">
          {displayedTransactions.map((day, dayIndex) => (
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
                  <div className="transactions-page-item" key={transactionIndex} onClick={() => handleAccountClick(transaction)}>
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

        <div className="wallet-main-page-bottom-container">
            <img src="/static/images/lower_buttons/wallet_accounts_inactive.svg" alt="Image 1" className="wallet-main-page-bottom-image" onClick={() => navigate('/wallet-main')}/>
            <img src="/static/images/lower_buttons/transactions_active.svg" alt="Image 2" className="wallet-main-page-bottom-image" />
            <img src="/static/images/lower_buttons/category_inactive.svg" alt="Image 3" className="wallet-main-page-bottom-image" onClick={() => navigate('/categories-main')}/>
            <img src="/static/images/lower_buttons/investment_inactive.svg" alt="Image 4" className="wallet-main-page-bottom-image" onClick={() => navigate('/invest-managment-main')}/>
            <img src="/static/images/lower_buttons/personal_account_inactive.svg" alt="Image 5" className="wallet-main-page-bottom-image" onClick={() => navigate('/personal-account-main')}/>
        </div>
    </div>
  );
}

export default TransactionPage;