import React, { useState } from "react";
import "../styles/IconSelectionModal.css";

function IconSelectionModal({ isVisible, onClose }) {
  const [selectedIcon, setSelectedIcon] = useState(null);

  const categories = [
    { title: "Деньги", icons: ["/static/images/icons/money1.svg", "/static/images/icons/money2.svg", "/static/images/icons/money3.svg", "/static/images/icons/money4.svg", "/static/images/icons/money5.svg", "/static/images/icons/money6.svg", "/static/images/icons/money7.svg"] },
    { title: "Криптовалюта", icons: ["/static/images/icons/crypto1.svg", "/static/images/icons/crypto2.svg"] },
    { title: "Инвестиции", icons: ["/static/images/icons/investments1.svg", "/static/images/icons/investments2.svg", "/static/images/icons/investments3.svg", "/static/images/icons/investments4.svg", "/static/images/icons/investments5.svg"] },
    { title: "Еда", icons: ["/static/images/icons/food1.svg", "/static/images/icons/food2.svg", "/static/images/icons/food3.svg", "/static/images/icons/food4.svg", "/static/images/icons/food5.svg", "/static/images/icons/food6.svg"] },
    { title: "Магазин", icons: ["/static/images/icons/shop1.svg", "/static/images/icons/shop2.svg", "/static/images/icons/shop3.svg"] },
    { title: "Дом", icons: ["/static/images/icons/home1.svg", "/static/images/icons/home2.svg", "/static/images/icons/home3.svg", "/static/images/icons/home4.svg", "/static/images/icons/home5.svg", "/static/images/icons/home6.svg"] },
    { title: "Транспорт", icons: ["/static/images/icons/transport1.svg", "/static/images/icons/transport2.svg", "/static/images/icons/transport3.svg", "/static/images/icons/transport4.svg", "/static/images/icons/transport5.svg", "/static/images/icons/transport6.svg", "/static/images/icons/transport7.svg", "/static/images/icons/transport8.svg"] },
    { title: "Обучение", icons: ["/static/images/icons/education1.svg", "/static/images/icons/education2.svg", "/static/images/icons/education3.svg", "/static/images/icons/education4.svg", "/static/images/icons/education5.svg"] },
    { title: "Медицина", icons: ["/static/images/icons/medicine1.svg", "/static/images/icons/medicine2.svg", "/static/images/icons/medicine3.svg", "/static/images/icons/medicine4.svg", "/static/images/icons/medicine5.svg", "/static/images/icons/medicine6.svg"] },
    { title: "Одежда и обувь", icons: ["/static/images/icons/clothes1.svg", "/static/images/icons/clothes2.svg", "/static/images/icons/clothes3.svg", "/static/images/icons/clothes4.svg", "/static/images/icons/clothes5.svg", "/static/images/icons/clothes6.svg", "/static/images/icons/clothes7.svg", "/static/images/icons/clothes8.svg", "/static/images/icons/clothes9.svg"] },
    { title: "Развлечения", icons: ["/static/images/icons/entertainment1.svg", "/static/images/icons/entertainment2.svg", "/static/images/icons/entertainment3.svg", "/static/images/icons/entertainment4.svg", "/static/images/icons/entertainment5.svg", "/static/images/icons/entertainment6.svg", "/static/images/icons/entertainment7.svg", "/static/images/icons/entertainment8.svg", "/static/images/icons/entertainment9.svg",
                                    "/static/images/icons/entertainment10.svg", "/static/images/icons/entertainment11.svg", "/static/images/icons/entertainment12.svg", "/static/images/icons/entertainment13.svg", "/static/images/icons/entertainment14.svg", "/static/images/icons/entertainment15.svg", "/static/images/icons/entertainment16.svg", "/static/images/icons/entertainment17.svg", "/static/images/icons/entertainment18.svg"] },
    { title: "Уход за собой", icons: ["/static/images/icons/SelfCare1.svg", "/static/images/icons/SelfCare2.svg", "/static/images/icons/SelfCare3.svg", "/static/images/icons/SelfCare4.svg", "/static/images/icons/SelfCare5.svg"] },
    { title: "Спорт", icons: ["/static/images/icons/sport1.svg", "/static/images/icons/sport2.svg", "/static/images/icons/sport3.svg", "/static/images/icons/sport4.svg", "/static/images/icons/sport5.svg", "/static/images/icons/sport6.svg", "/static/images/icons/sport7.svg", "/static/images/icons/sport8.svg", "/static/images/icons/sport9.svg",
                                    "/static/images/icons/sport10.svg", "/static/images/icons/sport11.svg", "/static/images/icons/sport12.svg", "/static/images/icons/sport13.svg", "/static/images/icons/sport14.svg"] },
    { title: "Путешествия", icons: ["/static/images/icons/trips1.svg", "/static/images/icons/trips2.svg", "/static/images/icons/trips3.svg", "/static/images/icons/trips4.svg", "/static/images/icons/trips5.svg", "/static/images/icons/trips6.svg", "/static/images/icons/trips7.svg"] },
    { title: "Другое", icons: ["/static/images/icons/other1.svg", "/static/images/icons/other2.svg", "/static/images/icons/other3.svg", "/static/images/icons/other4.svg", "/static/images/icons/other5.svg", "/static/images/icons/other6.svg"] }
  ];

  if (!isVisible) return null;

  const handleIconClick = (iconPath) => {
    setSelectedIcon(iconPath);
    console.log(`Выбрана иконка: ${iconPath}`);
  };

  const handleSave = () => {
    console.log(`Сохранено: ${selectedIcon}`);

    if (selectedIcon) {
      onClose(selectedIcon); // Передаём выбранный путь
    } else {
      onClose(null); // Если ничего не выбрано
    }
  };

  return (
    <div className="icon-selection-modal-overlay" onClick={() => onClose(null)}>
      <div className="icon-selection-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Верхняя часть с заголовком и кнопкой закрытия */}
        <div className="icon-selection-modal-header">
          <h2 className="icon-selection-modal-title">Выбор иконки</h2>
          <button className="icon-selection-close-button" onClick={() => onClose(null)}>
            ✕
          </button>
        </div>

        {/* Прокручиваемая область для категорий и иконок */}
        <div className="icon-scrollable-content">
          {categories.map((category, index) => (
            <div key={index} className="icon-category">
              <p className="category-title">{category.title}</p>
              <div className="icon-grid">
                {category.icons.map((icon, idx) => (
                  <div
                    key={idx}
                    className={`icon-item ${selectedIcon === icon ? "selected" : ""}`}
                    onClick={() => handleIconClick(icon)}
                  >
                    <img src={icon} alt={`icon-${idx}`} className="icon-image" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Закреплённая кнопка "Сохранить" */}
        <div className="modal-footer">
          <button className="save-button" onClick={handleSave} disabled={!selectedIcon}>
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}

export default IconSelectionModal;
