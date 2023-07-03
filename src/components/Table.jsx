import React, { useEffect, useState } from "react";
import DropDown from "./DropDown";
import Pagination from "./Pagination";
import Search from "./Search";
import Update from "./Update";
import Delete from "./Delete";
import AddRow from "./AddRow";

const columnsName = [
  { name: "Company", code: "car" },
  { name: "Model", code: "car_model" },
  { name: "Color", code: "car_color" },
  { name: "Year", code: "car_model_year" },
  { name: "VIN", code: "car_vin" },
  { name: "Price", code: "price" },
  { name: "Availability", code: "availability" },
];
const numberOfRows = 10;

function Table({ items, setItems }) {
  const [page, setPage] = useState(1);
  const [paginatedItems, setPaginatedItems] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState(0);

  const [filteredItems, setFilteredItems] = useState(items);

  const [updateItem, setUpdateItem] = useState(false);
  const [updateIsOpen, setUpdateIsOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState(false);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const [addIsOpen, setAddIsOpen] = useState(false);

  //search
  const [inputValues, setInputValues] = useState({
    car: "",
    car_model: "",
    car_color: "",
    car_model_year: "",
    car_vin: "",
    price: "",
    availability: "",
  });

  useEffect(() => {
    setFilteredItems(items);
    setInputValues({
      car: "",
      car_model: "",
      car_color: "",
      car_model_year: "",
      car_vin: "",
      price: "",
      availability: "",
    });
  }, [items]);

  // setPaginatedItems
  useEffect(() => {
    if (filteredItems) {
      const start = (page - 1) * numberOfRows;
      const end = start + numberOfRows;
      setPaginatedItems(filteredItems.slice(start, end));
    }
  }, [page, filteredItems]);

  // setNumberOfPages
  useEffect(() => {
    if (filteredItems?.length && filteredItems.length !== 0) {
      setNumberOfPages(Math.ceil(filteredItems.length / numberOfRows));
      setPage(1);
    }
  }, [filteredItems]);

  // update
  const handleUpdate = (obj) => {
    setUpdateItem(obj);
  };

  const closeUpdate = () => {
    setUpdateIsOpen(false);
    setUpdateItem(false);
  };

  useEffect(() => {
    if (updateItem) setUpdateIsOpen(true);
    else setUpdateIsOpen(false);
  }, [updateItem]);

  // delete
  const handleDelete = (obj) => {
    setDeleteItem(obj);
  };

  const closeDelete = () => {
    setDeleteIsOpen(false);
    setDeleteItem(false);
  };

  useEffect(() => {
    if (deleteItem) setDeleteIsOpen(true);
    else setDeleteIsOpen(false);
  }, [deleteItem]);

  // add
  const handleAdd = () => {
    setAddIsOpen((prev) => !prev);
  };

  // filter
  const handleFilter = () => {
    if (items) {
      const filterItems = items.filter((item) => {
        return Object.keys(inputValues).every((key) => {
          return item[key].toString().toLowerCase().includes(inputValues[key].toLowerCase());
        });
      });
      setFilteredItems(filterItems);
    }
  };

  useEffect(() => {
    handleFilter();
  }, [inputValues]);

  return (
    <div className="table">
      <div className="table__body">
        <div className="container-table">
          <table>
            <tbody>
              <tr>
                {columnsName.map((obj, id) => (
                  <th key={`${id}_${obj.name}`}>
                    <p>{obj.name}</p>
                    <Search name={obj.code} value={inputValues} setValue={setInputValues} />
                  </th>
                ))}
                <th>
                  <p>Actions</p>
                </th>
              </tr>
              {paginatedItems.map((row) => (
                <tr key={row.id}>
                  {Object.entries(row)
                    .filter(([key]) => key !== "id")
                    .map(([key, value]) => (
                      <td key={`${key}_${value}`}>{value.toString()}</td>
                    ))}
                  <td>
                    <DropDown row={row} handleUpdate={handleUpdate} handleDelete={handleDelete} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination numberOfPages={numberOfPages} currentPage={page} setCurrentPage={setPage} />
      </div>

      <div className="table__add-row">
        <button className="table__add-row-button" onClick={handleAdd}>
          Add car
        </button>
      </div>

      {updateIsOpen && <Update item={updateItem} setItems={setItems} closeWindow={closeUpdate} />}
      {deleteIsOpen && <Delete item={deleteItem} setItems={setItems} closeWindow={closeDelete} />}
      {addIsOpen && <AddRow items={items} setItems={setItems} closeWindow={handleAdd} />}
    </div>
  );
}

export default Table;
