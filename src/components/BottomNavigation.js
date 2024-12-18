import React from 'react';

const BottomNavigation = ({ navigate }) => {
  return (
    <div className="wallet-main-page-bottom-container">
      <img
        src="/static/images/lower_buttons/wallet_accounts_active.svg"
        alt="Wallet"
        className="wallet-main-page-bottom-image"
      />
      <img
        src="/static/images/lower_buttons/transactions_inactive.svg"
        alt="Transactions"
        className="wallet-main-page-bottom-image"
        onClick={() => navigate('/transaction-main')}
      />
      <img
        src="/static/images/lower_buttons/category_inactive.svg"
        alt="Categories"
        className="wallet-main-page-bottom-image"
        onClick={() => navigate('/categories-main')}
      />
      <img src="/static/images/lower_buttons/investment_inactive.svg" alt="Image 4" className="wallet-main-page-bottom-image" onClick={() => navigate('/invest-managment-main')}/>
      <img src="/static/images/lower_buttons/personal_account_inactive.svg" alt="Image 5" className="wallet-main-page-bottom-image" onClick={() => navigate('/personal-account-main')}/>
    </div>
  );
};

export default BottomNavigation;
