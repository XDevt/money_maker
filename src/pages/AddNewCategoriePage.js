import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AddNewCategoriesPage.css';
import IconCustomizationModal from "../components/IconCustomizationModal";
import CurrencySelectorModal from "../components/CurrencySelectorModal";

function AddNewCategoriesPage() {
    const navigate = useNavigate();

    const [selectedAccountType, setSelectedAccountType] = useState('expense');

    const handleAccountTypeClick = (accountType) => {
        setSelectedAccountType(accountType);
      };


    const [firstNumber, setFirstNumber] = useState(null);
    const [activeAccountType, setActiveAccountType] = useState(null);
    const [operation, setOperation] = useState(null); // Текущая операция
    const [isDecimal, setIsDecimal] = useState(false);
    const [shouldBlink, setShouldBlink] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [TransferAccountValue, setTransferAccountValue] = useState("0");
    const [NowTransferAccountValue, setNowTransferAccountValue] = useState("0");

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

    setNowTransferAccountValue(TransferAccountValue);

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

    setTransferAccountValue(NowTransferAccountValue);

    setTimeout(() => {
      setModalVisible(false);
    }, 300);
  };

  const MAX_DECIMAL_PLACES = 10;

  // Выбираем активные переменные в зависимости от выбранного типа счета
  const getAccountValue = () => TransferAccountValue;

  const setAccountValue = (value) => setTransferAccountValue(value);

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



  const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState({
        code: "RUB", // Код валюты по умолчанию
        flag: "/static/images/flags/RUB.png", // Путь к флагу валюты
      });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveCurrencies = (currency) => {
    setSelectedCurrency(currency); // Сохраняем выбранную валюту
    console.log("Сохранено валюту:", currency);
    handleCloseModal();
  };

  return (
        <div className="add-new-categorie-page">

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
                    <img src="/static/images/create_fin_account/backspace-button.svg" />
                  </div>

                  <div class="add-new-fin-account-grid-item-grey" onClick={() => handleOperationClick("/")}>÷</div>
                  <div class="add-new-fin-account-grid-item" onClick={() => handleButtonClick(4)}>4</div>
                  <div class="add-new-fin-account-grid-item" onClick={() => handleButtonClick(5)}>5</div>
                  <div class="add-new-fin-account-grid-item" onClick={() => handleButtonClick(6)}>6</div>
                  <div className="add-new-fin-account-grid-item-tall-item" onClick={operation ? handleEqualClick : closeModalWithSavings}>
                    {operation ? "=" : <img src="/static/images/create_fin_account/save_change_button.svg" />}
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

            <div className="categories-statistic-header">
              <img
                src="/static/images/create_fin_account/close_button.svg"
                alt="Your Image"
                className="categories-statistic-page-top-left-image"
                onClick={() => navigate('/edit-categories-page')}
              />
              <p className="categories-statistic-title">Создание категории</p>
            </div>

            <div className="add-new-categorie-account-name-account">
                <p className="add-new-categorie-account-name">Название категории</p>
                <input type="text" className="add-new-categorie-input-account-name" placeholder="Введите название категории..." />
            </div>

            <div className="add-new-categorie-design" onClick={openIconModal}>
                <div className="add-new-fin-account-design-header">Изменить иконку</div>
                <div className="add-new-fin-account-icon-container"
                  style={{backgroundColor: selectedColor && selectedColor !== null ? selectedColor : 'rgba(94, 115, 233, 1)'}}>
                    <img
                      src={iconPath && iconPath !== null ? iconPath : "/static/images/create_fin_account/fin_logo.svg"}
                      alt="Account Icon"
                      className="add-new-fin-account-icon"
                    />
                </div>
                <IconCustomizationModal isVisible={isModalVisible} onClose={(iconPath, selectedColor) => closeIconModal(iconPath, selectedColor) } />
            </div>



            <div className="add-new-fin-account-account-type">
                <div className="add-new-categorie-account-type-header">Тип категории</div>
                <div
                    className={`add-new-fin-account-account-type-option ${
                      selectedAccountType === 'expense' ? 'active' : 'inactive'
                    }`}
                    onClick={() => handleAccountTypeClick('expense')}
                  >
                    <img
                      src={
                        selectedAccountType === 'expense'
                          ? '/static/images/create_fin_account/debt_active.svg'
                          : '/static/images/create_fin_account/debt_inactive.svg'
                      }
                      alt="Saving Account"
                      className="add-new-fin-account-account-type-icon"
                    />
                    <span>Расходы</span>
                </div>

              <div
                    className={`add-new-fin-account-account-type-option ${
                      selectedAccountType === 'income' ? 'active' : 'inactive'
                    }`}
                    onClick={() => handleAccountTypeClick('income')}
                  >
                <img
                  src={
                    selectedAccountType === 'income'
                      ? '/static/images/create_fin_account/saving_active.svg'
                      : '/static/images/create_fin_account/saving_inactive.svg'
                  }
                  alt="Debt Account"
                  className="add-new-fin-account-account-type-icon"
                />
                <span>Доходы</span>
              </div>
            </div>

            <div className="add-new-categorie-account-value">
              <span className="add-new-fin-account-account-balance-label">{selectedAccountType === 'expense' ? 'Лимит на месяц' : 'Желаемая прибыль'}</span>
              <div className="add-new-fin-account-balance-wrapper">
                  <div className="add-new-fin-account-balance-container" onClick={() => handleAccountClick('fin')}>
                    <span
                      className="add-new-fin-account-balance-text"
                      style={{
                        color: NowTransferAccountValue && NowTransferAccountValue !== "0" && NowTransferAccountValue !== 0
                          ? 'white'
                          : 'rgba(84, 84, 84, 1)',
                      }}
                    >
                      {NowTransferAccountValue && NowTransferAccountValue !== "0" && NowTransferAccountValue !== 0
                        ? `${NowTransferAccountValue} ₽`
                        : 'Введите сумму...'}
                    </span>
                  </div>
                      <div className="add-new-fin-account-currency-container" onClick={() => handleOpenModal()}>
                      <img
                        src={selectedCurrency.flag}
                        alt="Currency Icon"
                        className="add-new-fin-account-currency-icon"
                      />
                      <span className="add-new-fin-account-currency-text">{selectedCurrency.code}</span>
                    </div>
                    {isModalOpen && (
                      <CurrencySelectorModal
                        onClose={handleCloseModal}
                        onSave={handleSaveCurrencies}
                      />
                    )}
              </div>
            </div>

            <div className="add-new-categorie-create-button-container">
                  <button className="add-new-categorie-create-button">Создать категорию</button>
            </div>

            <div className="add-new-categorie-cancel-button-container" onClick={() => navigate('/edit-categories-page')}>
                  <button className="add-new-categorie-cancel-button">Отмена</button>
            </div>

        </div>
    )
}

export default AddNewCategoriesPage;