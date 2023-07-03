import React, { useEffect, useRef, useState } from "react";
import { validateInput } from "../services/validation";

const columnsName = ["Company", "Model", "Color", "Year", "VIN", "Price", "Availability"];
const enabledColumns = ["car_color", "price", "availability"];

function Update({ item, setItems, closeWindow }) {
  const [inputValues, setInputValues] = useState({
    car_color: item?.car_color,
    price: item?.price,
    availability: item?.availability?.toString(),
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const windowRef = useRef(null);
  useEffect(() => {
    const catchClickOutside = (event) => {
      const _event = event;
      const path = _event.path || (_event.composedPath && _event.composedPath()); // перевірка для отримання правильного значення path

      if (windowRef.current && !path.includes(windowRef.current)) {
        closeWindow();
      }
    };

    document.body.addEventListener("click", catchClickOutside);

    return () => {
      document.body.removeEventListener("click", catchClickOutside);
    };
  }, []);

  const handleSave = () => {
    let resultCar = { ...inputValues };
    if (validateInput(resultCar)) {
      if (resultCar.price[0] !== "$") resultCar.price = `$${resultCar.price}`;
      setItems((prev) => {
        return prev.map((obj) => {
          if (obj.id === item.id) {
            return {
              ...obj,
              car_color: resultCar.car_color,
              price: resultCar.price,
              availability: resultCar.availability,
            };
          }
          return obj;
        });
      });
      closeWindow();
    }
  };

  return (
    <div className="window__background">
      <div className="window__content" ref={windowRef}>
        <div className="container-table">
          <table>
            <tbody>
              <tr>
                {columnsName.map((name, index) => (
                  <th key={`${index}_${name}`}>{name}</th>
                ))}
              </tr>
              <tr>
                {Object.entries(item)
                  .filter(([key]) => key !== "id")
                  .map(([key, value], index) => (
                    <td key={`${index}_${value}`}>
                      {enabledColumns.includes(key) ? (
                        <input type="text" name={key} value={inputValues[key]} onChange={handleInputChange} />
                      ) : (
                        value.toString()
                      )}
                    </td>
                  ))}
              </tr>
            </tbody>
          </table>
        </div>

        <button className="window__button" onClick={handleSave}>
          Save
        </button>

        <button className="window__button window__button-close" onClick={() => closeWindow()}>
          close
        </button>
      </div>
    </div>
  );
}

export default Update;
