import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TransferBetweenWallets.css';


function renderAccountContainer(onClickHandler, iconPath, text) {
  return (
    <div className="transfer-between-wallets-account" onClick={onClickHandler}>
      <img
        src={iconPath}
        alt="Dropdown Icon"
        className="transfer-between-wallets-dropdown-icon"
      />
      <span className="transfer-between-wallets-account-text">{text}</span>
    </div>
  );
}



function TransferBetweenWallets() {
    const navigate = useNavigate();

    const [activeDebtType, setActiveDebtType] = useState('transfer');

    const handleDebtTypeClick = (type) => {
        setActiveDebtType(type);
      };

    const [toggleState, setToggleState] = useState("off");
    const [firstNumber, setFirstNumber] = useState(null);
    const [activeAccountType, setActiveAccountType] = useState(null);
    const [operation, setOperation] = useState(null); // Текущая операция
    const [isDecimal, setIsDecimal] = useState(false);
    const [shouldBlink, setShouldBlink] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const [TransferAccountValue, setTransferAccountValue] = useState("0");
    const [NowTransferAccountValue, setNowTransferAccountValue] = useState("0");

    const handleToggle = () => {
        setToggleState(toggleState === "off" ? "on" : "off");
    };

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

    useEffect(() => {
      const tg_user_id = '860752981';

      fetch(`http://localhost:5000/api/get-wallet-data?tg_user_id=${tg_user_id}`)
            .then((response) => response.json())
            .then((data) => {
              setSavingDetails(data.SavingDetails || []); // Сохраняем сберегательные счета
              setAccountDetails(data.accountDetails || []);
            })
            .catch((error) => {
              console.error('Ошибка при получении данных:', error);
            });
        }, []);


    const [isSaveModalVisible, setIsSaveModalVisible] = useState(false);
    const [savingDetails, setSavingDetails] = useState([]); // Для хранения данных сберегательных счетов
    const [accountDetails, setAccountDetails] = useState([]); // Для хранения данных сберегательных счетов
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0, width: 0 });

    const toggleSaveModal = (e) => {
      if (isSaveModalVisible) {
        setIsSaveModalVisible(false); // Закрываем окно
      } else {
        const button = e.target.closest('.transfer-between-wallets-account');
        if (button) {
          const rect = button.getBoundingClientRect();
          setModalPosition({
            top: rect.bottom + window.scrollY, // Нижний край кнопки
            left: rect.left + window.scrollX, // Левый край кнопки
            width: rect.width, // Ширина кнопки
          });
        }
        setIsSaveModalVisible(true); // Открываем окно
      }
    };

    const [isFinModalVisible, setIsFinModalVisible] = useState(false);

    const toggleFinModal = (e) => {
      if (isFinModalVisible) {
        setIsFinModalVisible(false); // Закрываем окно
      } else {
        const button = e.target.closest('.transfer-between-wallets-account');
        if (button) {
          const rect = button.getBoundingClientRect();
          setModalPosition({
            top: rect.bottom + window.scrollY, // Нижний край кнопки
            left: rect.left + window.scrollX, // Левый край кнопки
            width: rect.width, // Ширина кнопки
          });
        }
        setIsFinModalVisible(true); // Открываем окно
      }
    };

    const [isSwapped, setIsSwapped] = useState(false);

    const toggleWalletOrder = () => {
      setIsSwapped((prevState) => !prevState);
    };

    return (
      <div className="transfer-between-wallets">

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

      {isFinModalVisible && (
              <div className="fin-modal-overlay" onClick={toggleFinModal}>
                <div
                  className="fin-modal"
                  style={{
                    top: modalPosition.top, // Позиция сверху
                    left: modalPosition.left, // Позиция слева
                    width: modalPosition.width, // Ширина модального окна совпадает с шириной кнопки
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {accountDetails.map((account, index) => (
                    <div key={index} className="fin-account-item">
                      {/* Квадрат с цветом и фото */}
                      <div
                        className="account-color-box"
                        style={{ backgroundColor: account.color }}
                      >
                        <img
                          src={account.photo}
                          alt="Account Icon"
                          className="account-icon"
                        />
                      </div>
                      {/* Название и баланс */}
                      <div className="account-details">
                        <span className="account-name">{account.name}</span>
                        <span className="account-balance">{account.amount} ₽</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

        {isSaveModalVisible && (
              <div className="save-modal-overlay" onClick={toggleSaveModal}>
                {/* Модальное окно, расположенное под кнопкой */}
                <div
                  className="save-modal"
                  style={{
                    top: modalPosition.top, // Позиция сверху
                    left: modalPosition.left, // Позиция слева
                    width: modalPosition.width, // Ширина модального окна совпадает с шириной кнопки
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {savingDetails.map((saving, index) => (
                    <div key={index} className="save-account-item">
                      {/* Квадрат с цветом и фото */}
                      <div
                        className="account-color-box"
                        style={{ backgroundColor: saving.color }}
                      >
                        <img
                          src={saving.photo}
                          alt="Account Icon"
                          className="account-icon"
                        />
                      </div>
                      {/* Название и баланс */}
                      <div className="account-details">
                        <span className="account-name">{saving.name}</span>
                        <span className="account-balance">{saving.amount} ₽</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}



        <div className="add-new-fin-account-header">
          <img
            src="/static/images/create_fin_account/close_button.svg"
            alt="Close"
            className="add-new-fin-account-close-icon"
            onClick={() => navigate('/wallet-main')}
          />
          <span className="add-new-fin-account-title">Перевод</span>
        </div>

        <div className="transfer-between-wallets-type-container">
            <div className="transfer-between-wallets-type-options">
              <div
                className={`transfer-between-wallets-type-option ${
                  activeDebtType === 'transfer' ? 'active' : ''
                }`}
                onClick={() => handleDebtTypeClick('transfer')}
              >
                <img
                  src="/static/images/wallet_images/transferFrame.svg"
                  alt="Owed to Me"
                  className="transfer-between-wallets-type-icon"
                />
                <span className="transfer-between-wallets-type-text">Перевод</span>
              </div>
              <div
                className={`transfer-between-wallets-type-option ${
                  activeDebtType === 'pay_off_debt' ? 'active' : ''
                }`}
                onClick={() => handleDebtTypeClick('pay_off_debt')}
              >
                <img
                  src="/static/images/wallet_images/pay_off_debtFrame.svg"
                  alt="I Owe"
                  className="transfer-between-wallets-type-icon"
                />
                <span className="transfer-between-wallets-type-text">Погасить долг</span>
              </div>
            </div>
        </div>

        <div className="transfer-between-wallets-source">
          <span className="transfer-between-wallets-label">Откуда</span>
          {isSwapped
          ? renderAccountContainer(
              toggleSaveModal, // Функция для обработки клика
              "/static/images/wallet_images/SaveDropdown_arrow.svg", // Путь к иконке
              "Сберегательный счет" // Текст внутри
            )
          : renderAccountContainer(
              toggleFinModal, // Функция для обработки клика
              "/static/images/wallet_images/FinDropdown_arrow.svg", // Путь к иконке
              "Финансовый счет" // Текст внутри
            )}
        </div>

        <div className="transfer-divider">
          <div className="divider-line"></div>
          <div className="divider-icon">
            <img
              src="/static/images/wallet_images/changeWallets.svg"
              alt="Transfer Icon"
              className="divider-icon-image"
              onClick={() => toggleWalletOrder()}
            />
          </div>
          <div className="divider-line"></div>
        </div>

        <div className="transfer-between-wallets-source-save">
          <span className="transfer-between-wallets-label">Куда</span>
          {!isSwapped
          ? renderAccountContainer(
              toggleSaveModal, // Функция для обработки клика
              "/static/images/wallet_images/SaveDropdown_arrow.svg", // Путь к иконке
              "Сберегательный счет" // Текст внутри
            )
          : renderAccountContainer(
              toggleFinModal, // Функция для обработки клика
              "/static/images/wallet_images/FinDropdown_arrow.svg", // Путь к иконке
              "Финансовый счет" // Текст внутри
            )}
        </div>

        <div className="transfer-between-wallets-account-value">
          <span className="add-new-fin-account-account-balance-label">Баланс счета</span>
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

        <div className="add-new-fin-account-consider-balance">
            <span className="add-new-fin-account-consider-balance-label">Создать операцию</span>
            <label className="toggle-switch">
                <input type="checkbox" checked={toggleState === "on"} onChange={handleToggle}/>
                <span className="slider"></span>
            </label>
        </div>

        <div className="add-new-fin-account-create-button-container">
          <button className="add-new-fin-account-create-button">Перевести</button>
        </div>

      </div>
    )
}

export default TransferBetweenWallets;