import React, { useEffect, useRef, useState } from "react";

function DropDown({ row, handleUpdate, handleDelete }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const actionRef = useRef(null);

  useEffect(() => {
    const catchClickOutside = (event) => {
      const _event = event;
      const path = _event.path || (_event.composedPath && _event.composedPath()); // перевірка для отримання правильного значення path

      if (actionRef.current && !path.includes(actionRef.current)) {
        setOpen(false);
      }
    };

    document.body.addEventListener("click", catchClickOutside);

    return () => {
      document.body.removeEventListener("click", catchClickOutside);
    };
  }, []);

  const handleUpdateAndClose = () => {
    setOpen(false);
    handleUpdate(row);
  };

  const handleDeleteAndClose = () => {
    setOpen(false);
    handleDelete(row);
  };

  return (
    <div className="dropdown">
      <button onClick={handleOpen} ref={actionRef}>
        Dropdown
      </button>
      <ul className={`dropdown__list ${open && "dropdown__list-active"}`}>
        <li className={"dropdown__list-item dropdown__update"} onClick={handleUpdateAndClose}>
          Update
        </li>
        <li className={"dropdown__list-item dropdown__delete"} onClick={handleDeleteAndClose}>
          Delete
        </li>
      </ul>
    </div>
  );
}

export default DropDown;
