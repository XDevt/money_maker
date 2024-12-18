import { useState, useRef, useEffect } from "react";
import "../styles/FilterModal.css";
import CategoryFilter from "./CategoryFilter"
import WalletFilter from "./WalletsFilter"
import TypeOfExpensesFilter from "./TypeOfExpensesFilter"

const FilterModal = ({ isOpen, onClose }) => {
  const [sliderValue, setSliderValue] = useState(500);
  const maxValue = 500;
  const sliderRef = useRef(null);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.addEventListener('input', handleSliderChange);
    }
    return () => {
      if (sliderRef.current) {
        sliderRef.current.removeEventListener('input', handleSliderChange);
      }
    };
  }, []);

  const handleSliderChange = () => {
    const value = parseInt(sliderRef.current.value, 10); // Парсим значение как целое число
    setSliderValue(value);
    updateSliderBackground();
  };

  const updateSliderBackground = () => {
    const value = parseInt(sliderRef.current.value, 10);
    const percentage = (value / maxValue) * 100;
    sliderRef.current.style.background = `linear-gradient(to right, #5E73E9 0%, #5E73E9 ${percentage}%, #222327 ${percentage}%, #222327 100%)`;
  };

  const resetSliderBackground = () => {
    const value = maxValue;
    const percentage = (value / maxValue) * 100;
    sliderRef.current.style.background = `linear-gradient(to right, #5E73E9 0%, #5E73E9 ${percentage}%, #222327 ${percentage}%, #222327 100%)`;
  };

  const handleApply = () => {
    console.log("Filters applied:", sliderValue); // Добавлено отображение значения слайдера
    onClose();
  };

  const handleReset = () => {
    console.log(maxValue);
    setSliderValue(maxValue);
    resetSliderBackground();
    console.log(sliderValue);
    console.log("Filters reset");
  };

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };


  const [showCategoryFilterModal, setCategoryFilterModal] = useState(false);
  const [showWalletFilterModal, setWalletFilterModal] = useState(false);
  const [showTypeOfExpensesFilterModal, setTypeOfExpensesFilterModal] = useState(false);

  const [categoriesFilter, setСategoriesFilter] = useState(null);
  const [walletsFilter, setWalletsFilter] = useState(null);
  const [TypeOfExpenseFilter, setTypeOfExpenseFilter] = useState(null);


  const openCategoryFilterModal = () => setCategoryFilterModal(true);
  const closeCategoryFilterModal = () => setCategoryFilterModal(false);


  const handleCategoryFilter = (filter) => {
    setСategoriesFilter(filter); // Сохраняем выбранную валюту
    closeCategoryFilterModal();
  };

  const openWalletFilterModal = () => setWalletFilterModal(true);
  const closeWalletFilterModal = () => setWalletFilterModal(false);

  const handleWalletFilter = (filter) => {
    setWalletsFilter(filter); // Сохраняем выбранную валюту
    closeWalletFilterModal();
  };


  const openTypeOfExpensesFilter = () => {
    setTypeOfExpensesFilterModal(true);
    console.log("open click");
  }
  const closeTypeOfExpensesFilter = () => setTypeOfExpensesFilterModal(false);

  const handleTypeOfExpensesFilter = (filter) => {
    setTypeOfExpenseFilter(filter); // Сохраняем выбранную валюту
    closeTypeOfExpensesFilter();
  };


  return (
    <div className={`filter-modal-overlay ${isOpen ? "visible" : ""}`} onClick={handleOverlayClick}>
      {showCategoryFilterModal && (
                      <CategoryFilter
                        isOpen={showCategoryFilterModal}
                        onClose={closeCategoryFilterModal}
                      />
                    )}

      {showWalletFilterModal && (
                      <WalletFilter
                        isOpen={showWalletFilterModal}
                        onClose={closeWalletFilterModal}
                      />
                    )}

      {showTypeOfExpensesFilterModal && (
                      <TypeOfExpensesFilter
                        isOpen={showTypeOfExpensesFilterModal}
                        onClose={closeTypeOfExpensesFilter}
                      />
                    )}

      <div className={`filter-modal ${isOpen ? "visible" : ""}`}>

        <div className="filter-modal-header">
          <p>Настройка фильтров</p>
        </div>
        <div className="filter-modal-content">
          <div className="filter-modal-items">
            <div className="filter-modal-item" onClick={openWalletFilterModal}>
              <div className="filter-modal-icon-container">
                <img
                  src="/static/images/transactions_images/wallet_filter.svg"
                  alt="Item"
                  className="filter-item-image"
                />
              </div>
              <div className="filter-item-text">Все счета</div>
            </div>

            <div className="filter-modal-item"  onClick={openCategoryFilterModal}>
              <div className="filter-modal-icon-container">
                <img
                  src="/static/images/transactions_images/categories_filter.svg"
                  alt="Item"
                  className="filter-item-image"
                />
              </div>
              <div className="filter-item-text">Все категории</div>
            </div>
            <div className="filter-modal-item" onClick={openTypeOfExpensesFilter}>
              <div className="filter-modal-icon-container">
                <img
                  src="/static/images/transactions_images/transactions_filter.svg"
                  alt="Item"
                  className="filter-item-image"
                />
              </div>
              <div className="filter-item-text">Все виды операций</div>
            </div>
          </div>

          <div className="filter-slider-container">
            <input
              type="range"
              min="0"
              max={maxValue}
              value={sliderValue}
              ref={sliderRef}
              className="filter-slider"
            />
            <div className="labels">
              <span>0 ₽</span>
              <span>{maxValue} ₽</span>
            </div>
          </div>

          <div className="filter-modal-buttons">
            <button onClick={handleApply} className="apply-button">
              <p>Применить</p>
            </button>
            <button onClick={handleReset} className="reset-button">
              <p>Сбросить всё</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
