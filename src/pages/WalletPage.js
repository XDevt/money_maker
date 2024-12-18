import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/WalletPage.css';


function WalletPage() {
  const [balanceTotal, setBalanceTotal] = useState(0);
  const [accountsTotal, setAccountsTotal] = useState(0);
  const [savingsTotal, setSavingsTotal] = useState(0);
  const [accountDetails, setAccountDetails] = useState([]);
  const [SavingDetails, setSavingDetails] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
  // Замените '12345' на реальный id пользователя
  const tg_user_id = '860752981';  // Ваш пользовательский ID

  // Отправляем GET-запрос при загрузке страницы
  fetch(`http://localhost:5000/api/get-wallet-data?tg_user_id=${tg_user_id}`)
    .then(response => response.json())
    .then(data => {
      // Обновляем состояние компонент с полученными данными
      setAccountsTotal(data.accountsTotal);
      setSavingsTotal(data.savingsTotal);
      setAccountDetails(data.accountDetails);
      setSavingDetails(data.SavingDetails);
      setBalanceTotal(data.balanceTotal);
      setLoading(false);  // Завершаем загрузку
    })
    .catch(error => {
      console.error("Ошибка при получении данных:", error);
    });
}, []);

  const navigate = useNavigate();

  const [isClosing, setIsClosing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 }); // Координаты модального окна
  const [modalContent, setModalContent] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const openModal = (event, account) => {
      const iconRect = event.target.getBoundingClientRect(); // Получаем размеры и позицию иконки
      const windowHeight = window.innerHeight;

      // Рассчитываем позицию окна
      let calculatedY = iconRect.top + 10;
      if (calculatedY + 200 > windowHeight) { // Проверяем, не выходит ли окно за пределы
        calculatedY = iconRect.top - 150;
      }

      setModalPosition({
        x: iconRect.right - 20, // Сдвигаем чуть левее правого края
        y: calculatedY,
      });

      setModalContent(account);
      setIsAnimating(true); // Запускаем анимацию появления
      setTimeout(() => {
        setIsAnimating(false); // Завершаем анимацию
      }, 300); // Совпадает с длительностью анимации
      setModalVisible(true);
    };

  const closeModal = () => {
      setIsClosing(true); // Устанавливаем флаг закрытия
      setTimeout(() => {
        setModalVisible(false); // Закрываем окно после завершения анимации
        setModalContent(null); // Очищаем данные
        setIsClosing(false); // Убираем флаг закрытия
      }, 200); // Совпадает с длительностью анимации
    };

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const [accountToDelete, setAccountToDelete] = useState(null);

  const openDeleteModal = (account) => {
  setModalVisible(false);
  setAccountToDelete(account); // Устанавливаем данные счета
  setDeleteModalVisible(true); // Показываем модальное окно

  // Устанавливаем флаг для анимации
  setTimeout(() => setIsAnimating(true), 10);
};

const closeDeleteModalAnimated = () => {
  setIsClosing(true); // Запускаем анимацию закрытия
  setTimeout(() => {
    setDeleteModalVisible(false); // Скрываем окно после завершения анимации
    setIsClosing(false); // Сбрасываем состояние
  }, 300); // Длительность анимации совпадает с CSS
};

const closeDeleteModal = () => {
  setDeleteModalVisible(false); // Закрываем окно без анимации
  setIsAnimating(false); // Убираем класс анимации
  setIsClosing(false); // Сбрасываем состояние
};

  const handleDeleteConfirm = () => {
      closeDeleteModal(); // Закрываем модальное окно подтверждения
      openSuccessModal(); // Открываем модальное окно успешного удаления
    };

    // Открытие окна успешного удаления
  // Открытие окна успешного удаления
    const openSuccessModal = () => {
      setSuccessModalVisible(true);
      setIsClosing(false); // Убедимся, что закрытие не началось

      setTimeout(() => {
        handleCloseSuccessModal(); // Закрываем окно через 1.5 секунды
      }, 1000);
    };

    // Закрытие с анимацией
    const handleCloseSuccessModal = () => {
      setIsClosing(true); // Запускаем анимацию закрытия

      setTimeout(() => {
        setSuccessModalVisible(false); // Полностью скрываем окно после анимации
        setIsClosing(false); // Сбрасываем состояние
      }, 300); // Длительность совпадает с анимацией закрытия
    };



if (!loading){
  return (
    <div className="wallet-main-page">

    {deleteModalVisible && (
  <div
    className="delete-modal-overlay"
    onClick={closeDeleteModalAnimated} // Анимация при нажатии за пределами окна
  >
    <div
      className={`delete-modal-content ${isAnimating ? 'animating' : ''} ${
        isClosing ? 'closing' : ''
      }`}
      onClick={(e) => e.stopPropagation()} // Останавливаем всплытие событий
    >
      <img
        src="static/images/wallet_images/DeleteFrame.svg"
        alt="Delete Icon"
        className="delete-modal-icon"
      />
      <p className="delete-modal-text">
        Уверены, что хотите удалить этот{' '}
        <span
          style={{
            color:
              accountToDelete?.type === 'financial'
                ? '#5E73E9'
                : accountToDelete?.type === 'saving'
                ? '#5BC662'
                : '#DC4E4E',
          }}
        >
          {accountToDelete?.type === 'financial'
            ? 'финансовый'
            : accountToDelete?.type === 'saving'
            ? 'сберегательный'
            : 'долговой'}
        </span>{' '}
        счёт?
      </p>
      <p className="delete-modal-account-name">“{accountToDelete?.name}”</p>
      <div className="delete-modal-buttons">
        <button
          className="delete-modal-cancel-button"
          onClick={closeDeleteModalAnimated} // Анимация при нажатии на Назад
        >
          Назад
        </button>
        <button
          className="delete-modal-confirm-button"
          onClick={handleDeleteConfirm} // Без анимации при подтверждении
        >
          <img
            src="/static/images/wallet_images/delete_account.svg"
            alt="Delete Icon Small"
          />
          Удалить
        </button>
      </div>
    </div>
  </div>
)}

    {successModalVisible && (
      <div className="success-modal-overlay">
        <div
          className={`success-modal-content ${isClosing ? 'closing' : ''}`}
        >
          <img
            src="static/images/wallet_images/DeleteSuccess.svg"
            alt="Success Icon"
            className="success-modal-icon"
          />
          <p className="success-modal-text">Удаление успешно завершено!</p>
        </div>
      </div>
    )}


    {modalVisible && (
      <div className="wallet-modal-overlay" onClick={closeModal}>
        <div
          className={`wallet-modal-content ${isAnimating ? 'animating' : ''} ${isClosing ? 'closing' : ''}`}
          style={{
            position: 'absolute',
            top: `${modalPosition.y}px`,
            left: `${modalPosition.x}px`,
            transform: 'translate(-100%, 0)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <ul className="wallet-modal-menu">
            <li className="wallet-modal-item" onClick={() => navigate('/transfer-between-wallets')}>
              <img src="/static/images/wallet_images/transfer_account.svg" alt="Transfer" />
              Перевести
            </li>
            <li className="wallet-modal-item" onClick={() => navigate('/finance-account-transactions-page')}>
              <img src="/static/images/wallet_images/transactions_account.svg" alt="History"/>
              История операций
            </li>
            <li className="wallet-modal-item" onClick={() => navigate('/edit-finance-account-page')}>
              <img src="/static/images/wallet_images/edit_account.svg" alt="Edit" />
              Изменить
            </li>
            <li className="wallet-modal-item delete" onClick={() => openDeleteModal(modalContent)}>
              <img src="/static/images/wallet_images/delete_account.svg" alt="Delete" />
              Удалить
            </li>
          </ul>
        </div>
      </div>
    )}



      <div className="wallet-main-page-overview-container">
          <div className="wallet-main-page-overview-header">
            <div className="wallet-main-page-balance-info">
              <span className="wallet-main-page-balance-label">Общий баланс</span>
              <span className="wallet-main-page-balance-total">{Math.floor(balanceTotal).toLocaleString()},{(balanceTotal % 1).toFixed(2).slice(2)} ₽</span>
            </div>
            <div className="wallet-main-page-add-button">
              <img src="static/images/wallet_images/Plus icon.svg" alt="Add" className="wallet-main-page-add-icon" onClick={() => navigate('/add-new-finance-wallet')}/>
            </div>
          </div>
          <div className="wallet-main-page-overview-scale">
            <div
              className="wallet-main-page-scale-finances"
              style={{ width: `${(accountsTotal / balanceTotal) * 100}%` }}
            ></div>
            <div
              className="wallet-main-page-scale-savings"
              style={{
                width: `${(savingsTotal / balanceTotal) * 100}%`,
                left: `${(accountsTotal / balanceTotal) * 100}%`,
              }}
            ></div>
            <div
              className="wallet-main-page-scale-debts"
              style={{
                width: `${100 - ((accountsTotal + savingsTotal) / balanceTotal) * 100}%`,
                left: `${((accountsTotal + savingsTotal) / balanceTotal) * 100}%`,
              }}
            ></div>
          </div>
          <div className="wallet-main-page-overview-legend">
            <div className="wallet-main-page-legend-item">
              <span className="wallet-main-page-legend-color wallet-main-page-finances"></span> Финансы
            </div>
            <div className="wallet-main-page-legend-item">
              <span className="wallet-main-page-legend-color wallet-main-page-savings"></span> Сбережения
            </div>
            <div className="wallet-main-page-legend-item">
              <span className="wallet-main-page-legend-color wallet-main-page-debts"></span> Долги
            </div>
          </div>
        </div>


        <div className="scrollable-area">
          <div className="wallet-accounts-summary">
            <span className="accounts-label">Счета</span>
            <span className="accounts-amount">{Math.floor(accountsTotal).toLocaleString()},{(accountsTotal % 1).toFixed(2).slice(2)} ₽</span>
          </div>
          <div className="account-container">
            {accountDetails.map((account, index) => (
              <div key={index} className="wallet-account-item">
                <div
                  className="wallet-account-icon"
                  style={{ backgroundColor: account.color || '#4A90E2' }} // Задаем цвет квадратика
                >
                  <img src="/static/images/wallet_images/money1.svg" alt="Account Icon" />
                </div>
                <div className="wallet-account-details">
                  <span className="wallet-account-name">{account.name}</span>
                  <span className="wallet-account-percentage">
                    {((account.amount / accountsTotal) * 100).toFixed(2)}%
                  </span>
                </div>
                <div className="wallet-account-balance">
                  <span className="wallet-account-main-amount">
                    {Math.floor(account.amount).toLocaleString()}
                  </span>
                  <span className="wallet-account-cents">
                    ,{(account.amount % 1).toFixed(2).slice(2)} ₽
                  </span>
                  <img
                    src="/static/images/wallet_images/Frame.svg"
                    alt="Menu"
                    className="wallet-account-menu-icon"
                    onClick={(e) => openModal(e, account)}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="savings-header">
            <span className="savings-label">Сбережения</span>
            <span className="savings-amount">{Math.floor(savingsTotal).toLocaleString()},{(savingsTotal % 1).toFixed(2).slice(2)} ₽</span>
          </div>
          <div className="account-container">
            {SavingDetails.map((account, index) => (
              <div key={index} className="wallet-account-item">
                <div
                  className="wallet-account-icon"
                  style={{ backgroundColor: account.color || '#66CC66' }} // Задаем цвет квадратика
                >
                  <img src="/static/images/wallet_images/piggy_bank1.svg" alt="Account Icon" />
                </div>
                <div className="wallet-account-details">
                  <span className="wallet-account-name">{account.name}</span>
                  <span className="wallet-account-percentage">
                    {((account.amount / savingsTotal) * 100).toFixed(2)}%
                  </span>
                </div>
                <div className="wallet-account-balance">
                  <span className="wallet-account-main-amount">
                    {Math.floor(account.amount).toLocaleString()}
                  </span>
                  <span className="wallet-account-cents">
                    ,{(account.amount % 1).toFixed(2).slice(2)} ₽
                  </span>
                  <img
                    src="/static/images/wallet_images/Frame.svg"
                    alt="Menu"
                    className="wallet-account-menu-icon"
                    onClick={(e) => openModal(e, account)}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="spacer-element"></div>
        </div>




      <div className="wallet-main-page-bottom-container">
        <img src="/static/images/lower_buttons/wallet_accounts_active.svg" alt="Image 1" className="wallet-main-page-bottom-image" />
        <img src="/static/images/lower_buttons/transactions_inactive.svg" alt="Image 2" className="wallet-main-page-bottom-image" onClick={() => navigate('/transaction-main')}/>
        <img src="/static/images/lower_buttons/category_inactive.svg" alt="Image 3" className="wallet-main-page-bottom-image" onClick={() => navigate('/categories-main')}/>
        <img src="/static/images/lower_buttons/investment_inactive.svg" alt="Image 4" className="wallet-main-page-bottom-image" onClick={() => navigate('/invest-managment-main')}/>
        <img src="/static/images/lower_buttons/personal_account_inactive.svg" alt="Image 5" className="wallet-main-page-bottom-image" onClick={() => navigate('/personal-account-main')}/>
      </div>
    </div>
  );
}
}

export default WalletPage;
