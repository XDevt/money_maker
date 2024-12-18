import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/EditCategoriesPage.css';



function EditCategoriesPage() {
    const navigate = useNavigate();

    const [selectedCategoriesType, setSelectedCategoriesType] = useState('expense');

    const handleCategoriesTypeClick = (categoriesType) => {
        setSelectedCategoriesType(categoriesType);
      };

    const expenseCategories = [
        { name: 'Карта', amount: '1₽' , color: "blue"},
        { name: 'Наличные', amount: '2₽', color: "red"},
        { name: 'Карта', amount: '3₽', color: "green"},
        { name: 'Наличные', amount: '4₽', color: "yellow"},
        { name: 'Карта', amount: '5₽', color: "white" },
        { name: 'Наличные', amount: '6₽', color: "gold" },
        { name: 'Карта', amount: '7₽',  color: "yellow"},
        { name: 'Наличные', amount: '8₽', color: "yellow" },
        { name: 'Карта', amount: '9₽', color: "yellow" },
        { name: 'Наличные', amount: '10₽', color: "yellow" },
        { name: 'Карта', amount: '5₽', color: "white" },
        { name: 'Наличные', amount: '6₽', color: "gold" },
        { name: 'Карта', amount: '7₽',  color: "yellow"},
        { name: 'Наличные', amount: '8₽', color: "yellow" },
        { name: 'Карта', amount: '9₽', color: "yellow" },
        { name: 'Наличные', amount: '10₽', color: "yellow" },
      ];

    const incomeCategories = [
        { name: 'Счет 1', amount: '0₽' },
        { name: 'Счет 2', amount: '0₽' },
      ];

    const displayedCategories =
    selectedCategoriesType === 'expense'
      ? expenseCategories
      : incomeCategories;



    return (
        <div className="edit-categories-page">
            <div className="categories-statistic-header">
                <img
                  src="/static/images/create_fin_account/close_button.svg"
                  alt="Your Image"
                  className="categories-statistic-page-top-left-image"
                  onClick={() => navigate('/categories-main')}
                />
                <p className="categories-statistic-title">Внести изменения</p>
            </div>

            <div className="edit-categories-page-select-type-categories">
                <div
                  className="edit-categories-page-inner-rectangle"
                  style={{
                    backgroundColor: selectedCategoriesType === 'expense' ? '#5E73E9' : '#1C1C1E'
                  }}
                  onClick={() => handleCategoriesTypeClick('expense')} >
                  <p className="edit-categories-page-rectangle-text">Расходы</p>
                </div>
                <div
                  className="edit-categories-page-inner-rectangle"
                  style={{
                    backgroundColor: selectedCategoriesType === 'income' ? '#5E73E9' : '#1C1C1E'
                  }}
                  onClick={() => handleCategoriesTypeClick('income')} >
                  <p className="edit-categories-page-rectangle-text">Доходы</p>
                </div>
            </div>

            <div className="add-new-category-button" onClick={() => navigate('/add-new-categorie-page')}>
              <p className="add-new-category-button-text">Создать новую категорию</p>
              <img src="/static/images/categories_images/plus_button.svg" alt="Category" />
            </div>

            <div className="edit-categories-page-scrollable-area">
                <div className="edit-categories-page-account-row" onClick={() => navigate('/edit-current-categories-page')}>
                  {displayedCategories.map((account, index) => (
                    <div
                      key={index}
                      className="categories-page-account-item">
                      <div
                          className="categories-account-icon"
                          style={{
                            backgroundColor: '#4A90E2', // Цвет квадратика
                          }}
                        >
                        <img src="/static/images/wallet_images/money1.svg" alt="Account Icon" className="categories-page-account-icon" />
                      </div>
                      <div className="categories-page-account-info">
                        <span className="categories-page-account-name">{account.name}</span>
                        <span className="categories-page-account-amount">{account.amount}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>


        </div>
    )
}

export default EditCategoriesPage;