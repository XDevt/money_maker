import { useNavigate } from 'react-router-dom';
import '../styles/InvestManagmentPage.css'; // Подключаем стили

function InvestManagmentPage() {
  const navigate = useNavigate(); // Хук для навигации

  return (
    <div className="invest-managment-main-page">
          <div className="transactions-page-top-container">
            <img src="/static/images/invest_images/start.svg" alt="Profile" className="transactions-page-top-left-image" />
            <img src="/static/images/invest_images/points.svg" alt="Profile Right" className="transactions-page-top-right-image" />
          </div>


          <div className="invest-managment-main-page-top-container">
            <div className="invest-managment-main-page-top-container-left">
              <p className="invest-managment-main-page-main-text">Main</p>
              <p className="invest-managment-main-page-sub-text">--</p>
              <p className="invest-managment-main-page-change-text">-- -- 24h change</p>
            </div>
            <img src="/static/images/invest_images/circle.svg" alt="Profile" className="invest-managment-main-page-profile-image" />
            <div className="invest-managment-main-page-button-row">
              <button className="invest-managment-main-page-analytics-button">Analytics</button>
              <button className="invest-managment-main-page-history-button">History</button>
            </div>
          </div>

        <div className="wallet-main-page-bottom-container">
            <img src="/static/images/lower_buttons/wallet_accounts_inactive.svg" alt="Image 1" className="wallet-main-page-bottom-image" onClick={() => navigate('/wallet-main')}/>
            <img src="/static/images/lower_buttons/transactions_inactive.svg" alt="Image 2" className="wallet-main-page-bottom-image" onClick={() => navigate('/transaction-main')}/>
            <img src="/static/images/lower_buttons/category_inactive.svg" alt="Image 3" className="wallet-main-page-bottom-image" onClick={() => navigate('/categories-main')}/>
            <img src="/static/images/lower_buttons/investment_active.svg" alt="Image 4" className="wallet-main-page-bottom-image" />
            <img src="/static/images/lower_buttons/personal_account_inactive.svg" alt="Image 5" className="wallet-main-page-bottom-image" onClick={() => navigate('/personal-account-main')}/>
        </div>
    </div>
  );
}

export default InvestManagmentPage;