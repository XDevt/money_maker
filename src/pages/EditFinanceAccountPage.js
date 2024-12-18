import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/EditFinanceAccountPage.css';
import '../styles/AddNewFinanceAccount.css'; // Подключаем стили
import IconCustomizationModal from "../components/IconCustomizationModal";

function EditFinanceAccount() {
  const navigate = useNavigate(); // Хук для навигации

  const [selectedAccountType, setSelectedAccountType] = useState('financial');

  const [activeDebtType, setActiveDebtType] = useState('owed_to_me');

  const handleDebtTypeClick = (type) => {
    setActiveDebtType(type);
  };

  const handleAccountTypeClick = (accountType) => {
    setSelectedAccountType(accountType);
  };

  const [toggleState, setToggleState] = useState("off"); // Переменная состояния "on" или "off"
  const [OperationToggleState, setOperationToggleState] = useState("off");
  const [ExpensesToggleState, setExpensesToggleState] = useState("off");
  const [CategoryToggleState, setCategoryToggleState] = useState("off");


  const handleToggle = () => {
    setToggleState(toggleState === "off" ? "on" : "off");
  };

  const OperationHandleToggle = () => {
    setOperationToggleState(OperationToggleState === "off" ? "on" : "off");
  };

  const ExpensesHandleToggle = () => {
    setExpensesToggleState(ExpensesToggleState === "off" ? "on" : "off");
  };

  const CategoryHandleToggle = () => {
    setCategoryToggleState(CategoryToggleState === "off" ? "on" : "off");
  };

  const [firstNumber, setFirstNumber] = useState(null); // Первое число
  const [operation, setOperation] = useState(null); // Текущая операция
  const [isDecimal, setIsDecimal] = useState(false);
  const [shouldBlink, setShouldBlink] = useState(false); // Контролируем мерцание
  const [modalVisible, setModalVisible] = useState(false);

  const [finAccountValue, setFinAccountValue] = useState("0");
  const [NowFinAccountValue, setNowFinAccountValue] = useState("0");
  const [accountName, setAccountName] = useState("");
  const [savingAccountValue, setSavingAccountValue] = useState("0");
  const [nowSavingAccountValue, setNowSavingAccountValue] = useState("0");

  const [debtAccountValue, setDebtAccountValue] = useState("0");
  const [NowDebtAccountValue, setNowDebtAccountValue] = useState("0");
  const [PaidDebtAccountValue, setPaidDebtAccountValue] = useState("0");
  const [NowPaidDebtAccountValue, setNowPaidDebtAccountValue] = useState("0");


  const [activeAccountType, setActiveAccountType] = useState(null);

  const handleAccountClick = (accountType) => {
      setActiveAccountType(accountType);
      setModalVisible(true);

      setTimeout(() => {
        const modalContent = document.querySelector('.add-new-fin-account-modal-content');
        if (modalContent) {
          modalContent.classList.add('visible'); // Trigger opening animation
        }
      }, 10); // A short delay to allow the DOM to update before adding the class
    };

  // Закрытие модального окна с сохранением
  const closeModalWithSavings = () => {
    const modal = document.querySelector('.add-new-fin-account-modal-content');
    const overlay = document.querySelector('.add-new-fin-account-modal-overlay');

    modal.classList.remove('visible');
    modal.classList.add('hidden');

    overlay.classList.remove('visible');
    overlay.classList.add('hidden');

    if (activeAccountType === 'fin') {
      setNowFinAccountValue(finAccountValue); // Сохраняем изменения для финансового счета
    } else if (activeAccountType === 'saving') {
      setNowSavingAccountValue(savingAccountValue); // Сохраняем изменения для накопительного счета
    } else if (activeAccountType === 'debt') {
      setNowDebtAccountValue(debtAccountValue); // Сохраняем изменения для долгового счета
    } else if (activeAccountType === 'paid_debt') {
      setNowPaidDebtAccountValue(PaidDebtAccountValue); // Сохраняем изменения для долгового счета
    }

    setTimeout(() => {
      setModalVisible(false);
    }, 300);
  };

  const closeModal = () => {
    const modal = document.querySelector('.add-new-fin-account-modal-content');
    const overlay = document.querySelector('.add-new-fin-account-modal-overlay');

    modal.classList.remove('visible');
    modal.classList.add('hidden');

    overlay.classList.remove('visible');
    overlay.classList.add('hidden');

    // Сброс изменений в зависимости от типа счета
    if (activeAccountType === 'fin') {
      setFinAccountValue(NowFinAccountValue); // Отмена изменений для финансового счета
    } else if (activeAccountType === 'saving') {
      setSavingAccountValue(nowSavingAccountValue); // Отмена изменений для накопительного счета
    } else if (activeAccountType === 'debt') {
      setDebtAccountValue(NowDebtAccountValue); // Сохраняем изменения для долгового счета
    } else if (activeAccountType === 'paid_debt') {
      setPaidDebtAccountValue(NowPaidDebtAccountValue); // Сохраняем изменения для долгового счета
    }

    setOperation(null)

    setTimeout(() => {
      setModalVisible(false);
    }, 300);
  };

  const MAX_DECIMAL_PLACES = 10;

  // Выбираем активные переменные в зависимости от выбранного типа счета
  const getAccountValue = () =>
  activeAccountType === 'fin' ? finAccountValue
  : activeAccountType === 'saving' ? savingAccountValue
  : activeAccountType === 'debt' ? debtAccountValue
  : PaidDebtAccountValue;

  const setAccountValue = (value) => {
    if (activeAccountType === 'fin') {
      setFinAccountValue(value);
    } else if (activeAccountType === 'saving') {
      setSavingAccountValue(value);
    } else if (activeAccountType === 'debt') {
      setDebtAccountValue(value); // Сохраняем изменения для долгового счета
    } else if (activeAccountType === 'paid_debt') {
      setPaidDebtAccountValue(value); // Сохраняем изменения для долгового счета
    }
  };

  // Функция для округления числа до 10 знаков после запятой, без лишних нулей
  function roundToMaxDecimals(value) {
    const roundedValue = parseFloat(value).toFixed(MAX_DECIMAL_PLACES);
    return parseFloat(roundedValue); // Убираем лишние нули после запятой
  }

  function handleButtonClick(number) {
    setShouldBlink(false); // Останавливаем мерцание при вводе числа

    const accountValue = getAccountValue(); // Получаем текущее значение счета

    if (accountValue === "0" || accountValue === 0) {
      setAccountValue(number.toString()); // Заменяем ноль на введенное число
    } else if (isDecimal) {
      const decimalPart = accountValue.split('.')[1] || "";
      if (decimalPart.length < MAX_DECIMAL_PLACES) {
        setAccountValue(accountValue + number.toString()); // Добавляем цифру в дробную часть
      }
    } else {
      setAccountValue(accountValue + number.toString()); // Добавляем цифру
    }
  }

  function handleDecimalClick() {
    const accountValue = getAccountValue(); // Получаем текущее значение счета

    if (!isDecimal) {
      setAccountValue(accountValue + ".");
      setIsDecimal(true);
    }
  }

  function handleBackspace() {
    const accountValue = getAccountValue(); // Получаем текущее значение счета

    if (accountValue.length > 1) {
      if (accountValue.includes(".")) {
        const decimalPart = accountValue.split('.')[1];
        if (decimalPart.length === 1) {
          setAccountValue(accountValue.split('.')[0]);
          setIsDecimal(false);
        } else {
          setAccountValue(accountValue.slice(0, -1));
        }
      } else {
        setAccountValue(accountValue.slice(0, -1));
      }
    } else {
      setAccountValue("0");
      setIsDecimal(false);
    }
  }

  // Обработчик математических операций
  function handleOperationClick(op) {
    const accountValue = getAccountValue(); // Получаем текущее значение счета

    if (firstNumber === null) {
      setFirstNumber(parseFloat(accountValue)); // Сохраняем первое число
      setAccountValue("0"); // Обнуляем экран для второго числа
      setIsDecimal(false); // Сбрасываем режим дробного числа
    } else {
      setOperation(op);
      if (accountValue === "0" || accountValue === "0.0") {
        triggerBlink(); // Включаем мерцание один раз, если число равно 0
      } else {
        setAccountValue("0"); // Сбрасываем второе число, если оно не ноль
        triggerBlink(); // Включаем мерцание
      }
    }
    setOperation(op); // Устанавливаем текущую операцию
    setIsDecimal(false); // Сбрасываем режим дробного числа при смене операции
  }

  function triggerBlink() {
    setShouldBlink(false);
    setTimeout(() => {
      setShouldBlink(true);
    }, 10); // Короткая задержка для сброса анимации
  }

  // Обработчик для кнопки "="
  function handleEqualClick() {
    const accountValue = getAccountValue(); // Получаем текущее значение счета
    const secondNumber = parseFloat(accountValue);

    if (operation === "/" && secondNumber === 0) {
      alert("Ошибка: деление на 0 недопустимо!");
      setAccountValue("0");
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
      setAccountValue(result.toString());
    }
    setOperation(null); // Сбрасываем операцию после выполнения
    setFirstNumber(null); // Сбрасываем первое число
    setShouldBlink(false); // Останавливаем мерцание
  }

  const handleCreateAccountClick = async () => {
  // Асинхронный код с использованием await
      const data = {
        name: accountName,
        wallet_type: selectedAccountType,
        wallet_balance: NowFinAccountValue,
        save_dream: nowSavingAccountValue,
        wallet_icon: "/static/images/wallet_images/money1.svg",
        wallet_color: "blue",
        account_data: {
          paste_in_total: toggleState
        }
      };

      try {
        const response = await fetch('/api/create-account', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          console.log("Аккаунт успешно создан!");
          navigate('/wallet-main'); // Навигация при успешном ответе
        } else {
          console.error("Ошибка при создании аккаунта.");
        }
      } catch (error) {
        console.error("Произошла ошибка:", error);
      }
    };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [iconPath, setIconPath] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null)

  const openIconModal = () => setIsModalVisible(true);
  const closeIconModal = (iconPath, selectedColor) => {
      if (iconPath) {
          setIconPath(iconPath);
      }
      if (selectedColor) {
          setSelectedColor(selectedColor);
      }
      setIsModalVisible(false);
  }

  return (
    <div className="add-new-fin-account-container">
      <div className={`add-new-fin-account-modal-overlay ${modalVisible ? 'visible' : ''}`} onClick={closeModal}></div>
      <div className={`add-new-fin-account-modal-content ${modalVisible ? 'visible' : ''}`}>

        <div className="add-new-fin-account-modal-text-container">
            <p className={`add-new-fin-account-modal-text ${shouldBlink ? "blink-once" : ""}`}>{getAccountValue()} ₽</p>
        </div>

        <div class="add-new-fin-account-grid-container">
          <div class="add-new-fin-account-grid-item-grey" onClick={() => handleOperationClick("*")}>×</div>
          <div class="add-new-fin-account-grid-item" onClick={() => handleButtonClick(7)}>7</div>
          <div class="add-new-fin-account-grid-item" onClick={() => handleButtonClick(8)}>8</div>
          <div class="add-new-fin-account-grid-item" onClick={() => handleButtonClick(9)}>9</div>
          <div className="add-new-fin-account-grid-item" onClick={() => handleBackspace()}>
            <img alt="save_or_equality" src="/static/images/create_fin_account/backspace-button.svg" />
          </div>

          <div class="add-new-fin-account-grid-item-grey" onClick={() => handleOperationClick("/")}>÷</div>
          <div class="add-new-fin-account-grid-item" onClick={() => handleButtonClick(4)}>4</div>
          <div class="add-new-fin-account-grid-item" onClick={() => handleButtonClick(5)}>5</div>
          <div class="add-new-fin-account-grid-item" onClick={() => handleButtonClick(6)}>6</div>
          <div className="add-new-fin-account-grid-item-tall-item" onClick={operation ? handleEqualClick : closeModalWithSavings}>
            {operation ? "=" : <img alt="save_or_equality" src="/static/images/create_fin_account/save_change_button.svg" />}
          </div>

          <div class="add-new-fin-account-grid-item-grey" onClick={() => handleOperationClick("+")}>+</div>
          <div class="add-new-fin-account-grid-item" onClick={() => handleButtonClick(1)}>1</div>
          <div class="add-new-fin-account-grid-item" onClick={() => handleButtonClick(2)}>2</div>
          <div class="add-new-fin-account-grid-item" onClick={() => handleButtonClick(3)}>3</div>

          <div class="add-new-fin-account-grid-item-grey" onClick={() => handleOperationClick("-")}>−</div>
          <div class="add-new-fin-account-grid-item">₽</div>
          <div class="add-new-fin-account-grid-item" onClick={() => handleButtonClick(0)}>0</div>
          <div class="add-new-fin-account-grid-item" onClick={() => handleDecimalClick()}>.</div>
        </div>

      </div>

      <div className="add-new-fin-account-header">
          <img
            src="/static/images/create_fin_account/close_button.svg"
            alt="Close"
            className="add-new-fin-account-close-icon"
            onClick={() => navigate('/wallet-main')}
          />
          <span className="add-new-fin-account-title">Редактировать счёт</span>
        </div>


      <div className="add-new-fin-account-name-account">
        <p className="add-new-fin-account-account-name">Название счета</p>
        <input type="text" className="add-new-fin-account-input-account-name" placeholder="Введите название счета..." onChange={(e) => setAccountName(e.target.value)}/>
      </div>

      <div className="add-new-fin-account-account-type">
          <div className="add-new-fin-account-account-type-header">Тип Счета</div>

          <div
            className={`add-new-fin-account-account-type-option ${
              selectedAccountType === 'financial' ? 'active' : 'inactive'
            }`}
            onClick={() => handleAccountTypeClick('financial')}
          >
            <img
              src={
                selectedAccountType === 'financial'
                  ? '/static/images/create_fin_account/finance_active.svg'
                  : '/static/images/create_fin_account/finance_inactive.svg'
              }
              alt="Financial Account"
              className="add-new-fin-account-account-type-icon"
            />
            <span>Финансовый счет</span>
          </div>

          <div
            className={`add-new-fin-account-account-type-option ${
              selectedAccountType === 'saving' ? 'active' : 'inactive'
            }`}
            onClick={() => handleAccountTypeClick('saving')}
          >
            <img
              src={
                selectedAccountType === 'saving'
                  ? '/static/images/create_fin_account/saving_active.svg'
                  : '/static/images/create_fin_account/saving_inactive.svg'
              }
              alt="Saving Account"
              className="add-new-fin-account-account-type-icon"
            />
            <span>Сберегательный счет</span>
          </div>

          <div
            className={`add-new-fin-account-account-type-option ${
              selectedAccountType === 'debt' ? 'active' : 'inactive'
            }`}
            onClick={() => handleAccountTypeClick('debt')}
          >
            <img
              src={
                selectedAccountType === 'debt'
                  ? '/static/images/create_fin_account/debt_active.svg'
                  : '/static/images/create_fin_account/debt_inactive.svg'
              }
              alt="Debt Account"
              className="add-new-fin-account-account-type-icon"
            />
            <span>Долговой счет</span>
          </div>
        </div>


      <div className="add-new-fin-account-design" onClick={openIconModal}>
          <div className="add-new-fin-account-design-header">Изменить иконку</div>
          <div
            className="add-new-fin-account-icon-container"
            style={{
              backgroundColor:
                selectedColor && selectedColor !== null // Проверяем, что selectedColor задан и не равен 0
                    ? selectedColor // Используем выбранный цвет
                    : selectedAccountType === 'financial'
                    ? 'rgba(94, 115, 233, 1)'
                    : selectedAccountType === 'saving'
                    ? 'rgba(91, 198, 98, 1)'
                    : selectedAccountType === 'debt'
                    ? 'rgba(220, 78, 78, 1)'
                    : 'rgba(28, 28, 30, 1)', // Цвет по умолчанию
            }}
          >
            <img
              src={
                iconPath && iconPath !== null ? iconPath :
                selectedAccountType === 'financial'
                  ? '/static/images/create_fin_account/fin_logo.svg'
                  : selectedAccountType === 'saving'
                  ? '/static/images/create_fin_account/save_logo.svg'
                  : selectedAccountType === 'debt'
                  ? '/static/images/create_fin_account/debt_logo.svg'
                  : '/static/images/create_fin_account/default_logo.svg' // Иконка по умолчанию
              }
              alt="Account Icon"
              className="add-new-fin-account-icon"
            />
          </div>

          <IconCustomizationModal isVisible={isModalVisible} onClose={(iconPath, selectedColor) => closeIconModal(iconPath, selectedColor) } />

        </div>



        {(selectedAccountType === 'financial' || selectedAccountType === 'saving') && (
        <div className="add-new-fin-account-account-value">
          <span className="add-new-fin-account-account-balance-label">Баланс счета</span>
          <div className="add-new-fin-account-balance-wrapper">
              <div className="add-new-fin-account-balance-container" onClick={() => handleAccountClick('fin')}>
                <span
                  className="add-new-fin-account-balance-text"
                  style={{
                    color: NowFinAccountValue && NowFinAccountValue !== "0" && NowFinAccountValue !== 0
                      ? 'white'
                      : 'rgba(84, 84, 84, 1)',
                  }}
                >
                  {NowFinAccountValue && NowFinAccountValue !== "0" && NowFinAccountValue !== 0
                    ? `${NowFinAccountValue} ₽`
                    : 'Введите сумму...'}
                </span>
              </div>
                  <div className="add-new-fin-account-currency-container">
                  <img
                    src="static/images/create_fin_account/RU.svg"
                    alt="Currency Icon"
                    className="add-new-fin-account-currency-icon"
                  />
                  <span className="add-new-fin-account-currency-text">RUB</span>
                </div>
          </div>
        </div>
      )}


      {selectedAccountType === 'saving' && (
        <div className="add-new-fin-account-account-value">
          <span className="add-new-fin-account-account-balance-label">Целевая сумма</span>
          <div className="add-new-fin-account-balance-wrapper">
              <div className="add-new-fin-account-balance-container" onClick={() => handleAccountClick('saving')}>
                <span
                  className="add-new-fin-account-balance-text"
                  style={{
                    color: nowSavingAccountValue && nowSavingAccountValue !== "0" && nowSavingAccountValue !== 0
                      ? 'white'
                      : 'rgba(84, 84, 84, 1)',
                  }}
                >
                  {nowSavingAccountValue && nowSavingAccountValue !== "0" && nowSavingAccountValue !== 0
                    ? `${nowSavingAccountValue} ₽`
                    : 'Введите сумму...'}
                </span>
              </div>
                  <div className="add-new-fin-account-currency-container">
                  <img
                    src="static/images/create_fin_account/RU.svg"
                    alt="Currency Icon"
                    className="add-new-fin-account-currency-icon"
                  />
                  <span className="add-new-fin-account-currency-text">RUB</span>
                </div>
          </div>
        </div>
      )}

      {selectedAccountType === 'debt' && (
          <div className="add-new-debt-type-container">
            <span className="add-new-debt-type-label">Тип долга</span>
            <div className="add-new-debt-type-options">
              <div
                className={`add-new-debt-type-option ${
                  activeDebtType === 'owed_to_me' ? 'active' : ''
                }`}
                onClick={() => handleDebtTypeClick('owed_to_me')}
              >
                <img
                  src="/static/images/create_fin_account/owed_to_me.svg"
                  alt="Owed to Me"
                  className="add-new-debt-type-icon"
                />
                <span className="add-new-debt-type-text">Должны мне</span>
              </div>
              <div
                className={`add-new-debt-type-option ${
                  activeDebtType === 'i_owe' ? 'active' : ''
                }`}
                onClick={() => handleDebtTypeClick('i_owe')}
              >
                <img
                  src="/static/images/create_fin_account/i_owe.svg"
                  alt="I Owe"
                  className="add-new-debt-type-icon"
                />
                <span className="add-new-debt-type-text">Должен я</span>
              </div>
            </div>
          </div>
        )}



      {selectedAccountType === 'debt' && (
        <div className="add-new-fin-account-account-value">
          <span className="add-new-fin-account-account-balance-label">Сумма долга</span>
          <div className="add-new-fin-account-balance-wrapper">
              <div className="add-new-fin-account-balance-container" onClick={() => handleAccountClick('debt')}>
                <span
                  className="add-new-fin-account-balance-text"
                  style={{
                    color: NowDebtAccountValue && NowDebtAccountValue !== "0" && NowDebtAccountValue !== 0
                      ? 'white'
                      : 'rgba(84, 84, 84, 1)',
                  }}
                >
                  {NowDebtAccountValue && NowDebtAccountValue !== "0" && NowDebtAccountValue !== 0
                    ? `${NowDebtAccountValue} ₽`
                    : 'Введите сумму...'}
                </span>
              </div>
                  <div className="add-new-fin-account-currency-container">
                  <img
                    src="static/images/create_fin_account/RU.svg"
                    alt="Currency Icon"
                    className="add-new-fin-account-currency-icon"
                  />
                  <span className="add-new-fin-account-currency-text">RUB</span>
                </div>
          </div>
        </div>
      )}

      {selectedAccountType === 'debt' && (
        <div className="add-new-fin-account-account-value">
          <span className="add-new-fin-account-account-balance-label">Уже выплачено</span>
          <div className="add-new-fin-account-balance-wrapper">
              <div className="add-new-fin-account-balance-container" onClick={() => handleAccountClick('paid_debt')}>
                <span
                  className="add-new-fin-account-balance-text"
                  style={{
                    color: NowPaidDebtAccountValue && NowPaidDebtAccountValue !== "0" && NowPaidDebtAccountValue !== 0
                      ? 'white'
                      : 'rgba(84, 84, 84, 1)',
                  }}
                >
                  {NowPaidDebtAccountValue && NowPaidDebtAccountValue !== "0" && NowPaidDebtAccountValue !== 0
                    ? `${NowPaidDebtAccountValue} ₽`
                    : 'Введите сумму...'}
                </span>
              </div>
                  <div className="add-new-fin-account-currency-container">
                  <img
                    src="static/images/create_fin_account/RU.svg"
                    alt="Currency Icon"
                    className="add-new-fin-account-currency-icon"
                  />
                  <span className="add-new-fin-account-currency-text">RUB</span>
                </div>
          </div>
        </div>
      )}


      {(selectedAccountType === 'financial' || selectedAccountType === 'saving') && (
      <div className="add-new-fin-account-consider-balance">
        <span className="add-new-fin-account-consider-balance-label">Учитывать в общем балансе</span>
        <label className="toggle-switch">
            <input type="checkbox" checked={toggleState === "on"} onChange={handleToggle}/>
            <span className="slider"></span>
        </label>
      </div>
      )}

      {selectedAccountType === 'debt' && (
          <div className="add-new-debt-options-container">
            {/* Первый контейнер с ползунком */}
            <div className="add-new-debt-balance-container">
              <span className="add-new-debt-balance-label">Учитывать в общем балансе</span>
              <label className="toggle-switch">
                <input type="checkbox" checked={toggleState === "on"} onChange={handleToggle} />
                <span className="slider"></span>
              </label>
            </div>

            <div className="add-new-debt-operation-container">
              <div className="add-new-debt-operation-texts">
                <span className="add-new-debt-operation-title">Создать операцию</span>
                <span className="add-new-debt-operation-subtitle">
                  Создать операцию о получении/отправке этого долга
                </span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={OperationToggleState === "on"}
                  onChange={OperationHandleToggle}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="add-new-debt-operation-container">
              <div className="add-new-debt-operation-texts">
                <span className="add-new-debt-operation-title">Считать расходом</span>
                <span className="add-new-debt-operation-subtitle">
                  Считать переводы на этот счёт расходами
                </span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={ExpensesToggleState === "on"}
                  onChange={ExpensesHandleToggle}
                />
                <span className="slider"></span>
              </label>
            </div>

            {activeDebtType === 'i_owe' && (
                <div className="add-new-debt-operation-container">
                  <div className="add-new-debt-operation-texts">
                    <span className="add-new-debt-operation-title">Отображать в расходах</span>
                    <span className="add-new-debt-operation-subtitle">
                      Показывать данный счёт в категории расходов
                    </span>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={CategoryToggleState === "on"}
                      onChange={CategoryHandleToggle}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
            )}

            {activeDebtType === 'owed_to_me' && (
                <div className="add-new-debt-operation-container">
                  <div className="add-new-debt-operation-texts">
                    <span className="add-new-debt-operation-title">Отображать в доходах</span>
                    <span className="add-new-debt-operation-subtitle">
                      Показывать данный счёт в категории доходов
                    </span>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={CategoryToggleState === "on"}
                      onChange={CategoryHandleToggle}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              )}
          </div>
        )}

      <div className="edit-fin-account-create-button-container">
          <button className="edit-fin-account-create-button">Сохранить</button>
      </div>

      <div className="edit-fin-account-cancel-button-container" onClick={() => navigate('/wallet-main')}>
          <button className="edit-fin-account-cancel-button">Отмена</button>
      </div>

      <div className="spacer-element"></div>

    </div>
  );
}

export default EditFinanceAccount;
