import { useNavigate } from 'react-router-dom';
import '../styles/PersonalAccountPage.css'; // Подключаем стили

function PersonalAccountPage() {
  const navigate = useNavigate(); // Хук для навигации

  return (
    <div className="personal-account-main-page">

      <div className="scrollable-content-container">
        <div className="personal-account-header-container">
          <div className="profile-container">
            <img src="/static/images/personal_account/ava.jpg" alt="Profile" className="profile-image" />
            <div className="profile-info">
              <p className="name">Денис Бульгак</p>
              <p className="username">@DenisBulgac</p>
            </div>
          </div>
          <button className="premium-button" style={{ cursor: 'pointer' }}>
            <img src="/static/images/personal_account/premium_button.svg" alt="Premium" />
          </button>
        </div>

        <div className="earnings-container">
          <p className="earnings-text">219 FCM</p>
          <button className="earnings-button">Заработать</button>
        </div>

        <div className="options-container">
          <div className="option-container" style={{ cursor: 'pointer' }}>
            <img src="/static/images/personal_account/notification.svg" alt="Notification" className="option-icon" />
            <p className="option-text">Уведомления</p>
          </div>
          <div className="option-container" style={{ cursor: 'pointer' }} >
            <img src="/static/images/personal_account/medal.svg" alt="Subscription" className="option-icon" />
            <p className="option-text">Моя подписка</p>
          </div>
          <div className="option-container" style={{ cursor: 'pointer' }}>
            <img src="/static/images/personal_account/video.svg" alt="Instruction" className="option-icon" />
            <p className="option-text">Инструкция</p>
          </div>
          <div className="option-container" style={{ cursor: 'pointer' }}>
            <img src="/static/images/personal_account/style.svg" alt="Styling" className="option-icon" />
            <p className="option-text">Стилизация</p>
          </div>
          <div className="option-container" style={{ cursor: 'pointer' }}>
            <img src="/static/images/personal_account/formatting.svg" alt="Formatting" className="option-icon" />
            <p className="option-text">Форматирование</p>
          </div>
          <div className="option-container" style={{ cursor: 'pointer' }}>
            <img src="/static/images/personal_account/support.svg" alt="Support" className="option-icon" />
            <p className="option-text">Поддержка</p>
          </div>
        </div>
      </div>

      <div className="bottom-container">
          <img src="/static/images/lower_buttons/wallet_accounts_inactive.svg" alt="Image 1" className="bottom-image" onClick={() => navigate('/wallet-main')}/>
          <img src="/static/images/lower_buttons/transactions_inactive.svg" alt="Image 2" className="bottom-image" onClick={() => navigate('/transaction-main')}/>
          <img src="/static/images/lower_buttons/category_inactive.svg" alt="Image 3" className="bottom-image" onClick={() => navigate('/categories-main')}/>
          <img src="/static/images/lower_buttons/investment_inactive.svg" alt="Image 4" className="bottom-image" onClick={() => navigate('/invest-managment-main')}/>
          <img src="/static/images/lower_buttons/personal_account_active.svg" alt="Image 5" className="bottom-image" />
      </div>
    </div>
  );
}

export default PersonalAccountPage;