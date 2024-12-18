import { useState, useEffect } from "react";
import "../styles/FilterModal.css";

const WalletsFilterModal = ({ isOpen, onClose }) => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Расходы",
      isExpanded: true,
      items: [
        {
          id: 1,
          name: "Карта Sberbank",
          selected: true,
          img: "/static/images/wallet_images/money1.svg",
          color: "rgba(94, 115, 233, 1)",
        },
        {
          id: 2,
          name: "Карта Tinkoff",
          selected: true,
          img: "/static/images/wallet_images/money1.svg",
          color: "rgba(94, 115, 233, 1)",
        },
        {
          id: 3,
          name: "Наличные",
          selected: false,
          img: "/static/images/wallet_images/money1.svg",
          color: "rgba(94, 115, 233, 1)",
        },
      ],
    },
    {
      id: 2,
      name: "Доходы",
      isExpanded: true,
      items: [
        {
          id: 4,
          name: "Путёвка в Турцию",
          selected: true,
          img: "/static/images/wallet_images/piggy_bank1.svg",
          color: "rgba(91, 198, 98, 1)",
        },
        {
          id: 5,
          name: "На машину",
          selected: true,
          img: "/static/images/wallet_images/piggy_bank1.svg",
          color: "rgba(91, 198, 98, 1)",
        },
      ],
    }
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

  const toggleItemSelection = (categoryId, itemId) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              items: cat.items.map((item) =>
                item.id === itemId
                  ? { ...item, selected: !item.selected }
                  : item
              ),
            }
          : cat
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
        <div className={`wallets-filter-modal ${isVisible ? "visible" : ""}`}>
          <div className="wallets-filter-header">
            <img
              src="/static/images/create_fin_account/close_button.svg"
              alt="Close"
              className="wallets-filter-close-icon"
              onClick={onClose}
            />
            <p className="wallets-filter-title">Фильтр по категориям</p>
          </div>

          <div className="wallets-filter-content">
            {categories.map((category) => (
              <div key={category.id} className="wallets-filter-category">
                <div
                  className="wallets-filter-category-header"
                >

                  <img
                      src="/static/images/transactions_images/arrow_down.svg"
                      alt="Toggle"
                      className={category.isExpanded ? "expanded" : ""}
                      onClick={() => toggleCategory(category.id)}
                    />

                  <p onClick={() => toggleCategory(category.id)}>{category.name}</p>

                  <input
                    type="checkbox"
                    checked={category.items.every((item) => item.selected)}
                    onChange={(e) => handleCategoryCheckboxChange(category.id, e.target.checked)}
                    className="category-checkbox"

                  />
                </div>
                <div
                  className={`wallets-filter-items ${
                    category.isExpanded ? "expanded" : ""
                  }`}
                  style={{
                    maxHeight: category.isExpanded
                      ? `${calculateHeight(category.items.length)}px`
                      : "0",
                  }}
                >
                  {category.items.map((item) => (
                    <div
                      key={item.id}
                      className="wallet-account-item"
                      onClick={() =>
                        toggleItemSelection(category.id, item.id)
                      }
                    >
                      <div
                        className="wallet-account-icon"
                        style={{
                          backgroundColor: item.color || "#4A90E2",
                        }}
                      >
                        <img src={`${item.img}`} alt={item.name} />
                      </div>
                      <p className="wallets-filter-item-name">{item.name}</p>
                      <input
                        type="checkbox"
                        checked={item.selected}
                        readOnly
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
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
