import React, { useState, useEffect } from "react";
import "../styles/IconCustomizationModal.css";
import IconSelectionModal from "../components/IconSelectionModal";

function IconCustomizationModal({ isVisible, onClose }) {
  const [selectedColor, setSelectedColor] = useState("hsl(240, 100%, 50%)");
  const [huePosition, setHuePosition] = useState(240);
  const [isIconModalVisible, setIconModalVisible] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null); // Для хранения пути выбранной иконки
  const [selectedHEXColor, setSelectedHEXColor] = useState("hsl(240, 100%, 50%)");

  // Обновление CSS переменных и сохранение данных в localStorage
  useEffect(() => {
    const hue = parseInt(selectedColor.match(/\d+/)[0], 10);
    document.documentElement.style.setProperty("--thumbColor", selectedColor);
    setHuePosition(hue);

  }, [selectedColor]);

  if (!isVisible) return null;

    const hslToHex = (h, s, l) => {
      l /= 100;
      const a = s * Math.min(l, 1 - l) / 100;
      const f = (n) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, "0");
      };
      return `#${f(0)}${f(8)}${f(4)}`;
    };

  const handleColorChange = (e) => {
    const hue = e.target.value;
    setSelectedColor(`hsl(${hue}, 100%, 50%)`);
    setHuePosition(hue);

    const currentColorHEX = hslToHex(hue, 100, 50);
    setSelectedHEXColor(currentColorHEX);

  };

  const handleRandomSelection = () => {
    const randomHue = Math.floor(Math.random() * 361);
    const randomBrightness = Math.floor(Math.random() * 101);
    setSelectedColor(`hsl(${randomHue}, 100%, 50%)`);
    setHuePosition(randomHue);

    const currentColorHEX = hslToHex(randomHue, 100, 50);
    setSelectedHEXColor(currentColorHEX);
  };

  const handleIconOpenModal = () => {
    setIconModalVisible(true); // Открыть модальное окно
  };

  const handleIconCloseModal = (iconPath) => {
    setIconModalVisible(false); // Закрыть окно выбора иконки
    if (iconPath) {
      setSelectedIcon(iconPath); // Сохранить выбранный путь
      console.log(`Выбранная хуй иконка: ${iconPath}`); // Вывод в консоль
    } else {
      console.log(`Не нашел`);
    }
  };

  return (
    <div className="icon-customization-modal-overlay" onClick={() => onClose(null, null)}>
      <div className="icon-customization-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={() => onClose(null, null)}>
          ✕
        </button>
        <h2 className="modal-title">Создайте иконку самостоятельно</h2>

        {/* Кнопка для выбора иконки */}
        <button className="additional-button" onClick={handleIconOpenModal}>
          <span className="button-text">Выбрать иконку</span>
          <img
            src="/static/images/create_fin_account/arrow_btn.svg"
            alt="Иконка"
            className="button-image"
          />
        </button>

        {/* Окно выбора иконки */}
        <IconSelectionModal
          isVisible={isIconModalVisible}
          onClose={(iconPath) => handleIconCloseModal(iconPath)} // Передаём выбранный путь
        />

        {/* Настройка цвета */}
        <div className="customize-color-section">
          <p className="color-label">Настроить цвет</p>
          <div className="slider-container">
            <input
              type="range"
              min="0"
              max="360"
              value={huePosition}
              className="color-slider"
              onChange={handleColorChange}
            />
            <div
              className="color-thumb"
              style={{ left: `${(huePosition / 360) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Кнопка случайного выбора */}
        <button className="random-button" onClick={handleRandomSelection}>
          <span className="button-text">Случайный выбор</span>
          <img
            src="/static/images/create_fin_account/random-icon.svg"
            alt="Иконка"
            className="button-image"
          />
        </button>

        {/* Кнопка сохранения */}
        <div className="save-icon-button-container" onClick={() => onClose(selectedIcon, selectedHEXColor)}>
          <button className="save-icon-button-button">Сохранить</button>
        </div>
      </div>
    </div>
  );
}

export default IconCustomizationModal;
