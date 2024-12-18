import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



// Импорт компонентов
import Wallet from './pages/WalletPage';
import WalletViewPage from './pages/WalletViewPage'; // Импорт новой страницы
import AddNewFinanceAccount from './pages/AddNewFinanceAccount';
import TransactionPage from './pages/TransactionsPage'
import CategoriesPage from './pages/CategoriesPage'
import InvestManagmentPage from './pages/InvestManagmentPage'
import PersonalAccountPage from './pages/PersonalAccountPage'
import CategoriesStatisticPage from './pages/CategoriesStatisticPage'
import EditFinanceAccountPage from './pages/EditFinanceAccountPage'
import EditCategoriesPage from './pages/EditCategoriesPage'
import AddNewCategoriePage from './pages/AddNewCategoriePage'
import EditCurrentCategoriePage from './pages/EditCurrentCategoriePage'
import FinanceAccountTransactions from './pages/FinanceAccountTransactions'
import TransferBetweenWallets from './pages/TransferBetweenWallets';

import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Wallet />} />
          <Route path="/wallet-view" element={<WalletViewPage />} />
          <Route path="/wallet-main" element={<Wallet />} />
          <Route path="/add-new-finance-wallet" element={<AddNewFinanceAccount />} />
          <Route path="/transaction-main" element={<TransactionPage />} />
          <Route path="/categories-main" element={<CategoriesPage />} />
          <Route path="/invest-managment-main" element={<InvestManagmentPage />} />
          <Route path="/personal-account-main" element={<PersonalAccountPage />} />
          <Route path="/categories-statistic-page" element={<CategoriesStatisticPage />} />
          <Route path="/edit-finance-account-page" element={<EditFinanceAccountPage />} />
          <Route path="/edit-categories-page" element={<EditCategoriesPage />} />
          <Route path="/add-new-categorie-page" element={<AddNewCategoriePage />} />
          <Route path="/edit-current-categories-page" element={<EditCurrentCategoriePage />} />
          <Route path="/finance-account-transactions-page" element={<FinanceAccountTransactions />} />
          <Route path="/transfer-between-wallets" element= {<TransferBetweenWallets/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
