import React, { useEffect, useRef, useState } from "react";
import { validateInput } from "../services/validation";

const columnsName = [
  { name: "Company", code: "car" },
  { name: "Model", code: "car_model" },
  { name: "Color", code: "car_color" },
  { name: "Year", code: "car_model_year" },
  { name: "VIN", code: "car_vin" },
  { name: "Price", code: "price" },
  { name: "Availability", code: "availability" },
];

function AddRow({ items, setItems, closeWindow }) {
  const [inputValues, setInputValues] = useState({
    car: "",
    car_model: "",
    car_color: "",
    car_model_year: "",
    car_vin: "",
    price: "",
    availability: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const maxId = (arr) => {
    return arr.reduce((max, obj) => {
      return obj.id > max ? obj.id : max;
    }, 0);
  };

  const handleAdd = () => {
    const newId = maxId(items) + 1;
    let resultCar = { ...inputValues, id: newId };
    if (validateInput(resultCar)) {
      if (resultCar.price[0] !== "$") resultCar.price = `$${resultCar.price}`;
      setItems((prev) => [...prev, resultCar]);
      closeWindow();
    }
  };

  return (
    <div className="window__background">
      <div className="window__content">
        <div className="container-table">
          <table>
            <tbody>
              <tr>
                {columnsName.map((obj, index) => (
                  <th key={`${index}_${obj.name}`}>{obj.name}</th>
                ))}
              </tr>
              <tr>
                {columnsName.map((obj, index) => (
                  <td key={`${obj.name}_${index}`}>
                    <input
                      type="text"
                      name={obj.code}
                      value={inputValues[obj.code]}
                      onChange={handleInputChange}
                      className="window__input"
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <button className="window__button" onClick={handleAdd}>
          Add car
        </button>

        <button className="window__button window__button-close" onClick={() => closeWindow()}>
          close
        </button>
      </div>
    </div>
  );
}

export default AddRow;
