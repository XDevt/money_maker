import React, { useState } from 'react';
import "../styles/CalendarFrame.css";

const CalendarMainFrame = ({
  showModal,       // Показывать модальное окно
  closeModal,      // Функция для закрытия
  modalPosition,   // Позиция модального окна
  isAnimating,     // Флаг анимации появления
  isClosing,       // Флаг анимации закрытия
  onSelect,        // Колбэк для передачи выбранного значения
}) => {
  const [activeItem, setActiveItem] = useState("За месяц");

  const menuItems = [
    { id: 1, text: "За неделю" },
    { id: 2, text: "За месяц" },
    { id: 3, text: "За три месяца" },
    { id: 4, text: "За полгода" },
    { id: 5, text: "За 1 год" },
    { id: 6, text: "За всё время" },
  ];

  const handleClose = () => {
    onSelect(activeItem); // Передаём выбранный элемент
    closeModal();         // Закрываем модальное окно
  };

  return (
    showModal && (
      <div className="calendar-main-frame-overlay" onClick={handleClose}>
        <div
          className={`calendar-main-frame-content ${isAnimating ? 'animating' : ''} ${isClosing ? 'closing' : ''}`}
          style={{
            position: 'absolute',
            top: `${modalPosition.y}px`,
            left: `${modalPosition.x}px`,
            transform: 'translate(-100%, 0)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <ul className="calendar-main-frame-modal-menu">
            {menuItems.map((item) => (
              <li
                key={item.id}
                className={`calendar-main-frame-modal-item ${
                  activeItem === item.text ? "active" : ""
                }`}
                onClick={() => setActiveItem(item.text)} // Меняем активный элемент
              >
                <img
                  src={
                    activeItem === item.text
                      ? "/static/images/transactions_images/calendar-active-frame.svg"
                      : "/static/images/transactions_images/calendar-inactive-frame.svg"
                  }
                  alt={item.text}
                />
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  );
};

export default CalendarMainFrame;
