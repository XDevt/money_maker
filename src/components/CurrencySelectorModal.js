import React, { useState } from "react";
import "../styles/CurrencySelectorModal.css"; // Подключаем стили

const CurrencySelectorModal = ({ onClose, onSave }) => {
  const [selectedCurrency, setSelectedCurrency] = useState(null); // Состояние для выбранной валюты
  const [searchText, setSearchText] = useState(""); // Состояние для поиска
  const currencyCodes = [
    "RUB", "USD", "EUR", "AED", "AFN", "ALL", "AMD", "AOA", "ARS", "AUD", "AWG", "AZN", "BAM", "BBD",
    "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BRL", "BSD", "BTN", "BWP", "BYN",
    "CAD", "CDF", "CHF", "CLP", "CNY", "COP", "CRC", "CUP", "CZK", "DKK", "DOP", "DZD",
    "EGP", "ETB", "FJD", "GBP", "GEL", "GHS", "GIP", "GTQ", "HKD", "HNL", "HRK",
    "HUF", "IDR", "ILS", "INR", "IQD", "IRR", "ISK", "JMD", "JOD", "JPY", "KES", "KGS",
    "KHR", "KMF", "KRW", "KWD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LYD", "MAD",
    "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRU", "MUR", "MVR", "MWK", "MXN", "MYR",
    "MZN", "NAD", "NGN", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK", "PHP", "PKR",
    "PLN", "PYG", "QAR", "RON", "RSD",  "RWF", "SAR", "SBD", "SCR", "SDG", "SEK",
    "SGD", "SHP", "SLL", "SOS", "SRD", "STD", "SVC", "SYP", "SZL", "THB", "TJS", "TMT",
    "TND", "TOP", "TRY", "TTD", "TWD", "TZS", "UAH", "UGX", "UYU", "UZS", "VEF",
    "VES", "VND", "VUV", "WST", "XAF", "XCD", "XOF", "XPF", "YER", "ZAR", "ZMW", "ZWL"
]

  const currencies = currencyCodes.map((code) => ({
      code: code,
      flag: `/static/images/flags/${code}.png`,
    }));

  // Фильтруем валюты на основе текста поиска
  const filteredCurrencies = currencies.filter(currency =>
    currency.code.toLowerCase().includes(searchText.toLowerCase()) // Ищем только по коду валюты
  );

  // Обработчик ввода текста
  const handleSearchChange = (e) => {
    setSearchText(e.target.value); // Обновляем текст поиска
  };

  // Обработчик выбора валюты
  const handleSelectCurrency = (currency) => {
    setSelectedCurrency(currency); // Выбираем валюту
  };

  console.log(currencies);

  return (
    <div className="CurrencySelector-modal-overlay">
      <div className="CurrencySelector-modal-container">
        <button className="CurrencySelector-modal-close-btn" onClick={onClose}>
          ✕
        </button>
        <h2 className="CurrencySelector-modal-title">Выберите валюту</h2>

        {/* Поле для поиска */}
        <input
          type="text"
          className="CurrencySelector-modal-search"
          placeholder="Поиск по коду валюты"
          value={searchText}
          onChange={handleSearchChange} // Обработчик изменения текста
        />

        <div className="CurrencySelector-modal-content">
          {filteredCurrencies.length > 0 ? (
            filteredCurrencies.map((currency) => (
              <div
                key={currency.code} // Уникальный ключ для каждого элемента
                className={`CurrencySelector-currency-item ${selectedCurrency?.code === currency.code ? 'selected' : ''}`}
                onClick={() => handleSelectCurrency(currency)} // Обработчик клика на валюту
              >
                <img
                  src={currency.flag}
                  alt={`${currency.code} Flag`}
                  className="CurrencySelector-currency-flag"
                />
                <span
                  className={`CurrencySelector-currency-code ${selectedCurrency?.code === currency.code ? 'selected-text' : ''}`}
                >
                  {currency.code}
                </span>
              </div>
            ))
          ) : (
            <div className="CurrencySelector-no-results">Нет валют, соответствующих запросу</div> // Если нет совпадений
          )}
        </div>

        {/* Кнопка сохранения */}
        <div className="modal-footer">
          <button className="save-button" onClick={() => onSave(selectedCurrency)} disabled={!selectedCurrency}>
            Сохранить
          </button>
        </div>

      </div>
    </div>
  );
};

export default CurrencySelectorModal;