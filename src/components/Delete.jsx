import React from "react";

const columnsName = ["Company", "Model", "Color", "Year", "VIN", "Price", "Availability"];

function Delete({ item, setItems, closeWindow }) {
  const handleDelete = () => {
    setItems((prev) => {
      return prev.filter((obj) => obj.id !== item.id);
    });
    closeWindow();
  };
  return (
    <div className="window__background">
      <div className="window__content">
        <div className="container-table">
          <table>
            <tbody>
              <tr>
                {columnsName.map((name, id) => (
                  <th key={`${id}_${name}`}>{name}</th>
                ))}
              </tr>
              <tr>
                {Object.entries(item)
                  .filter(([key]) => key !== "id")
                  .map(([key, value], index) => (
                    <td key={`${index}_${value}`}>{value.toString()}</td>
                  ))}
              </tr>
            </tbody>
          </table>
        </div>

        <p className="window__text">Are you sure you want to delete this car?</p>
        <div className="window__buttons">
          <button className="window__button window__button-blue" onClick={() => closeWindow()}>
            No
          </button>
          <button className="window__button window__button-red" onClick={handleDelete}>
            Yes, delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Delete;
