import { useState, useEffect } from "react";
import "../styles/FilterModal.css";

const WalletsFilterModal = ({ isOpen, onClose }) => {
  const [categories, setCategories] = useState([
      {
        id: 1,
        name: "Расходы",
        selected: true,
        img: "/static/images/transactions_images/expense-frame.svg",
        color: "rgba(18, 18, 18, 100)",
      },
      {
        id: 2,
        name: "Переводы, редактирование счетов",
        selected: true,
        img: "/static/images/transactions_images/transfer-frame.svg",
        color: "rgba(18, 18, 18, 100)",
      },
      {
        id: 3,
        name: "Доходы",
        selected: true,
        img: "/static/images/transactions_images/income-frame.svg",
        color: "rgba(18, 18, 18, 100)",
      },
    ]);


  const toggleCategory = (categoryId) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? { ...cat, isExpanded: !cat.isExpanded }
          : cat
      )
    );
  };

  const toggleItemSelection = (categoryId) => {
  setCategories((prevCategories) =>
    prevCategories.map((category) =>
      category.id === categoryId
        ? { ...category, selected: !category.selected } // Переключаем selected
        : category
    )
  );
};

  const handleCancel = () => {
    onClose();
  };

  const handleConfirm = () => {
    const selectedItems = categories.flatMap((cat) =>
      cat.items.filter((item) => item.selected)
    );
    console.log("Selected items:", selectedItems);
    onClose();
  };

  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      setTimeout(() => setShouldRender(false), 300);
    }
  }, [isOpen]);

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }
  };

  const calculateHeight = (itemsCount) => {
    const itemHeight = 77.56; // Высота одного элемента (примерно)
    return itemsCount * itemHeight;
  };

  const handleCategoryCheckboxChange = (categoryId, isChecked) => {
  setCategories((prevCategories) =>
    prevCategories.map((category) =>
      category.id === categoryId
        ? {
            ...category,
            items: category.items.map((item) => ({
              ...item,
              selected: isChecked, // Устанавливаем флаг для всех объектов
            })),
          }
        : category
    )
  );
};

  return (
    shouldRender && (
      <div
        className={`wallets-filter-modal-overlay ${isVisible ? "visible" : ""}`}
        onClick={handleOverlayClick}
      >
        <div className={`type-of-expense-filter-modal ${isVisible ? "visible" : ""}`}>
          <div className="wallets-filter-header">
            <img
              src="/static/images/create_fin_account/close_button.svg"
              alt="Close"
              className="wallets-filter-close-icon"
              onClick={onClose}
            />
            <p className="wallets-filter-title">Фильтр по типу операции</p>
          </div>

          <div className="wallets-filter-content">
            <div className="type-of-expense-filter-items">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="wallet-account-item"
                  onClick={() => toggleItemSelection(category.id)}
                >
                  <div
                    className="wallet-account-icon"
                    style={{ backgroundColor: category.color || "#4A90E2" }}
                  >
                    <img src={category.img} alt={category.name} />
                  </div>
                  <p className="wallets-filter-item-name">{category.name}</p>
                  <input
                    type="checkbox"
                    checked={category.selected}
                    onChange={() => toggleItemSelection(category.id)}
                    onClick={() => toggleItemSelection(category.id)}
                  />
                </div>
              ))}
            </div>
          </div>


          <div className="wallets-filter-footer">
            <button
              className="wallets-filter-cancel"
              onClick={handleCancel}
            >
              <p>Отмена</p>
            </button>
            <button
              className="wallets-filter-confirm"
              onClick={handleConfirm}
            >
              <p>Подтвердить</p>
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default WalletsFilterModal;
